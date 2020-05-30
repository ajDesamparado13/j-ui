<template>
  <table class="ui-table table" :class="classes">
    <component :table="this" v-if="hasColumns && !noHeaders" :bus="bus" :is="createHeader()" v-bind="header" :columns="columns"></component>
    <template v-if="!noBody">
        <tbody v-if="hasData && hasColumns" >
          <component
            v-for="(item,index) in items"
            v-model="items[index]"
            v-bind="row"
            :table="this"
            :primaryKey="primary_key"
            :key="index"
            :bus="bus"
            :focusable="focusable"
            :index="index"
            :columns="columns"
            :is="createRow()"
          ></component>
        </tbody>
        <tbody v-else>
          <tr v-if="data.length==0">
            <td style="text-align:center" :colspan="(columns.length)">{{noContentText}}</td>
          </tr>
        </tbody>
    </template>
  </table>
</template>


<script>
import header_row from "./components/Header/Row";
import data_row from "./components/Row/Data";
export default {
  name: "ui-table",
  data() {
    return {};
  },
  props: {
    tableType:{type:String,default: 'default' },
    noBody: { type: Boolean, default: false },
    primaryKey: { type: String, required: false },
    noHeaders: { type: Boolean, default: false },
    bus: { required: false },
    backend_sorting: { type: Boolean, default: false },
    sort_multiple: { type: Boolean, default: false },
    focusable: { type: Boolean, default: false },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    row: { type: Object, required: false },
    header: { type: Object, required: false },
    noContentText: { type: String, default: "No result found" },
    sort: { type: Function, required: false },
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
      default: "no"
    }
  },
  computed: {
    hasData()
    {
      return Array.isArray( this.data ) && this.data.length > 0
    },
    hasColumns() {
      return Array.isArray( this.columns ) && this.columns.length > 0
    },
    primary_key() {
      return this.primaryKey || this.isNumbered || this.columns[0].name || 'id'
    },
    classes() {
      return [{ "no-content-table": !this.hasData}];
    },
    items() {
      var items = JSON.parse(JSON.stringify(this.data));
      if (this.isNumbered) {
        var numbering = this.startNumber;
        for (let i in items) {
          items[i][this.numberKey] = numbering;
          numbering++;
        }
      }
      return items;
    }
  },
  methods: {
    createRow(type) {
      var row = this.row;
      if (row && row.component) {
        return row.component;
      }
      return "data-row";
    },
    createHeader(type) {
      var header = this.header;
      if (header && header.component) {
        return header.component;
      }
      return "header-row";
    },
    setRowFocus({ row, model, focus }) {
      var el = this.$el.querySelector(`#row-${row}`);
      if (!el) {
        return;
      }

      if (focus) {
        el.classList.add("is-active");
      } else {
        el.classList.remove("is-active");
      }
    },
    clearBusEvents() {
      if (!this.bus) {
        return;
      }
      this.bus.$off("row-focus", this.setRowFocus);
    },
    listenBusEvents() {
      if (!this.bus) {
        return;
      }
      this.bus.$on("row-focus", this.setRowFocus);
    }
  },
  mounted() {
    this.listenBusEvents();
  },
  beforeDestroy() {
    this.clearBusEvents();
  },
  components: {
    "header-row": header_row,
    "data-row": data_row
  }
};
</script>


<style lang="scss">
.ui-table{
    border-collapse:separate;
    th{
        border:0px;
        padding:0.5em;
    }
    td{
        padding: 20px 0px;
        vertical-align:middle;
        @media only screen and (max-width: 768px){
            padding: calc(20px/2) calc(10px/2);
        }
    }
}
</style>
