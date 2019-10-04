<template>
    <ui-field @field-focus="onFocus" @field-blur="onBlur" class="ui-autocomplete" v-bind="field_props" >
    <ui-control :isFullwidth="isFullwidth" :icon="$attrs['icon']" :iconLeft="$attrs['iconLeft']" :iconRight="$attrs['iconRight']" :iconPosition="$attrs['iconPosition']">
        <ui-input
            ref="input"
            :class="{'is-fullwidth' : isFullwidth}"
            v-bind="$attrs"
            v-on="$listeners"
            :autocomplete="autocomplete ? autocomplete : null"
            :disabled="disabled || loading"
            :maxlength="enforceMaxlength ? maxlength : null"
            :name="name"
            :placeholder="placeholder"
            :readonly="readonly"
            :required="required"
            v-model="newValue"
            @update="updateMatch"
            @keyup.native.esc.prevent="isActive = false"
            @keydown.native.tab.prevent="pick"
            @keydown.native.enter.prevent="pick"
            @keydown.native.up.prevent="keyArrows('up')"
            @keydown.native.down.prevent="keyArrows('down')"
            />
    </ui-control>
    <transition name="fade">
        <div
            class="dropdown-menu"
            :class="{ 'is-opened-top': !isListInViewportVertically }"
            v-show="isActive && (matchedOptions.length > 0 || hasEmptySlot || (openOnFocus && !newValue))"
            ref="dropdown">
            <div class="dropdown-content">
                <a
                    v-for="(option, index) in matchedOptions"
                    :key="index"
                    class="dropdown-item"
                    :class="{ 'is-hovered': option === hovered }"
                    @click="select(option)">
                    <slot
                        v-if="hasDefaultSlot"
                        :option="option"
                        :index="index"
                    />
                    <span v-else v-html="getValue(option, true)"/>
                </a>
                <div
                    v-if="matchedOptions.length === 0"
                    class="dropdown-item is-disabled">
                    <slot name="empty"/>
                </div>
            </div>
        </div>
    </transition>
    <slot slot="after"></slot>
    <small
        v-if="maxlength && enforceMaxlength"
        slot="help"
        class="help counter"
        :class="{ 'is-invisible': !isFocused }">
        {{ valueLength }} / {{ maxlength }}
    </small>
</ui-field>
</template>

<script>
import BaseForm from '../BaseForm'
import Control from '../control'
import BaseUI from '../BaseUI'
import Input from '../input/Input'

