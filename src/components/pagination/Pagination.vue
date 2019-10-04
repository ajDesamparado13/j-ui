<template>
    <div class="ui-pagination">
        <div class="pagination">
            <div class="ui-pagination-item prev-page">
                <ui-button
                    type="secondary"
                    @click="prevPage"
                    :disabled="value == 1"
                    :size="size"
                    >
                    <ui-icon icon="chevron-left"/>
                </ui-button>
            </div>
            <div class="ui-pagination-item start-page" v-if="startPage != 1">
                <ui-button type="secondary" color="primary" :size="size" @click="load(1)">1</ui-button>
                <span class="is-unselectable"> ...  </span>
            </div>
            <div class="ui-pagination-item" v-for="page in total" v-if="page >= startPage && page <= endPage">
                <ui-button class="select-page" v-if="page != value"
                    color="primary" type="secondary" :size="size" @click="load(page)">{{page}}</ui-button>
                <ui-button class="current-page" v-if="page == value" type="primary" color="primary" :size="size" :disabled="true">{{page}}</ui-button>
            </div>
            <div class="ui-pagination-item end-page"  v-if="endPage < total">
                <span class="is-unselectable"> ...  </span>
                <ui-button type="secondary" color="primary" :size="size" @click="load(total)">{{total}}</ui-button>
            </div>
            <div class="ui-pagination-item next-page">
                <ui-button
                    type="secondary"
                    @click="nextPage"
                    :disabled="disableNextPage || value==total"
                    :size="size"
                    ><ui-icon icon="chevron-right"/></ui-button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:'ui-pagination',
    props:{
        size:{
            type:String,
            default:'small',
        },
        maxPager:{
            type:Number,
            default:5,
        },
        value:{
            type:[String,Number],
            required:true,
        },
        total:{
            type:Number,
            default:1,
        },
        disableNextPage:{
            type:Boolean,
            default:false,
        }
    },
    computed:{
        endPage(){
            var endPage = this.startPage + this.maxPager-1;

            if(endPage >= this.total){
                endPage = this.total;
            }

            return endPage;
        },
        startPage(){
            var total = this.total;
            var maxPager = this.maxPager;
            var currentPage = Number(this.value);

            var quotient = this.maxPager/2;
            var lowestDenom = Math.floor(quotient);
            var highestDenom = Math.ceil(quotient);

            if(total <= maxPager || currentPage <= highestDenom){
                return 1;
            }

            if(total - currentPage >= lowestDenom ){
                return currentPage-lowestDenom;
            }

            if(total == currentPage){
                return  currentPage - ( maxPager-1 );
            }

            var startPage = currentPage-highestDenom;

            if(startPage < 1){
                startPage = 1;
            }

            return startPage;
        },
    },
    methods:{
        nextPage() {
            var page = Number(this.value);
            if(this.total > page) {
                this.load(page+1)
            }
        },
        prevPage() {
            var page = Number(this.value);
            if(page != 1) {
                this.load(page-1)
            }
        },
        load(page){
            this.$emit('input',page);
            this.$emit('change',page);
        },
    },
}
</script>

<style lang="scss">
.ui-pagination {
    display:flex;
    width:100%;
    justify-content:center;

    .pagination{
        .prev-page,.next-page{
            @media only screen and (max-width:$bp-hands-wide){
                max-width:rem-calc(30px);
            }
        }
        display:flex;
        @media only screen and (max-width:$bp-hands-wide){
            flex-wrap:nowrap;
        }
        align-items:center;
        .ui-button{
            min-width:1rem;
            border:none;
        }
        .button{
            opacity:initial
        }
        .end-page,.start-page{
            display:flex;
            align-items:center;
            span:first-child{ margin-right:rem-calc(10px); }
            span:last-child{ margin-left:rem-calc(10px); }
        }
        .ui-pagination-item{
            &:not(:last-child){
                margin-right:rem-calc(3px);
            }
        }
    }
}

</style>
