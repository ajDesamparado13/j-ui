<template>
    <div class="ui-pager">
        <span class="ui-pager-label"><b>表示数:</b></span>
        <div class="ui-select-wrapper">
            <ui-select
                :defaultFirst="true"
                name="pager-options" :options="pagerOptions"
                placeholder="10" v-model="per_page" @change="selected"
                ></ui-select>
        </div>
        <span>{{ model.info }}</span>
        <div class="buttons">
            <ui-icon-button
                icon="keyboard_arrow_left"
                type="flat"
                @click="prevPage"
                :disabled="model.current_page == 1"
                ></ui-icon-button>
            <div class="ui-goto-wrapper">
                <ui-select
                    :hasSearch="true"
                    :defaultValue="pageSelection[0]"
                    name="pager-options" :options="pageSelection"
                    :value="model.current_page.toString()" @input="goto($event)"
                    ></ui-select>
            </div>
            <ui-icon-button
                icon="keyboard_arrow_right"
                type="flat"
                @click="nextPage"
                :disabled="model.disableNextPage"
                ></ui-icon-button>
        </div>
    </div>
</template>
<script>
export default{
    name:'ui-pager',
    props:{
        value:{
            type:[String,Number],
            required:true
        },
        model:{
            type:Object,
            default:()=>{
                return {
                    info: '',
                    current_page:1,
                    per_page:10,
                    disableNextPage: true
                }
            }
        },
        pagerOptions: {
            type: Array,
            default: function() {
                return [ '25','50','100','250' ]
            }
        }
    },
    computed:{
        pageSelection(){
            var selections = [];
            var total_pages = this.model.data.total_pages;
            for(var i =1 ; i <= total_pages;i++){
                selections.push(i.toString())
            }
            return selections;

        },
    },
    data(){
        return{
            eventPrefix:'uipager:',
            per_page: 10,
        }
    },
    methods:{
        goto(page){
            page=Number(page);
            this.model.current_page = page;
            this.load();
        },
        load(){
            this.$emit(this.eventPrefix+"load");
        },
        nextPage() {
            if(this.model.data.total_pages > this.model.current_page) {
                this.model.current_page ++
                this.load()
            }
        },
        prevPage() {
            if(this.model.current_page != 1) {
                this.model.current_page --
                this.load()
            }
        },
        selected(option) {
            this.$emit('input',option)
            this.per_page = option
            this.load()
        },
    },
    created(){
        this.per_page = this.value.toString();
    }
}
</script>
<style lang="scss">
.ui-pager {
    text-align: right;
    .ui-select-wrapper {
        min-width: 80px;
        max-width: 200px;
        display: inline-block;
        text-align: left;
        .ui-select {
            margin-bottom: 0px;
            .ui-select-display {
                .ui-select-value {
                    padding: 0px 10px;
                }
            }
            .ui-select-dropdown {
                min-width: 80px;
            }
        }
    }
    .buttons {
        display: inline;
        .ui-icon-button {
            display: inline-block;
        }
        .ui-goto-wrapper {
            min-width: 30px;
            max-width: 50px;
            display: inline-block;
            text-align: left;
            .ui-select {
                margin-bottom: 0px;
                .ui-select-display {
                    .ui-select-value {
                        padding: 0px 10px;
                    }
                }
                .ui-select-dropdown {
                    min-width: 40px;
                }
            }
        }
    }
}
</style>
