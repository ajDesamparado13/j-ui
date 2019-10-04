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

<style lang="scss">
$speed-slow: 150ms !default;

$radio-active-background-color: $primary !default;
$radio-size: 1.25em !default;
$colors: (
    "primary" #006a4d,
);

.ui-radio {
    outline:none;
    display: inline-flex;
    align-items:center;

    //input[type=radio] {
    //    position: absolute;
    //    left: 0;
    //    opacity: 0;
    //    outline: none;
    //    z-index: -1;
    //}
    //.checkmark{
    //    display: flex;
    //    flex-shrink: 0;
    //    position: relative;
    //    cursor: pointer;
    //    width: $radio-size;
    //    height: $radio-size;
    //    transition: background $speed-slow $easing;
    //    border-radius: 50%;
    //    border: 2px solid $grey;
    //    @each $name, $pair in $colors {
    //        $color: nth($pair, 1);
    //        &.is-#{$name}:before {
    //            background: $color;
    //        }
    //    }
    //    &:before {
    //        content: "";
    //        display: flex;
    //        position: absolute;
    //        left: 50%;
    //        margin-left: calc(-#{$radio-size}/2);
    //        bottom: 50%;
    //        margin-bottom: calc(-#{$radio-size}/2);
    //        width: $radio-size;
    //        height: $radio-size;
    //        transition: transform $speed-slow $easing;
    //        border-radius: 50%;
    //        transform: scale(0);
    //        background-color: $radio-active-background-color;
    //    }
    //    &:checked{
    //        border-color: $radio-active-background-color;
    //        @each $name, $pair in $colors {
    //            $color: nth($pair, 1);
    //            &.is-#{$name} {
    //                border-color: $color;
    //            }
    //        }
    //        &:before {
    //            transform: scale(.5);
    //        }
    //    }
    //    &:focus {
    //        box-shadow: 0 0 0.5em rgba($grey, 0.8);
    //        &:checked {
    //            box-shadow: 0 0 0.5em rgba($radio-active-background-color, 0.8);
    //            @each $name, $pair in $colors {
    //                $color: nth($pair, 1);
    //                &.is-#{$name} {
    //                    box-shadow: 0 0 0.5em rgba($color, 0.8);
    //                }
    //            }
    //        }
    //    }
    //}
    //&:hover {
    //    input[type=radio]:not(:disabled) + .checkmark {
    //        border-color: $radio-active-background-color;
    //        @each $name, $pair in $colors {
    //            $color: nth($pair, 1);
    //            &.is-#{$name} {
    //                border-color: $color;
    //            }
    //        }
    //    }
    //}
    .control-label {
        padding-left: 0.5em;
    }
}

</style>
