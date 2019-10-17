import layout from '@/components/layout/column_1_sidebar'
import Start from './Start'
import Installation from './Installation'
import Customization from './Customization'

import Autocomplete from './Autocomplete'
import Button from './Button'
import Checkbox from './Checkbox'
import Textbox from './Textbox'
import Textarea from './Textarea'
import Select from './Select'
import Fileupload from './Fileupload'
import Datepicker from './Datepicker'
import Pagination from './Pagination'
import Table from './Table'

export default [
  {
    path: '/docs',
    component: layout,
    children: [
      {
        path: '',
        redirect: { name: 'start' }
      },
      /*
      * INSTALLATION
      */
      {
        path: '/start',
        component: Start,
        name: 'start'
      },
      {
        path: '/installation',
        component: Installation,
        name: 'installation'
      },
      {
        path: '/customization',
        component: Customization,
        name: 'customization'
      },
      /*
      * Layout and elements
      */
      /*
      * UI COMPONENTS
      */
      {
        path: '/button',
        component: Button,
        name: 'button'
      },
      {
        path: '/pagination',
        component: Pagination,
        name: 'pagination'
      },
      {
        path: '/table',
        component: Table,
        name: 'table'
      },

      /*
      * Form Controls
      */
      {
        path: '/autocomplete',
        component: Autocomplete,
        name: 'autocomplete'
      },
      {
        path: '/checkbox',
        component: Checkbox,
        name: 'checkbox'
      },
      {
        path: '/textarea',
        component: Textarea,
        name: 'textarea'
      },
      {
        path: '/select',
        component: Select,
        name: 'select'
      },
      {
        path: '/date-picker',
        component: Datepicker,
        name: 'date-picker'
      },
      {
        path: '/file-upload',
        component: Fileupload,
        name: 'file-upload'
      },
      {
        path: '/textbox',
        component: Textbox,
        name: 'textbox'
      }
    ]
  }
]
