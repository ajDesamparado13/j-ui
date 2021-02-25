<template>
<ui-field class="ui-radio-group" v-bind="$_Arr.only($attrs,['label','required','loading','invalid','disabled','error','help'])">
    <ui-radio v-for="( option,index ) in options" :key="index" v-bind="{ name }" v-model="newValue" :value="getValue(option)">
        {{ getLabel(option) }}
    </ui-radio>
</ui-field>
</template>

<script>
export default {
  name: 'ui-radio-group',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: [String, Number, Boolean, Function, Object, Array],
    options: { type: Array, required: true },
    name: { type: String, required: true },
    keyLabel: { type: String, default: 'value' },
    keyValue: { type: String, default: 'value' }
  },
  methods: {
    getLabel (option) {
      return this.$_Arr.getProperty(option, this.keyLabel, option)
    },
    getValue (option) {
      return this.$_Arr.getProperty(option, this.keyValue, option)
    }
  }
}
</script>

<style lang="scss">
.ui-radio-group{

}
</style>
