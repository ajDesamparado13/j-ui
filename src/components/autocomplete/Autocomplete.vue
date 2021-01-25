<template>
    <ui-field class="ui-autocomplete" v-bind="$_Arr.only($attrs,['label','required','message','loading','invalid','name','disabled'])">
        <ui-dropdown ref="dropdown" :show="showSuggestions">
            <ui-input ref="input" slot="trigger" v-model="newValue"
            @keydown-enter="onEnter"
            @keydown.native.tab="onTab"
            @keydown.native.up.prevent="onArrowKey('up')"
            @keydown.native.down.prevent="onArrowKey('down')"
            />
              <div class="autocomplete-suggestions" @mouseover="()=> isMouseHovered = true" @mouseout="()=>isMouseHovered=false">
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
import { Field } from '../field'
import { Dropdown } from '../dropdown'
import { Input } from '../input'
export default {
  name: 'ui-autocomplete',
  model: { prop: 'value', event: 'autocomplete-update' },
  data () {
    return {
      newValue: '',
      hovered: '',
      appendTimer: null,
      appendData: [],
      isMouseHovered: false
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: false
    },
    field: {
      type: String,
      default: 'value'
    },
    openOnFocus: {
      type: Boolean,
      default: false
    },
    useCaseSensitive: {
      type: Boolean,
      default: false
    },
    appendOptions: {
      type: Function,
      required: false
    }
  },
  computed: {
    hasValue () {
      return this.newValue.toString().trim().length > 0
    },
    showSuggestions () {
      return this.hasMatches && (this.openOnFocus || this.hasValue)
    },
    hasMatches () {
      return this.matches.length > 0
    },
    items () {
      let items = this.options.map((x) => x)
      this.appendData.forEach(value => {
        let exists = items.findIndex((val) => { return val === value }) >= 0
        if (!exists) items.push(value)
      })
      return items
    },
    matches () {
      if (!this.newValue) return this.items
      let matches = this.items.filter((item) => {
        return this.isMatch(this.newValue, item) && this.newValue !== item
      })
      return matches.length > 0 ? matches : this.items
    }
  },
  methods: {
    isMatch (a, b) {
      let valueA = this.useCaseSensitive ? a : a.toLowerCase()
      let valueB = this.useCaseSensitive ? b : b.toLowerCase()
      return valueA.indexOf(valueB) >= 0 || valueB.indexOf(valueA) >= 0
    },
    select (option) {
      this.setValue(option)
      this.$refs['dropdown'].close()
    },
    setValue (value) {
      this.newValue = value
    },
    onTab (event) {
      if (!this.$refs['dropdown'].isActive) return
      event.preventDefault()
      this.setValue(this.hovered)
    },
    onEnter (e) {
      let hoveredExists = this.matches.findIndex((val) => { return val === this.hovered }) >= 0
      if (hoveredExists) {
        this.setValue(this.hovered)
      }
      this.$emit('keydown-enter')
      this.$refs['dropdown'].close()
    },
    onArrowKey (direction) {
      const sum = direction === 'down' ? 1 : -1
      let index = this.matches.findIndex((val) => { return val === this.hovered })
      let selectIndex = index + sum
      if (selectIndex >= this.matches.length) selectIndex = 0
      this.$nextTick(() => {
        this.hovered = this.matches[selectIndex >= 0 ? selectIndex : 0]
      })
    },
    onHover (e) {
      this.isMouseHovered = true
      let hoveredValue = e.toElement.innerText
      this.hovered = hoveredValue
    },
    setAppendOptions () {
      if (typeof this.appendOptions !== 'function') return
      clearTimeout(this.appendTimer)
      this.appendTimer = null
      this.appendTimer = setTimeout(async () => {
        this.appendData = await this.appendOptions(this.newValue)
      }, 1000)
    },
    scrollOnHovered () {
      if (this.isMouseHovered) return
      const list = this.$refs['dropdown'].$el.querySelector('.dropdown-content')
      const element = list.querySelectorAll('.dropdown-item.is-hovered')[0]
      if (!element) return
      list.scrollTop = element.offsetTop - (list.clientHeight / 2)
    }
  },
  watch: {
    hovered () {
      this.$nextTick(() => {
        this.scrollOnHovered()
      })
    },
    matches () {
      let index = this.matches.findIndex((val) => { return val === this.hovered })
      if (!(index >= 0)) this.hovered = this.matches[0]
    },
    value: {
      immediate: true,
      handler (value) {
        this.setValue(value)
      }
    },
    newValue (value) {
      if (value === this.value) return
      this.$emit('autocomplete-update', value)
      this.setAppendOptions()
    }
  },
  components: {
    'ui-dropdown': Dropdown,
    'ui-input': Input,
    'ui-field': Field
  }
}
</script>
<style lang="scss">
.ui-autocomplete {
    .is-hovered{
        background: #cccccc;
    }
}
</style>
