import RippleInk from './Rippleink'
const Ripple = {
    RippleInk

    install(Vue){
        Vue.component(RippleInk.name,RippleInk);
    }
}

if(typeof window != 'undefined' && window.Vue){
    window.Vue.use(Ripple);
}

export default Ripple
