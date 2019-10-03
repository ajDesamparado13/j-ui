<template>
    <label
        class="ui-radio radio"
        ref="label"
        :class="[ { 'is-disabled': disabled }]"
        :disabled="disabled"
        @click="$refs.input.focus()"
        @keydown.prevent.enter="$refs.label.click()">
        <input
            type="radio"
            v-model="newValue"
            v-on="$listeners"
            v-bind="$attrs"
            ref="input"
            @click.stop
            :disabled="disabled"
            :name="name"
            :value="nativeValue">
        <span class="checkmark" :class="[ status ]" />
        <span class="control-label"><slot/></span>
    </label>
</template>

<script>
export default {
    name:'ui-radio',
    model:{
        prop:'value',
        event:'update',
    },
    props: {
        value: [String, Number, Boolean, Function, Object, Array],
        nativeValue: [String, Number, Boolean, Function, Object, Array],
        type: String,
        disabled: Boolean,
        invalid:Boolean,
        name: String,
    },
    data() {
        return {
            newValue: this.value
        }
    },
    computed: {
        classes:{

        },
        status(){
            return this.invalid ? 'is-danger' : 'is-primary';
        },
    },
    watch: {
        newValue(value){
            console.log(value)
            this.$emit('update',value);
        },
        /**
        * When v-model change, set internal value.
        */
        value(value) {
            if(this.newValue !== value){
                this.newValue = value
            }
        }
    },
}
</script>
