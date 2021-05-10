import Arr from 'freedom-js-support/src/utilities/arr'
import { Field } from '../field'
export default {
  computed: {
    FieldProps () {
      return Arr.only(this.$attrs, Object.keys(Arr.getProperty(Field, 'props', [])))
    }
  },
  components: {
    'ui-field': Field
  }
}