import helpers from '../helpers'
const getValueByPath = helpers.util.getValueByPath;
const escapeRegExpChars = helpers.util.escapeRegExpChars;
export default {
    name:'ui-autocomplete',
    model:{
        prop:'value',
        event:'autocomplete-update',
    },
    data() {
        return {
            timer:null,
            selected: null,
            hovered: null,
            isActive: false,
            newValue: this.value,
            isListInViewportVertically: true,
            matchedOptions:[],
        }
    },
    inheritAttrs: false,
    components:{
        "ui-control": Control,
        'ui-input' : Input,
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        autocomplete: String,
        autofocus: {
            type: Boolean,
            default: false
        },
        maxlength: Number,
        enforceMaxlength: {
            type: Boolean,
            default: false
        },
        isFullwidth:{
            type:Boolean,
            default:false,
        },
        selectMode:{
            type:Boolean,
            default:false,
        },
        options: {
            type: Array,
            default: () => []
        },
        field: {
            type: String,
            default: 'value'
        },
        clearOnSelect: Boolean,
        filter:{
            type:Boolean,
            default:true,
        },
        openOnFocus:{
            type:Boolean,
            default:false,
        }
    },
    computed:{
        displayOptions(){
            return this.options.map((item)=>{
                if(typeof item == 'object'){
                    return item[this.field];
                }
                return item;
            });
        },
        selectedValue(){
            return this.getValue(this.selected);
        },
        valueLength() {
            return this.value ? this.value.length : 0;
        },
        /**
         * White-listed items to not close when clicked.
         * Add input, dropdown and all children.
         */
        whiteList() {
            const whiteList = []
            whiteList.push(this.$refs.input.$el)
            whiteList.push(this.$refs.dropdown)
            // Add all chidren from dropdown
            if (this.$refs.dropdown !== undefined) {
                const children = this.$refs.dropdown.querySelectorAll('*')
                for (const child of children) {
                    whiteList.push(child)
                }
            }

            return whiteList
        },

        /**
         * Check if exists default slot
         */
        hasDefaultSlot() {
            return !!this.$scopedSlots.default
        },

        /**
         * Check if exists "empty" slot
         */
        hasEmptySlot() {
            return !!this.$slots.empty
        }
    },
    methods:{
        setValue(value){
            if(value != this.newValue){
                this.newValue = value;
            }
        },
        updateMatch(value = this.newValue){
            clearTimeout(this.timer);
            this.timer = null;
            this.timer = setTimeout(()=>{
                this.matchedOptions = this.getMatch(value);
            }, 250)
        },
        getMatch(value){
            var options = this.displayOptions;
            var trimmed = value.trim();
            if(!this.filter || !value || !trimmed){
                return options;
            }

            var match = options.filter((item)=>{
                return item.indexOf(value)>=0;
            })
            return match;
        },
        getNewValue(){
            return this.newValue;
        },
        reset() {
            this.$refs['input'].reset();
            this.hovered = null;
            this.selected = null;
        },
        /**
         * Return display text for the input.
         * If object, get value from path, or else just the value.
         * If hightlight, find the text with regex and make bold.
         */
        getValue(option, isHighlight = false) {
            if (!option) return

            const value = typeof option === 'object'
                ? getValueByPath(option, this.field)
                : option

            const escapedValue = escapeRegExpChars(this.newValue)
            const regex = new RegExp(`(${escapedValue})`, 'gi')

            return isHighlight
                ? value.replace(regex, '<b>$1</b>')
                : value
        },
        /**
         * Set which option is currently hovered.
         */
        setHovered(option) {
            this.hovered = option
        },

        /**
         * Set which option is currently selected, update v-model,
         * update input value and close dropdown.
         */
        select(option, closeDropdown = true) {
            if (option === undefined) return

            this.selected = option
            this.$emit('select', this.selected)
            if (this.selected !== null) {
                this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected)
            }
            closeDropdown && this.$nextTick(() => { this.isActive = false})
        },
        /**
         * Tab / Enter key listener.
         * Select hovered option if it exists, close dropdown, then allow
         * native handling to move to next tabbable element.
         */
        pick(e,hovered=this.hovered) {
            if (hovered === null) {
                if(this.$masks.only.is_enter_key(e)){
                    this.$emit('keydown-enter',e);
                }
                this.isActive = false
                return
            }
            this.select(hovered)
        },

        /**
         * Close dropdown if clicked outside.
         */
        clickedOutside(event) {
            if (this.whiteList.indexOf(event.target) < 0){
                this.isActive = false
            }
        },

        findValue(value){
            return this.matchedOptions.find((item)=>{
                return item == value;
            })
        },
        /**
         * Calculate if the dropdown is vertically visible when activated,
         * otherwise it is openened upwards.
         */
        calcDropdownInViewportVertical() {
            this.$nextTick(() => {
                /**
                 * this.$refs.dropdown may be undefined
                 * when Autocomplete is conditional rendered
                 */
                if (this.$refs.dropdown === undefined) return

                const rect = this.$refs.dropdown.getBoundingClientRect()

                this.isListInViewportVertically = (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight ||
                        document.documentElement.clientHeight)
                )
            })
        },
        /**
         * Arrows keys listener.
         * If dropdown is active, set hovered option, or else just open.
         */
        keyArrows(direction) {
            const sum = direction === 'down' ? 1 : -1
            if (this.isActive) {
                var options = this.matchedOptions;
                let index = options.indexOf(this.hovered) + sum
                index = index > options.length - 1 ? options.length : index
                index = index < 0 ? 0 : index

                this.setHovered(options[index])

                const list = this.$refs.dropdown.querySelector('.dropdown-content')
                const element = list.querySelectorAll('.dropdown-item:not(.is-disabled)')[index]

                if (!element) return

                const visMin = list.scrollTop
                const visMax = list.scrollTop + list.clientHeight - element.clientHeight

                if (element.offsetTop < visMin) {
                    list.scrollTop = element.offsetTop
                } else if (element.offsetTop >= visMax) {
                    list.scrollTop = (
                        element.offsetTop -
                        list.clientHeight +
                        element.clientHeight
                    )
                }
            }
            this.isActive = true
        },
        /**
         * Focus listener.
         * If value is the same as selected, select all text.
         */
        onFocus(event) {
            if (this.selectedValue === this.newValue) {
                this.$el.querySelector('input').select()
            }
            if (this.openOnFocus) {
                this.updateMatch()
                this.$nextTick(()=>{
                    this.isActive = true
                })
            }
        },
        onBlur(event){
            this.$nextTick(()=>{
                this.$nextTick(() => {
                    if(this.selectMode && !this.selected && this.newValue){
                        var value = this.findValue(this.newValue);
                        if(!value && this.matchedOptions.length > 0){
                            value =  this.matchedOptions[0];
                        }
                        this.selected = value;
                        this.newValue = value;
                    }
                    this.$emit('input',this.newValue);
                })
            })
        }
    },
    watch:{
        value:{
            immediate:true,
            handler(value){
                this.setValue(value);
            }
        },
        isActive(active) {
            if (active) {
                this.calcDropdownInViewportVertical()
            } else {
                this.$nextTick(() =>{ this.setHovered(null);this.onBlur()})
                // Timeout to wait for the animation to finish before recalculating
                setTimeout(() => {
                    this.calcDropdownInViewportVertical()
                }, 100)
            }
        },
        newValue(value) {
            if(value !== this.value){
                this.$emit('autocomplete-update',value);
            }
            // Check if selected is invalid
            const currentValue = this.selectedValue
            if (currentValue && currentValue !== value) {
                this.select(null, false)
            }
            // Close dropdown if input is clear or else show dropdown
            if (!this.openOnFocus || value) {
                this.isActive = !!value
            }
        },
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside)
            window.addEventListener('resize', this.calcDropdownInViewportVertical)
            this.$nextTick(()=>{
                this.isActive = false;
            })
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside)
            window.removeEventListener('resize', this.calcDropdownInViewportVertical)
        }
    },
    mixins:[BaseForm],
}
</script>

<style lang="scss">
.ui-autocomplete {
    .dropdown-menu {
        display: block;
        min-width: 100%;
        &.is-opened-top {
            top: auto;
            bottom: 100%;
        }
    }
    .dropdown-content {
        overflow: auto;
        max-height: 200px;
    }
    .dropdown-item {
        &.is-hovered {
            background: $dropdown-item-hover-background-color;
            color: $dropdown-item-hover-color;
        }
        &.is-disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
    &.is-small {
        @include control-small;
    }
    &.is-medium{
        @include control-medium;
    }
    &.is-large {
        @include control-large;
    }
}
</style>
