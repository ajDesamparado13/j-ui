import Block from './Block'

export {Block}
export default {
    newComponent(options={}){
        const BlockComponent = Vue.extend(Block)
        return new BlockComponent(options);
    },
    show(props = {}){
        var propsData = {
            message: props.message ? props.message : "",
            type: props.type ? props.type : "indeterminate",
            container:props.container ? props.container : null,
        }
        return this.newComponent({
            el: document.createElement('div'),
            propsData
        })
    },
}
