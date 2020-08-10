let config = {
  defaultButton: {
    component: 'ui-button',
    class: 'button'
  },
  defaultIcon: {
    component: 'ui-icon',
    iconPack: 'mdi'

  },
  defaultPagination: {
    iconComponent: 'ui-icon',
    buttonComponent: 'ui-button',
    iconLeft: 'chevron-left',
    iconRight: 'chevron-right'
  },
  defaultButtonClass: 'button',
  defaultInputClass: 'input',
  defaultLinkClass: 'link',
  defaultContainerElement: null,
  defaultDialogConfirmText: null,
  defaultDialogCancelText: null,
  defaultSnackbarDuration: 3500,
  defaultToastDuration: 2000,
  defaultTooltipType: 'is-primary',
  defaultTooltipAnimated: false,
  defaultInputAutocomplete: 'on',
  defaultDateFormatter: null,
  defaultDateParser: null,
  defaultDayNames: null,
  defaultMonthNames: null,
  defaultFirstDayOfWeek: null,
  defaultUnselectableDaysOfWeek: null,
  defaultTimeFormatter: null,
  defaultTimeParser: null,
  defaultModalScroll: null,
  defaultDatepickerMobileNative: true,
  defaultTimepickerMobileNative: true,
  defaultNoticeQueue: true
}

export default config

export const setOptions = (options) => { config = options }
