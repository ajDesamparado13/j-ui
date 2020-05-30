<template>
    <div class="ui-field-group">
        <label v-if="labelPosition == 'top'" class="label field-group-label">
            {{label}}
            <span v-if="required && requiredText" class="label-required">
                {{requiredText}}
            </span>
        </label>
        <div class="field-group field is-grouped is-horizontal">
            <div class="field-label" v-if="labelPosition != 'top'">
                <label class="label">
                    {{group_label}}
                </label>
            </div>
            <div class="field-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'ui-field-group',
    props:{
        required: { type: Boolean, default: false },
        requiredText: { type: String, default: 'required' },
        label:{ type:String, default:'', },
        labelPosition:{ type:String, default:'top', },
        isHorizontal:{ type:Boolean, default:true, }
    },
}
</script>

<style lang="scss">
.ui-field-group{
    display:flex;
    flex-direction:column;
    .field-body{
        flex-grow:1;
        .label{
            color:initial;
            font-weight:initial;
        }
    }
}
</style>
