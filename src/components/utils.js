import utils from '../utils'

export const propSetter = (componentProps, paramProps) => {
  let propsData = {}
  for (let key in componentProps) {
    let prop = props[key]
    if (typeof paramsProps[key] === 'undefined') {
      propsData[key] = prop.default || prop
    } else {
      propsData[key] = paramProps[key]
    }
  }
  return propsData
}

export default utils
