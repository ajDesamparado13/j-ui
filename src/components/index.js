import { Checkbox } from './checkbox'
import { Dropdown, DropdownItem } from './dropdown'
import { Radio } from './radio'
import Table from './table'
import Title from './title'
// import { Tabs, TabItem } from './tabs'
// import { Tag, Taglist } from './tag'
import Autocomplete from './autocomplete'
// import Collapse from './collapse'
import Datepicker from './date-picker'
// import ImageViewer from './image-viewer'
import Dialog from './dialog'
import { FieldGroup, Field } from './field'
import Icon from './icon'
import Button from './button'
import Link from './link'
import { Textbox, Textarea, Input } from './input'
import Text from './text'
import { ProgressCircular, ProgressLinear } from './progress'
// import Message from './message'
import ModalProgrammatic, { Modal } from './modal'
import BlockProgrammatic, { Block } from './block'
import ProgressBarProgrammatic, { ProgressBar } from './progress-bar'
import NotificationProgrammatic, { Notification } from './notification'
import { Header, HeaderItem } from './header'
// import Sidebar from './sidebar'
// import Toolbar from './toolbar'
import Pagination from './pagination'
// import Panel from './panel'
import { Select, Pick } from './select'
// import Snackbar from './snackbar'
// import Switch from './switch'
// import Taginput from './taginput'
// import Timepicker from './timepicker'
// import Toast from './toast'
// import Tooltip from './tooltip'
import FileSelect from './file-select'
// import PdfViewer from './pdf-viewer'

// import config, { setOptions } from './utils/config'

const components = {
  Header,
  HeaderItem,
  Autocomplete,
  Checkbox,
  // Collapse,
  // ImageViewer,
  Datepicker,
  Dropdown,
  DropdownItem,
  Field,
  FieldGroup,
  Icon,
  Input,
  Textbox,
  Textarea,
  Button,
  Link,
  // Message,
  Modal,
  Block,
  ProgressCircular,
  ProgressLinear,
  Notification,
  Text,
  Pagination,
  // Panel,
  Radio,
  // RadioButton,
  Select,
  Pick,
  // Switch,
  // TabItem,
  Table,
  Title,
  // TableColumn,
  // Tabs,
  // Tag,
  // Taglist,
  // Taginput,
  // Timepicker,
  // Tooltip,
  FileSelect
  // Sidebar,
  // Toolbar,
  // PdfViewer,
}

components.install = (Vue, options = {}) => {
  // Options
  // setOptions(Object.assign(config, options))

  for (const componentName in components) {
    const component = components[componentName]

    if (component && componentName !== 'install') {
      Vue.component(component.name, component)
    }
  }

  Vue.prototype.$dialog = Dialog
  Vue.prototype.$modal = ModalProgrammatic
  Vue.prototype.$block = BlockProgrammatic
  Vue.prototype.$progress = ProgressBarProgrammatic
  Vue.prototype.$notification = NotificationProgrammatic
  // Vue.prototype.$snackbar = Snackbar
  // Vue.prototype.$toast = Toast
}

export default components
