<template>
  <table class="ui-table table" :class="{ 'no-content-table': !hasData }">
    <thead v-if="hasColumns && createColumns">
      <component v-for="(column,colNum) in columns" :key="colNum"
       v-bind="getHeaderProps('header',null,column)"
       v-on="getHeaderEvents(null,column)"
       :is="getHeaderComponent(column)"
       > {{ column[labelKey] }} </component>
    </thead>
    <tbody v-if="createBody">
        <template v-if="hasData && hasColumns">
          <component v-bind="getRowProps(datum,{rowNum})" v-on="getRowEvents(datum,rowNum)"  :is="getRowComponent(datum,rowNum)" v-for="(datum,rowNum) in items" :key="rowNum">

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
    getItems () {
      return this.items
    },
    getHeaderComponent (column) {
      return this.getComponent(column['header'], 'th')
    },
    getRowComponent (data, index) {
      return this.getComponent(this.rows, 'tr', { model: data, index })
    },
    getDataComponent (column) {
      return this.getComponent(column['data'], 'td')
    },
    getComponent (config, defaultComponent, params = {}) {
      if (!config || !config.component) {
        return defaultComponent
      }
      if (typeof config.component === 'function') {
        return config.component(params)
      }
      return config.component || defaultComponent
    },
    getRowEvents (model, rowNum) {
      let config = this.rows
      return this.getEvents(typeof config.getEvents === 'function' ? config.getEvents(model, rowNum) : {}, { model })
    },
    getDataEvents (model, column) {
      return this.getEvents(column.events, { model })
    },
    getHeaderEvents (model, column) {
      return this.getEvents(column.events, { model })
    },
    getEvents (config, params) {
      config = typeof config === 'object' ? config : {}
      return Object.keys(config).reduce((events, key) => {
        if (typeof config[key] === 'function') {
          events[key] = () => { config[key](params) }
        }
        return events
      }, {})
    },
    getDataProps (model, column, { rowNum = null, colNum = null }) {
      let props = this.getProps(column['data'], { model, id: `cell-data-row-${rowNum}_col-${colNum}` })
      props.class = this.getClassProps(props, [ `data-cell-${column.name}` ])
      return props
    },
    getRowProps (model, { rowNum = null }) {
      let config = this.rows
      let props = Object.assign({ model }, typeof config.getProps === 'function' ? config.getProps(model, rowNum) : {})
      props.class = this.getClassProps(props, [ `row-${model.id}` ])
      return props
    },
    getHeaderProps (model, column, { colNum = null }) {
      let props = this.getProps(column['header'], { model, index: colNum })
      props.class = this.getClassProps(props, [ `header-cell-${column.name}` ])
      return props
    },
    getProps (config, defaults = {}) {
      return Object.assign(defaults, config.props)
    },
    getClassProps (props, defaults) {
      return Object.assign(this.getClassObject(defaults), this.getClassObject(props.class))
    },
    getClassObject (classProp) {
      if (!classProp || (typeof classProp === 'object' && !Array.isArray(classProp))) {
        return {}
      }

      if (typeof classProp === 'string') {
        classProp = classProp.split(' ')
      }

      if (Array.isArray(classProp)) {
        return classProp.reduce((result, item, index, array) => {
          result[item] = true
          return result
        }, {})
      }
      return classProp
    },
    isTD (column) {
      return this.getDataComponent(column) === 'td'
    },
    dataFilter (data, model, column) {
      let filter = column.filter

      if (!filter || typeof filter !== 'function') {
        return data
      }

      return filter(data, model)
    },
    initializeComponents () {
      if (!(this.config && this.config.components)) {
        return
      }

      Object.values(this.config.components).forEach((component) => {
        this.$options.components[component.name] = component
      })
    }
  },
  created (vm) {
    this.initializeComponents()
  }
}
</script>
