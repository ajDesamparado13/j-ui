<template>
  <table class="ui-table table" :class="classes">
    <thead v-if="hasColumns">
      <component :class="[ `header-cell-${column.name}` ]" :is="getHeaderComponent(column)" v-for="(column,colNum) in columns" :key="colNum"> {{ column.label }} </component>
    </thead>
    <tbody >
        <template v-if="hasData && hasColumns">
          <component :class="`row-${datum.id}`" :is="getRowComponent()" v-for="(datum,rowNum) in items" :key="rowNum">

            <template v-for="(column,colNum) in columns">

              <td v-if="isTD(column)"
              v-html="dataFilter( datum[column.name] , datum, column)"
              v-bind="getProps('data',datum,column)"
              v-on="getEvents('data',datum,column)"
              :is="getDataComponent(column)"
              :id="`cell-data-row-${rowNum}_col-${colNum}`"
              :key="`row-${rowNum}_col-${colNum}`"
              ref="cell-data"
              >

              </td>

              <component v-else
              v-bind="getProps('data',datum,column)"
              v-on="getEvents('data',datum,column)"
              :is="getDataComponent(column)"
              :id="`cell-data-row-${rowNum}_col-${colNum}`"
              :key="`row-${rowNum}_col-${colNum}`"
              ref="cell-data"
              >
              </component>

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
    config: {
      type: Object,
      required: false
    },
    noContentText: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasData () {
      return Array.isArray(this.data) && this.data.length > 0
    },
    hasColumns () {
      return Array.isArray(this.columns) && this.columns.length > 0
    },
    classes () {
      return [{ 'no-content-table': !this.hasData }]
    },
    items () {
      var items = JSON.parse(JSON.stringify(this.data))
      if (this.isNumbered) {
        var numbering = this.startNumber
        for (let i in items) {
          items[i][this.numberKey] = numbering
          numbering++
        }
      }
      return items
    }
  },
  methods: {
    getHeaderComponent (column) {
      let config = column['header']
      if (!config || !config.component) {
        return 'th'
      }
      return config.component || 'th'
    },
    getRowComponent () {
      return 'tr'
    },
    getDataComponent (column) {
      let config = column['data']
      if (!config || !config.component) {
        return 'td'
      }
      return config.component || 'td'
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
    getEvents (type = 'data', model, column) {
      let config = column.events || {}
      let events = {}

      for (let key in config) {
        events[key] = () => {
          config[key](model)
        }
      }

      return events
    },
    getClassObject (classProp) {
      if (!classProp) {
        classProp = {}
      }

      if (typeof classProp !== 'object') {
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
    getProps (type = 'data', model, column) {
      let props = {}
      let config = column[type]
      if (config && config.props) {
        props = config.props
      }
      props.model = model
      let defaultClasses = this.getClassObject([
        `${type}-cell-${column.name}`
      ])
      props.class = Object.assign(this.getClassObject(props.class), defaultClasses)
      return props
    },
    initializeComponents () {
      let config = this.config
      let components = config ? config.components : null
      if (!components) {
        return
      }

      for (let key in components) {
        let component = components[key]
        this.$options.components[component.name] = component
      }
    }
  },
  created (vm) {
    this.initializeComponents()
  }
}
</script>
