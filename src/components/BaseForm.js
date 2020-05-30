export default {
  props: {
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    labelPosition: { type: String, default: 'top' /* top, left, right */ },
    placeholder: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    iconPosition: { type: String, default: 'left' /* left, right */ },
    required: { type: Boolean, default: false },
    requiredText: { type: String, default: 'required' },
    extraText: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    help: { type: String, default: '' },
    error: { type: String, default: '' },
    hasMessage: { type: Boolean, default: false },
    isHorizontal: { type: Boolean, default: false }
  },
  computed: {
    field_props () {
      return {
        isHorizontal: this.isHorizontal,
        name: this.name,
        label: this.label,
        labelPosition: this.labelPosition,
        required: this.required,
        requiredText: this.requiredText,
        hasMessage: this.hasMessage,
        message: this.message,
        extraText: this.extraText,
        disabled: this.disabled,
        loading: this.loading,
        invalid: this.invalid
      }
    },
    message () {
      return this.invalid ? this.error : this.help
    }
  },
  directives: {
    autofocus: {
      inserted (el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  }
}
