export default{
    data(){
        return{
            isFocused: false,
            isActive: false,
        }
    },
    props:{
    },
    methods:{
        refresh(){
            this.$emit('refresh');
        },
        /**
         * Focus method that work dynamically depending on the component.
         */
        focus() {
            if (this.$data._elementRef === undefined) return
            this.$nextTick(() => this.$el.querySelector(this.$data._elementRef).focus())
        },
        onBlur($event) {
            this.isFocused = false
            this.isActive = false
        },

        onFocus($event) {
            this.isFocused = true
            this.isActive = true
        },
    },
}
