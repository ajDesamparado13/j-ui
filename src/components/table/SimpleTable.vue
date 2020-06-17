<template>
  <table class="ui-table table" :class="classes">
    <thead v-if="hasColumns">
      <component :is="getHeaderComponent()" v-for="(column,colNum) in columns" :key="colNum"> {{ column.label }} </component>

    </thead>
    <tbody >
        <template v-if="hasData && hasColumns">
          <component :is="getRowComponent()" v-for="(datum,rowNum) in items" :key="rowNum">

            <component :is="getDataComponent()"  v-for="(column,colNum) in columns" :key="`row-${rowNum}_col-${colNum}`">
                {{ datum[column.name] }}
            </component>

          </component>
        </template>

        <template v-else>
          <tr v-if="data.length==0">
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
    getHeaderComponent () {
      return 'th'
    },
    getRowComponent () {
      return 'tr'
    },
    getDataComponent () {
      return 'td'
    }
  }
}
</script>
