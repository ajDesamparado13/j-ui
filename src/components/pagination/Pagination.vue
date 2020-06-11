<template>
  <div class="ui-pagination">
    <div class="pagination-container">
        <component :is="button" class="pagination-item prev-page" type="secondary" @click="prevPage" :disabled="value == 1"
        >
          <component :icon="iconLeft" :is="iconComponent" />
        </component>
        <template v-for="( page,index ) in pages">
          <component :key="`pages-${index}`"
          class="pagination-item"
          :class="{ 'current-page':page == value, }"
          :type="page==value?'primary':'secondary'"
          color="primary"
          :disabled="page==value"
          @click="load(page)"
           :is="!isNaN(Number(page)) > 0 ? buttonComponent : 'span'">
           {{page}}
          </component>
        </template>
        <component
         class="pagination-item next-page"
          type="secondary"
          @click="nextPage"
          :disabled="disableNextPage || value==total"
          :is="buttonComponent"
        >
          <component :icon="iconRight" :is="iconComponent" />
        </component>
    </div>
  </div>
</template>

<script>
import config from '../config'
export default {
  name: 'ui-pagination',
  props: {
    /*
    * Button component to be used
    * default: 'ui-button'
    */
    buttonComponent: {
      type: String,
      default: config.defaultButton.component
    },
    /*
    * Icon component to be used
    * default: 'ui-icon'
    */
    iconComponent: {
      type: String,
      default: config.defaultIcon

    },
    /*
    * Prop String for icon to be used for previous page button
    */
    iconLeft: {
      type: String,
      default: config.defaultPagination.iconLeft
    },
    /*
    * Prop String for icon to be used for next page button
    */
    iconRight: {
      type: String,
      default: config.defaultPagination.iconRight
    },
    /*
    * Minimum number of pages that results to ellipsis
    */
    minimumHiddenPages: {
      type: Number,
      default: 2
    },
    /*
    * Maximum number of page selection items
    */
    maxPager: {
      type: Number,
      default: 5
    },
    /*
    * Current Page Selected
    */
    value: {
      type: [String, Number],
      required: true
    },
    /*
    * Total number of Pages
    */
    total: {
      type: Number,
      default: 1
    },
    /*
    * Flag for disabling the next page
    */
    disableNextPage: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    pages () {
      var ellipsis = '...'
      var pages = this.range(this.startPage, this.endPage)
      var count = pages.length - 1
      var lowest = pages[0]
      var highest = pages[count]
      var minimum = this.minimumHiddenPages
      var total = this.total

      var sum = 1 + minimum
      if (sum <= lowest) {
        pages.unshift(sum == lowest ? this.range(1, minimum) : ellipsis)
        pages = pages.flat()
      }

      var difference = total - minimum
      if (difference >= highest) {
        pages = pages.concat(difference == highest ? this.range(total - minimum + 1, total) : ellipsis)
      }

      if (pages.indexOf(1) == -1) {
        pages.unshift(1)
      }

      if (pages.indexOf(total) == -1) {
        pages.push(total)
      }

      return pages
    },
    endPage () {
      var endPage = this.startPage + this.maxPager - 1
      return endPage >= this.total ? this.total : endPage
    },
    startPage () {
      var { total, maxPager } = this
      var currentPage = Number(this.value)
      var quotient = maxPager / 2
      var highestDenom = Math.ceil(quotient)
      var lowestDenom = Math.floor(quotient)

      if (total <= maxPager || currentPage <= highestDenom) {
        return 1
      }

      var startPage = 1

      if (total - currentPage >= lowestDenom) {
        startPage = currentPage - highestDenom
      } else if (total == currentPage) {
        startPage = currentPage - (maxPager - 1)
      } else {
        startPage = currentPage - highestDenom
      }

      return startPage <= 1 ? 1 : startPage
    }
  },
  methods: {
    range (start, end) {
      return Array(end - start + 1).fill().map((_, index) => start + index)
    },
    nextPage () {
      return this.load(this.value, 1)
    },
    prevPage () {
      return this.load(this.value, -1)
    },
    load (value, add = 0) {
      var page = value + add
      if (!isNaN(page) && page != this.value && page >= 1 && page <= this.total) {
        this.$emit('input', page)
        this.$emit('change', page)
      }
      return page
    }
  }
}
</script>
