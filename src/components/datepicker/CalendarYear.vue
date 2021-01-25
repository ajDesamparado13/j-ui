<template>
<div class="calendar-year">
    <ul class="options">
      <li v-for="( opt,index ) in options" class="option" :key="index"
      :class="{'is-current':isCurrent(opt.value), 'is-selected':isSelected(opt.value)}"
      @click="select(opt.value)"
      >{{opt.label}}</li>
    </ul>
</div>
</template>

<script>
import Arr from 'freedom-js-support/src/utilities/arr'
export default {
  model:{
      prop:'value',
      event:'update',
  },
  props:{
    minDate: { type:Date, default:()=>{return new Date(1990,1,1)} },
    max: { type:Date, default:()=>{return new Date()} },
    lang:{ type:Object, required:true },
    value:{
      type:Date,
      required:true,
    },
  },
  computed:{
    maxYear(){
        return this.maxDate ? this.maxDate.getFullYear() : new Date().getFullYear()
    },
    minYear(){
        return this.minDate ? this.minDate.getFullYear() : 1900
    },
    month(){
      return this.value.getMonth();
    },
    year(){
      return this.value.getFullYear();
    },
    date(){
      return this.value.getDate();
    },
    options() {
      return Array.from({length:(this.maxYear - this.minYear + 1)}, (value,key) => {
        let year = key + this.minYear;
        return { value: year, label: year}
      });
    },
  },
  methods:{
    isSelected(year){
      return this.year === year
    },
    isCurrent(year){
      var current = new Date().getFullYear()
      return this.year === current &&  year === current
    },
    update(year=this.year,month=this.month,date=this.date){
      this.$emit('update',new Date(year,month,date));
      this.$nextTick(()=>{
         this.$emit('select',{
           event:'select',
           data:{value:this.value},
         })
      })
    },
    select(year){
      this.update(year,this.month,this.date);
    },
    next(){
      if( this.year < this.maxYear ){
        this.update(this.year+1)
      }
    },
    previous(){
      if( this.year > this.minYear ){
        this.update(this.year-1)
      }
    },
    initialize(){
      var focus = this.$el.querySelector('.is-selected');
      if(!focus){
        focus = this.$el.querySelector('.is-current')
      }
      var ref = this.$el
      if(ref && focus){
        setTimeout(()=>{
          ref.scrollTop = focus.offsetTop - ( Math.floor( ( ref.clientHeight/2 ) / 100  ) * 100 )
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.calendar-year{
  overflow-y:scroll;

}
</style>


