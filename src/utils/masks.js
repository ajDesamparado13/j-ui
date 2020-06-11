/*
* JAVASCRIPT KEY CODE
* https://css-tricks.com/snippets/javascript/javascript-keycodes/
*/
const only = {
  date_keys (event) {
    if (this.is_special_key(event)) {
      return
    }
    var key = event.which || event.keyCode || event.charCode
    if (this.is_number_key(event) || key == 191) {
      return
    }
    event.preventDefault()
  },
  password_keys (event, options = {}) {
    var key = event.which || event.keyCode || event.charCode
    var trap = [32]
    if (trap.includes(key)) {
      return event.preventDefault()
    }
  },
  number_keys (event, options = {}) {
    let { type } = Object.assign({
      type: 'signed'
    }, options)
    var value = event.target.value
    var key = event.which || event.keyCode || event.charCode
    if (key === 189 && (value.toString().indexOf('-') >= 0 || type != 'signed')) {
      return event.preventDefault()
    }

    if (this.is_special_key(event)) {
      return
    }
    if (this.is_number_key(event) || key == 188) {
      return
    }
    event.preventDefault()
  },
  decimal_keys (event, options = {}) {
    let { type } = Object.assign({
      type: 'signed'

    }, options)
    var value = event.target.value
    var key = event.which || event.keyCode || event.charCode
    if ((key === 190 && value.toString().indexOf('.') >= 0) || (key === 189 && (value.toString().indexOf('-') >= 0 || type !== 'signed'))) {
      return event.preventDefault()
    }

    if (this.is_number_key(event) ||
         key === 188 ||
         key === 190 ||
         this.is_special_key(event)) {
      return
    }

    event.preventDefault()
  },
  /*
     * Check if event key is a numeric key
     * returns Boolean
     */
  is_number_key (event) {
    var key = event.which || event.keyCode || event.charCode
    if (key === -189 || (event.shiftKey === false && key > 47 && key < 60) || !isNaN(Number(event.key))) {
      return true
    }
    return false
  },
  /*
     * Check if event key is a special key
     * returns Boolean
     */
  is_special_key (event) {
    var allowableSpecialkey = [8, 35, 36, 37, 38, 39, 40, 46, 9, 27, 13, 110, 116, 115]
    var key = event.which || event.keyCode || event.charCode
    var isSpecial = allowableSpecialkey.includes(key)
    // if ctrl+a or alt+a is down do not prevent
    var isSpecialA = key === 65 && (event.ctrlKey === true || event.metaKey === true)
    // if meta+shift+a or alt+a is down do not prevent
    var isSpecialR = key === 82 && (event.shiftKey === true || event.metaKey === true)
    if (isSpecial || isSpecialA || isSpecialR) {
      return true
    }
    return false
  },
  is_enter_key (event) {
    var key = event.which || event.keyCode || event.charCode
    var allowableEnterKey = [13]
    if (allowableEnterKey.includes(key)) {
      return true
    }
    return false
  }
}

export default {
  creditCard: { creditCard: true },
  full_date: {
    date: true,
    delimeters: ['-'],
    datePattern: ['Y', 'm', 'd'],
    blocks: [4, 2, 2]
  },
  year_month_date: {
    date: true,
    datePattern: ['Y', 'm'],
    delimeter: '-',
    blocks: [4, 2]
  },
  integer: {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    numeralDecimalScale: 0
  },
  decimal: {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    numeralDecimalScale: 4
  },
  double: {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    numeralDecimalScale: 2
  },
  custom: {
    delimiters: ['.', '.', '-'],
    blocks: [3, 3, 3, 2],
    numericOnly: true
  },
  only
}
