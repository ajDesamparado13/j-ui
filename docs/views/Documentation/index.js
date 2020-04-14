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

const prefix = 'docs:'
export default [
  {
    path: '/docs',
    component: layout,
    children: [
      {
        path: '',
        redirect: { name: prefix + 'start' }
      },
      /*
      * INSTALLATION
      */
      {
        path: '/start',
        component: Start,
        name: prefix + 'start'
      },
      {
        path: '/installation',
        component: Installation,
        name: prefix + 'installation'
      },
      {
        path: '/customization',
        component: Customization,
        name: prefix + 'customization'
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
        name: prefix + 'button'
      },
      {
        path: '/pagination',
        component: Pagination,
        name: prefix + 'pagination'
      },
      {
        path: '/table',
        component: Table,
        name: prefix + 'table'
      },

      /*
      * Form Controls
      */
      {
        path: '/autocomplete',
        component: Autocomplete,
        name: prefix + 'autocomplete'
      },
      {
        path: '/checkbox',
        component: Checkbox,
        name: prefix + 'checkbox'
      },
      {
        path: '/textarea',
        component: Textarea,
        name: prefix + 'textarea'
      },
      {
        path: '/select',
        component: Select,
        name: prefix + 'select'
      },
      {
        path: '/date-picker',
        component: Datepicker,
        name: prefix + 'date-picker'
      },
      {
        path: '/file-upload',
        component: Fileupload,
        name: prefix + 'file-upload'
      },
      {
        path: '/textbox',
        component: Textbox,
        name: prefix + 'textbox'
      }
    ]
  }
]
