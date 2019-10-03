<template>
    <textarea
        class="textarea"
        v-on="$listeners"
        v-bind="$attrs"
        :value="newValue"
        @keypress.enter="onEnter"
        />
</template>

<script>
import autosize from 'autosize';

export default {
    name:'ui-textarea',
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
        value: {
            type: [String, Number],
            default: ''
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        autosize: {
            type: Boolean,
            default: true
        },
    },
    methods:{
        onEnter(e) {
            this.setValue(e.target.value);
            this.$nextTick(()=>{
                this.$emit('keydown-enter', e);
            })
        },
        isEmpty(value){
            return this.$formatter.isEmpty(value);
        },
        updateValue(event){
            if(event == undefined){
                return;
            }
            this.$nextTick(() => {
                var value = event.target.value
                this.setValue( value )
            })
        },
        setValue(value){
            this.newValue = value
        },
        reset() {
            // Blur the input if it's focused to prevent required errors
            // when it's value is reset
            if ( document.activeElement === this.$el) {
                document.activeElement.blur();
            }
            this.setValue(this.initialValue);
        },
        refreshSize() {
            if (this.autosizeInitialized) {
                autosize.update(this.$refs.textarea);
            }
        },
    },
    watch:{
        /**
         * When v-model is changed:
         *   1. Set internal value.
         *   2. If it's invalid, validate again.
         */
        value(value) {
            var val = value;
            if(val != this.newValue){
                this.setValue(val);
            }
        },
        newValue(value) {
            var val = value;
            if(val !== this.value){
                this.$emit('update',val);
            }
        },
    },
    created() {
        var value = this.value;
        if (this.isEmpty(value)) {
            this.initialValue = '';
        }
        this.setValue(value);
    },
    mounted() {
        this.$el.oninput = this.updateValue;
        if (this.autosize) {
            autosize(this.$refs.textarea);
            this.autosizeInitialized = true;
        }
    },
    beforeDestroy() {
        if (this.autosizeInitialized) {
            autosize.destroy(this.$el);
        }
    },
};
</script>
