import Home from './Home'
import layout from '@/components/layout/column_1'

import Docs from './Documentation'

export default [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        redirect: { name: 'home' }
      },
      {
        path: '/home',
        component: Home,
        name: 'home'
      }

    ]
  },
  ...Docs
]
