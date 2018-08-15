import HelloWorld from './components/HelloWorld.vue'

const components = [
  HelloWorld
]

export function install (Vue) {
  if (install.installed) return
  install.installed = true
  components.map(component => Vue.component(component.name, component))
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin
