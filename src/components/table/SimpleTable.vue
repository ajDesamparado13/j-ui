<template>
  <table class="ui-table table" :class="{ 'no-content-table': !hasData }">
    <thead v-if="hasColumns && createColumns">
      <component v-for="(column,colNum) in columns" :key="colNum"
       v-bind="getHeaderProps(column,{ colNum })"
       v-on="getHeaderEvents(column,{colNum})"
       :is="getHeaderComponent(column,{colNum})"
       > {{ column[labelKey] }} </component>
    </thead>
    <tbody v-if="createBody">
        <template v-if="hasData && hasColumns">
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
        </template>

        <template v-else>
          <tr v-if="data.length==0 && noContentText">
            <td style="text-align:center" :colspan="(columns.length)">{{noContentText}}</td>
          </tr>
        </template>
    </tbody>
  </table>
</template>

<script>
import { make, getConfig, getProperty } from './helper'
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
    }
  },
  computed: {
    hasData () {
      return this.data.length > 0
    },
    hasColumns () {
      return this.columns.length > 0
    },
    items () {
      var items = JSON.parse(JSON.stringify(this.data))
      if (this.isNumbered) {
        items.forEach((item, index) => {
          items[index][this.numberKey] = index + this.startNumber
        })
      }
      return items
    }
  },
  methods: {
    getHeaderEvents (column, params = {}) {
      return make.events(column.events, Object.assign(params, { column }))
    },
    getHeaderProps (column, { colNum = null }) {
      return make.props(column['header'], {
        index: colNum,
        class: [ `header-cell-${column.name}` ]
      })
    },
    getHeaderComponent (column) {
      return make.component(column['header'], 'th')
    },
    getRowComponent (model, { rowNum = null }) {
      return make.component(getConfig(this.rows), 'tr', { model, index: rowNum })
    },
    getRowEvents (model, { rowNum = null }) {
      let config = getConfig(this.rows, (_config) => { return typeof _config.get === 'function' ? _config.get(model, rowNum) : {} })
      return make.events(config, { model, rowNum })
    },
    getRowProps (model, { rowNum = null }) {
      let config = getConfig(this.rows, (_config) => { return typeof _config.get === 'function' ? _config.get(model, rowNum) : {} })
      return make.props(config, { class: [ `row-${model.id}` ] })
    },
    getDataComponent (column) {
      return make.component(column['data'], 'td')
    },
    getDataEvents (model, column) {
      return make.events(column.events, { model, column })
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

      if (!filter || typeof filter !== 'function') {
        return data
      }

      return filter(data, model, column)
    },
    initializeComponents () {
      let components = getProperty(this.config, 'components', [], (property) => {
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
