import Modal from './Modal'

export {Modal}
export default {
    newComponent(options={}){
        const ModalComponent = Vue.extend(Modal)
        return new ModalComponent(options);
    },
    open(params) {
        let content
        let parent
        if (typeof params === 'string') content = params

        const defaultParam = {
            programmatic: true,
            content

        }
        if (params.parent) {
            parent = params.parent
            delete params.parent
        }

        const propsData = Object.assign(defaultParam, params)
        var store = Vue.vuex?Vue.vuex.store():{};
        return this.newComponent({
            parent,
            el: document.createElement('div'),
            propsData,
            store,
        })
    }
}
