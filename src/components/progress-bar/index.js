import ProgressBar from './ProgressBar'

export {ProgressBar}

export default {
    show(message="",type="indeterminate"){
        const propsData = {message,type}
        const ProgressBarComponent = Vue.extend(ProgressBar)
        return new ProgressBarComponent({
            el: document.createElement('div'),
            propsData
        })
    },
}
