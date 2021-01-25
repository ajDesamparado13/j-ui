<template>
    <ui-field class="ui-autocomplete" v-bind="$_Arr.only($attrs,['label','required','message','loading','invalid','name','disabled'])">
        <ui-dropdown ref="dropdown" :show="showSuggestions">
            <ui-input ref="input" slot="trigger" v-model="newValue"
            @keydown-enter="onEnter"
            @keydown.native.tab="onTab"
            @keydown.native.up.prevent="onArrowKey('up')"
            @keydown.native.down.prevent="onArrowKey('down')"
            />
            <div class="autocomplete-suggestions">
                <slot v-bind:suggestions="matches">
                    <div @mouseover="onHover"
                     class="dropdown-item"
                     :class="{'is-hovered' : opt === hovered, 'is-selected' : opt === newValue}"
                     v-for="(opt,index) in matches"
                     :key="index" 
                     @click="select(opt)">
                        {{ opt }}
                    </div>
                </slot>
            </div>
        </ui-dropdown>
    </ui-field>
</template>

<script>
export default {
    name:'ui-autocomplete',
    model: { prop: "value", event: "autocomplete-update" },
    data(){
        return {
            newValue:'',
            hovered:'',
        }
    },
    props:{
        value:{
            type:String,
            required:true,
        },
        options:{
            type:Array,
            required:false,
        },
        field:{
            type:String,
            default:'value',
        },
        openOnFocus:{
            type:Boolean,
            default:false,
        },
        useCaseSensitive:{
            type:Boolean,
            default:false,
        }
    },
    computed:{
        showSuggestions(){
            return this.matches.length > 0
        },
        matches(){
            if(!this.newValue) return this.options;
            let matches = this.options.filter((item) => {
                return this.isMatch(this.newValue,item) && this.newValue != item;
            });
            return matches.length > 0 ? matches : this.options;
        },
    },
    methods:{
        isMatch(a,b){
            let valueA = this.useCaseSensitive ? a : a.toLowerCase();
            let valueB = this.useCaseSensitive ? b : b.toLowerCase();
            return valueA.indexOf(valueB) >= 0 || valueB.indexOf(valueA) >= 0;
        },
        select(option){
            this.setValue(option)
            this.$refs['dropdown'].close();
        },
        setValue(value){
            this.newValue = value;
        },
        onTab(event){
            if(!this.$refs['dropdown'].isActive) return
            event.preventDefault();
            this.setValue(this.hovered);
        },
        onEnter(e) {
            let hoveredExists = this.matches.findIndex((val)=>{ return val === this.hovered; }) >= 0
            if(hoveredExists){
                this.setValue(this.hovered);
            }
            this.$emit('keydown-enter');
            this.$refs['dropdown'].close();
        },
        onArrowKey(direction) {
            const sum = direction === "down" ? 1 : -1;
            let index = this.matches.findIndex((val)=>{ return val === this.hovered; })
            let selectIndex = index + sum;
            if(selectIndex >= this.matches.length ) selectIndex = 0;
            this.$nextTick(()=>{
                this.hovered = this.matches[selectIndex >= 0 ? selectIndex : 0];
            })
        },
        onHover(e){
            let hoveredValue = e.toElement.innerText;
            this.hovered = hoveredValue;
        }
    },
    watch:{
        matches(){
            let index = this.matches.findIndex((val)=>{ return val === this.hovered; })
            if(!( index >= 0 )) this.hovered = this.matches[0];
        },
        value: {
            immediate: true,
            handler(value) {
                this.setValue(value);
            }
        },
        newValue(value) {
            if (value === this.value) return
            this.$emit("autocomplete-update", value);
        }
    },
}
</script>
<style lang="scss">
.ui-autocomplete {
    .is-hovered{
        background: #cccccc;
    }
}
</style>