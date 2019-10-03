import Home from './Home'

export default [
  {
    path: '/',
    redirect: { name: 'home' }

  },
  {
    path: '/home',
    component: Home,
    name: 'home'
  }
]
