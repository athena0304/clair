<template lang="pug">
  div.c-checkbox-group
    c-checkbox(
      v-for="(option, index) in optionList"
      v-model="isChecked[index]"
      :key="index"
      :label="option.label"
      :disabled="option.disabled"
      @change="onItemChange($event, index)"
    )
    em.c-error-msg(v-if="!validity.valid") {{validity.msg}}
</template>

<script>
import validatable from '../../scripts/mixins/validatable'

const name = 'c-checkbox-group'
const pass = { valid: true, msg: '' }

// 最少选择X项
const minItems = function (value) {
  if (!this.minItems) return pass
  const valid = Array.isArray(value) && value.length >= this.minItems
  const msg = valid ? '' : `请至少选择${this.minItems}项`
  return { valid, msg }
}

// 最多选择X项
const maxItems = function (value) {
  if (!this.maxItems) return pass
  const valid = Array.isArray(value) && value.length <= this.maxItems
  const msg = valid ? '' : `最多可以选择${this.maxItems}项`
  return { valid, msg }
}

const props = {
  value: {
    type: Array,
    default () { return [] }
  },
  minItems: Number,
  maxItems: Number,
  options: {
    type: Array,
    required: true,
    default () { return [] }
  }
}

export default {
  name,
  model: {
    event: 'change'
  },
  props,
  mixins: [validatable],
  inject: {
    $form: { default: null }
  },
  data () {
    return {
      isChecked: []
    }
  },
  computed: {
    optionList () {
      return this.options.map(item => {
        if (typeof item === 'string') {
          return {
            value: item,
            label: item
          }
        }

        if (item && typeof item === 'object') {
          if (item.hasOwnProperty('label') && item.hasOwnProperty('value')) {
            return item
          }
        }

        throw new TypeError('Type of option prop is invalid.')
      })
    }
  },
  created () {
    Object.assign(this.rules, {
      minItems: minItems.bind(this),
      maxItems: maxItems.bind(this)
    })
    this.updateChecked()
    this.$watch('options', this.updateChecked)
    this.$watch('value', this.updateChecked)
  },
  methods: {
    updateChecked () {
      const isChecked = this.optionList.map(option => {
        return this.value.indexOf(option.value) > -1
      })
      this.isChecked = isChecked
    },

    onItemChange (checked, index) {
      const isChecked = [...this.isChecked]
      isChecked[index] = checked

      const checkedValues = this.optionList
        .filter((_, i) => isChecked[i])
        .map(option => option.value)

      this.$emit('change', checkedValues)
    }
  }
}
</script>
