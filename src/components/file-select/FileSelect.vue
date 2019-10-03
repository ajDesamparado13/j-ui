<template>
    <div class="file">
      <label class="file-label">
              <input v-if="ready" class="file-input" v-bind="$attrs" type="file"
              :accept="accept"
              :disabled="disabled"
              :multiple="multiple"
              :name="name"
              :required="required"
              @blur="onBlur"
              @change="onChange"
              @focus="onFocus"
              >
        <span class="file-cta">
          <ui-icon class="file-icon"></ui-icon>
          <span class="file-label">
            Choose a file…
          </span>
        </span>
      </label>
    </div>
</template>

<script>
import BaseUI from '../BaseUI'
import Icon from '../icon'
export default {
    extends:BaseUI,
    name:'ui-file-select',
    data(){
        return {
            clickFlag:false,
            ready:true,
            selected:false,
            isActive: false,
            hasSelection: false,
            hasMultiple: false,
            displayText: '',
            focusRing: {
                top: 0,
                left: 0,
                size: 0,
                initialized: false
            }
        }
    },
    props:{
        name: {
            type: String,
            required: true
        },
        label: String,
        accept: String,
        multiple: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'primary' // 'primary' or 'secondary'
        },
        color: {
            type: String,
            default: 'default' // 'default', 'primary', 'accent'
        },
        size: {
            type: String,
            default: 'normal' // 'small', 'normal', 'large'
        },
        iconPosition: {
            type: String,
            default: 'left' // 'left' or 'right'
        },
        disableRipple: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        classes() {
            return [
                `ui-fileupload--type-${this.type}`,
                `ui-fileupload--color-${this.color}`,
                `ui-fileupload--icon-position-${this.iconPosition}`,
                `ui-fileupload--size-${this.size}`,
                { 'is-active': this.isActive },
                { 'is-multiple': this.hasMultiple },
                { 'is-raised': this.raised },
                { 'is-disabled': this.disabled }
            ];
        },
    },
    methods:{
        onChange(e) {
            let displayText;
            const input = this.$el.querySelector('input');

            if (input.files && input.files.length > 1) {
                displayText = `${input.files.length} files selected`;
            } else {
                displayText = e.target.value.split('\\').pop();
            }

            if (displayText) {
                this.hasSelection = true;
                this.displayText = displayText;
                this.hasMultiple = input.files.length > 1;

                //this.$nextTick(() => this.refreshFocusRing());
            }

            if(input.files.length > 0 ){
                this.$emit('change', input.files, e);
                this.selected=true;
            }
            //this.$refs[name].displayText=this.placeholder;
        },
        clear(){
            return new Promise((resolve,reject)=>{
                if(this.selected){
                    this.ready = false;
                    this.$forceUpdate();
                    this.$nextTick(()=>{
                        this.selected = false;
                        this.ready = true;
                        resolve(true);
                    })
                }else{
                    this.ready=true;
                    resolve(true);
                }
            })
            //this.$refs.input.files = ;
            //this.$el.querySelector('form').get(0).reset();
        },
        click(){
            this.clear().then((ready)=>{
                if(ready){
                    if(!this.clickFlag){
                        this.$el.querySelector('input').click();
                        setTimeout(()=>{this.clickFlag = false},1000);
                    }
                    this.clickFlag = true;
                }
            });
        }
    },
    components:{
        'ui-icon':Icon,
    }
}
</script>
