<template>
  <div class="ui-pagination">
    <div class="pagination-container">
        <ui-button class="pagination-item prev-page" type="secondary" @click="prevPage" :disabled="value == 1" >
          <ui-icon icon="chevron-left" />
        </ui-button>
        <template v-for="( page,index ) in pages">
          <component
          class="pagination-item"
          :class="{
           'select-page':page != value,
           'current-page':page == value,
           'is-unselectable':getElement(page) == 'span'
          }"
          :type="page==value?'primary':'secondary'"
          color="primary"
          :disabled="page==value"
          @click="load(page)"
           :id="`pagination-item-${page}`"
           :is="getElement(page)">
           {{page}}
          </component>
        </template>
        <ui-button class="pagination-item next-page"
          type="secondary"
          @click="nextPage"
          :disabled="disableNextPage || value==total"
        >
          <ui-icon icon="chevron-right" />
        </ui-button>
    </div>
  </div>
</template>


<script>
export default {
  name: "ui-pagination",
  props: {
    /*
    * Minimum number of pages that results to ellipsis
    */
    minimumHiddenPages:{
      type:Number,
      default:2,
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
    pages(){
      var ellipsis = '...';
      var pages = this.range(this.startPage,this.endPage);
      var count = pages.length -1;
      var lowest = pages[0];
      var highest = pages[count];
      var minimum = this.minimumHiddenPages;
      var total = this.total;


      var sum = 1+minimum;
      if(sum <= lowest){
         pages.unshift( sum == lowest ? this.range(1,minimum) : ellipsis)
         pages = pages.flat();
      }


      var difference = total - minimum;
      if(difference >= highest){
        pages = pages.concat(difference == highest ? this.range(total-minimum+1,total) : ellipsis);
      }

      if(pages.indexOf(1) == -1){
        pages.unshift(1);
      }

      if(pages.indexOf(total) == -1){
        pages.push(total);
      }

      return pages;
    },
    endPage() {
      var endPage = this.startPage + this.maxPager - 1;
      return endPage >= this.total ? this.total : endPage;
    },
    startPage() {
      var { total, maxPager} = this;
      var currentPage = Number(this.value);
      var quotient = maxPager / 2;
      var highestDenom = Math.ceil(quotient);
      var lowestDenom = Math.floor(quotient);

      if (total <= maxPager || currentPage <= highestDenom) {
        return 1;
      }

      var startPage = 1;

      if (total - currentPage >= lowestDenom) {
        startPage = currentPage - highestDenom;
      } else if (total == currentPage) {
        startPage = currentPage - (maxPager - 1);
      }else{
        startPage = currentPage - highestDenom;
      }

      return startPage <= 1 ? 1 : startPage;
    }
  },
  methods: {
    getElement(page){
      return !isNaN(Number(page)) > 0 ? 'ui-button' : 'span'
    },
    range(start,end){
      return Array(end - start + 1).fill().map((_,index) =>  start+ index);
    },
    nextPage() {
      return this.load(this.value,1)
    },
    prevPage() {
      return this.load(this.value,-1)
    },
    load(value,add=0) {
      var page = value+add;
      if(!isNaN(page) && page != this.value && page >= 1 && page <= this.total){
        this.$emit("input", page);
        this.$emit("change", page);
      }
      return page;
    }
  }
};
</script>
<style lang="scss">
.ui-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    .pagination-item {
      opacity: initial;
      margin: 0.5rem;
      min-width: 1rem;
      &.prev-page,
      &.next-page {
        max-width: 30px;
      }
    }
  }
}
</style>
