<template>
  <table class="ui-table table" :class="{ 'no-content-table': !hasData }">
    <thead v-if="hasColumns && createColumns">
        <component  v-for="(column,colNum) in columns"
        :key="colNum"
        v-bind="getHeaderProps(column,{ colNum })"
        v-on="getHeaderEvents(column,{colNum})"
        :is="getHeaderComponent(column,{colNum})"
        > {{ column[labelKey] }} </component>
    </thead>
    <tbody v-if="createBody">
        <component v-bind="getRowProps(datum,{rowNum})" v-on="getRowEvents(datum,{ rowNum })"  :is="getRowComponent(datum,{ rowNum })" v-for="(datum,rowNum) in items" :key="rowNum">

          <template v-for="(column,colNum) in columns">

            <td v-if="isTD(column)" :key="`row-${rowNum}_col-${colNum}`"
            v-html="dataFilter( datum[column[valueKey]] , datum, column)"
            v-bind="getDataProps(datum,column,{rowNum,colNum})"
            v-on="getDataEvents(datum,column)"
            />

            <component v-else :key="`row-${rowNum}_col-${colNum}`"
            v-bind="getDataProps(datum,column,{rowNum,colNum})"
            v-on="getDataEvents(datum,column)"
            :is="getDataComponent(column)"
            />

          </template>
        </component>
        <tr v-if="hasData && noContentText">
          <td style="text-align:center" :colspan="(columns.length)">{{noContentText}}</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
import { make } from './helper'
import Arr from 'freedom-js-support/src/utilities/arr'
export default {
  name: 'ui-simple-table',
  data () {
    return {}
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Object,
      required: false
    },
    isNumbered: {
      type: Boolean,
      default: false
    },
    startNumber: {
      type: Number,
      default: 1
    },
    numberKey: {
      type: String,
      default: 'no'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'name'
    },
    config: {
      type: Object,
      required: false
    },
    noContentText: {
      type: String,
      default: ''
    },
    createColumns: {
      type: Boolean,
      default: true
    },
    createBody: {
      type: Boolean,
      default: true
    },
    isConfigurableRow: {
      type: Boolean,
      default: false
    },
    isConfigurableHeader: {
      type: Boolean,
      default: false
    },
    isConfigurableCell: {
      type: Boolean,
      default: false
    }

  },
  computed: {
    hasData () {
      return this.data.length > 0
    },
    hasColumns () {
      return this.columns.length > 0
    },
    hasNumberColumn () {
      return this.isNumbered && Boolean(this.columns.find((column) => {
        return column.name === this.numberKey
      }))
    },
    items () {
      let items = this.data
      if (this.hasNumberColumn) {
        return items.reduce((arr, item, index) => {
          item[this.numberKey] = this.startNumber + index
          arr.push(item)
          return arr
        }, [])
      }
      return items
    }
  },
  methods: {
    getHeaderEvents (column, params = {}) {
      return !this.isConfigurableHeader ? {} : make.events(column['header'], Object.assign(params, { column }))
    },
    getHeaderProps (column, { colNum = null }) {
      const defaults = {
        column,
        class: [ `header-cell-${column.name}` ]
      }
      return !this.isConfigurableHeader ? defaults : make.props(column['header'], { index: colNum }, defaults)
    },
    getHeaderComponent (column) {
      return !this.isConfigurableHeader ? 'th' : make.component(column['header'], 'th')
    },
    getRowComponent (model, { rowNum = null }) {
      return !this.isConfigurableRow ? 'tr' : make.component(Arr.getConfig(this.rows), 'tr', { model, index: rowNum })
    },
    getRowEvents (model, { rowNum = null }) {
      if (!this.isConfigurableRow) {
        return {}
      }
      let config = Arr.getConfig(this.rows, (_config) => { return typeof _config.get === 'function' ? _config.get(model, rowNum) : {} })
      return make.events(config, { model, rowNum })
    },
    getRowProps (model, { rowNum = null }) {
      const defaults = { class: [ `row-${model.id}` ] }
      if (!this.isConfigurableRow) {
        return defaults
      }
      let config = Arr.getConfig(this.rows, (_config) => { return typeof _config.get === 'function' ? _config.get(model, rowNum) : {} })
      return make.props(config, defaults)
    },
    getDataComponent (column) {
      return make.component(column['data'], 'td')
    },
    getDataEvents (model, column) {
      return make.events(column['data'], { model, column })
    },
    getDataProps (model, column, { rowNum = null, colNum = null }) {
      return make.props(column['data'], {
        model,
        id: `cell-data-row-${rowNum}_col-${colNum}`,
        class: [ `data-cell-${column.name}` ]
      })
    },
    getItems () {
      return this.items
    },
    isTD (column) {
      return this.getDataComponent(column) === 'td'
    },
    dataFilter (data, model, column) {
      let filter = column.filter
      return typeof filter === 'function' ? filter(data, model, column) : data
    },
    initializeComponents () {
      let components = Arr.getProperty(this.config, 'components', [], (property) => {
        return Array.isArray(property) ? property : Object.values(property)
      })
      components.forEach((component) => { this.$options.components[component.name] = component })
    }
  },
  created (vm) {
    this.initializeComponents()
  }
}
</script>
