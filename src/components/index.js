import { Checkbox } from './components/checkbox'
import { Dropdown, DropdownItem } from './components/dropdown'
import { Radio } from './components/radio'
import Table from './components/table'
import Title from './components/title'
//import { Tabs, TabItem } from './components/tabs'
//import { Tag, Taglist } from './components/tag'
import Autocomplete from './components/autocomplete'
//import Collapse from './components/collapse'
import Datepicker from './components/date-picker'
//import ImageViewer from './components/image-viewer'
import Dialog from './components/dialog'
import { FieldGroup,Field } from './components/field'
import Icon from './components/icon'
import Button from './components/button'
import Link from './components/link'
import {Textbox,Textarea,Input} from './components/input'
import Text from './components/text'
import {ProgressCircular, ProgressLinear} from './components/progress'
//import Message from './components/message'
import ModalProgrammatic, { Modal } from './components/modal'
import BlockProgrammatic,{Block}  from './components/block'
import ProgressBarProgrammatic,{ProgressBar}  from './components/progress-bar'
import NotificationProgrammatic,{Notification} from './components/notification'
import {Header,HeaderItem} from './components/header'
//import Sidebar from './components/sidebar'
//import Toolbar from './components/toolbar'
import Pagination from './components/pagination'
//import Panel from './components/panel'
import {Select,Pick} from './components/select'
//import Snackbar from './components/snackbar'
//import Switch from './components/switch'
//import Taginput from './components/taginput'
//import Timepicker from './components/timepicker'
//import Toast from './components/toast'
//import Tooltip from './components/tooltip'
import FileSelect from './components/file-select'
//import PdfViewer from './components/pdf-viewer'

//import config, { setOptions } from './utils/config'

const components = {
    Header,
    HeaderItem,
    Autocomplete,
    Checkbox,
    //Collapse,
    //ImageViewer,
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
    //Message,
    Modal,
    Block,
    ProgressCircular,
    ProgressLinear,
    Notification,
    Text,
    Pagination,
    //Panel,
    Radio,
    //RadioButton,
    Select,
    Pick,
    //Switch,
    //TabItem,
    Table,
    Title,
    //TableColumn,
    //Tabs,
    //Tag,
    //Taglist,
    //Taginput,
    //Timepicker,
    //Tooltip,
    FileSelect,
    //Sidebar,
    //Toolbar,
    //PdfViewer,
}

components.install = (Vue, options = {}) => {
    // Options
    //setOptions(Object.assign(config, options))

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
    //Vue.prototype.$snackbar = Snackbar
    //Vue.prototype.$toast = Toast
}

export default components
