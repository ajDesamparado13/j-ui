<template>
    <ui-field class="ui-textbox" v-bind="field_props" >
        <ui-control :isFullwidth="isFullwidth" :icon="$attrs['icon']" :iconLeft="$attrs['iconLeft']"
            :iconRight="$attrs['iconRight']" :iconPosition="$attrs['iconPosition']">
            <ui-textarea v-if="type == 'textarea'"
                ref="input"
                :class="{'is-fullwidth' : isFullwidth}"
                v-bind="$attrs"
                v-on="$listeners"

                :autocomplete="autocomplete ? autocomplete : null"
                :disabled="disabled || loading"
                :maxlength="enforceMaxlength ? maxlength : null"
                :name="name"
                :number="type === 'number' ? true : null"
                :placeholder="placeholder"
                :readonly="readonly"
                :required="required"
                :type="type"
                v-model="newValue"
                />
            <ui-input v-else
                ref="input"
                :class="{'is-fullwidth' : isFullwidth}"
                v-bind="$attrs"
                v-on="$listeners"

                :autocomplete="autocomplete ? autocomplete : null"
                :disabled="disabled || loading"
                :maxlength="enforceMaxlength ? maxlength : null"
                :name="name"
                :number="type === 'number' ? true : null"
                :placeholder="placeholder"
                :readonly="readonly"
                :required="required"
                :type="type"
                v-model="newValue"
                />
        </ui-control>
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
import BaseUI from '../BaseUI'
import autosize from 'autosize';
import Control from '../control'
import Area from './Area'
import Input from './Input'

export default {
    extends:BaseUI,
    name:'ui-textbox',
    model:{
        prop:'value',
        event:'update',
    },
    data() {
        return {
            initialValue: this.value,
            autosizeInitialized: false,
            newValue:'',
        };
    },
    props: {
        prefix:{ type:String,default:'' },
        divider:{ type:Number, default:1, },
        multiplier:{ type:Number, default:1, },
        value: {
            type: [String, Number,Array],
            default: ''
        },
        type: {
            type: String,
            default: 'text' // all the possible HTML5 input types, except those that have a special UI
        },
        autocomplete: String,
        autofocus: {
            type: Boolean,
            default: false
        },
        autosize: {
            type: Boolean,
            default: true
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
    },
    computed:{
        valueLength() {
            return this.value ? this.value.length : 0;
        },
    },
    methods:{
        clear() {
            this.$refs['input'].clear();
        },
        getNewValue(){
            return this.newValue;
        },
        reset() {
            this.$refs['input'].reset();
        },
        focus(){
            this.$el.querySelector(this.type == 'textarea' ? 'textarea' : 'input').focus();
        },
    },
    watch:{
        value:{
            immediate:true,
            handler(value){
                this.newValue = value;
            }
        },
        newValue(value) {
            this.$emit('input',value);
        },

    },
    mixins:[BaseForm],
    components: {
        "ui-control": Control,
        "ui-input": Input,
        "ui-textarea": Area,
    },
};
</script>
