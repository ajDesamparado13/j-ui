<template>
  <div class="calendar-month">
    <ul class="options">
      <li v-for="( opt,index ) in monthOptions" :key="index"
      :class="{'is-current':isCurrent(index), 'is-selected':isSelected(index)}"
      class="option"
      @click="select(index)"
      >{{opt}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'calendar-month',
  model: { prop: 'value', event: 'update' },
  props: {
    lang: { type: Object, required: true },
    value: {
      type: Date,
      required: true
    }
  },
  computed: {
    month () {
      return this.value.getMonth()
    },
    year () {
      return this.value.getFullYear()
    },
    date () {
      return this.value.getDate()
    },
    monthOptions () {
      return this.lang.months.full
    }
  },
  methods: {
    isSelected (month) {
      return this.month === month
    },
    isCurrent (month) {
      var current = new Date()
      return this.year === current.getFullYear() && month === current.getMonth()
    },
    update (year = this.year, month = this.month, date = this.date) {
      this.$emit('update', new Date(year, month, date))
    },
    select (month) {
      this.update(this.year, month, this.date)
      this.$nextTick(() => {
        this.$emit('select', { event: 'select', data: { value: this.value } })
      })
    },
    next () {
      if (this.month === 11) {
        return this.update(this.year + 1, 0)
      }
      return this.update(this.year, this.month + 1)
    },
    previous () {
      if (this.month === 0) {
        return this.update(this.year - 1, 11)
      }
      return this.update(this.year, this.month - 1)
    },
    initialize () {

    }
  }
}
</script>

<style lang="scss">
.calendar-month{
  ul.options{
    padding:0px;
  }
}
</style>
