
/*
* AUTO ADD ALL COMPONENTS THRU index.js
*/
const components = {}

 ;(function getComponents () {
  const mods = require.context('', true, /index\.js$/)
  mods.keys().forEach(fileName => {
    if (fileName === './index.js') {
      return
    }
    const moduleDefinition = mods(fileName)
    const directory = fileName.replace('./', '').split('/')[0]
    const name = directory[0].toUpperCase() + directory.substr(1)
    components[name] = moduleDefinition.default
  })
})()

export default components
