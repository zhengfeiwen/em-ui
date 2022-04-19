<template>
  <div v-show="type !== 'hidden'"
      :class="[
      type === 'textarea' ? 'em-textarea' : 'em-input',
      disabled ? 'is-disabled' : '',
      inputExceed ? 'is-exceed' : '',
      inputSize,
      ($slots.prepend || $slots.append) ? 'em-input--group' : '',
      $slots.append ? 'em-input-group--append' : '',
      $slots.prepend ? 'em-input-group--prepend' : '',
      ($slots.prefix || prefixIcon || prefixSvg) ? 'em-input--prefix' : '',
      ($slots.suffix || suffixIcon || suffixSvg || clearable || showPassword) ? 'em-input--suffix' : '',
      (showClear && showPwdVisible) ? 'em-input--suffix--password-clear' : '',
      $attrs.class
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="em-input-group__prepend">
        <slot name="prepend" />
      </div>
      <input
        class="em-input__inner"
        :disabled="disabled"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :placeholder="placeholder"
        ref="input"
        v-bind="$attrs"
        :tabindex="tabindex"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :style="props.iStyle"
        @keydown="handleKeydown"
      >
      <!-- prefix slot -->
      <span v-if="$slots.prefix || prefixIcon || prefixSvg" class="em-input__prefix">
        <span class="em-input__prefix-inner">
          <slot name="prefix"></slot>
          <em-icon v-if="prefixIcon" class="em-input__icon" :fa="prefixIcon"></em-icon>
          <em-icon v-if="prefixSvg" class="em-input__icon" :svg="prefixSvg"></em-icon>
        </span>
      </span>
      <!-- suffix slot -->
      <span v-if="suffixVisible" class="em-input__suffix">
        <span class="em-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <em-icon v-if="suffixIcon" class="em-input__icon" :fa="suffixIcon"></em-icon>
            <em-icon v-if="suffixSvg" class="em-input__icon" :svg="suffixSvg"></em-icon>
          </template>
          <em-icon
            v-if="showClear"
            class="em-input__icon em-input__clear"
            fa="fa-times-circle-o"
            @mousedown.prevent
            @click.native="clear"
          >
          </em-icon>
          <em-icon
            v-if="showPwdVisible"
            class="em-input__icon em-input__clear"
            @click="handlePasswordVisible"
          >
            <icon-view />
          </em-icon>
          <span v-if="isWordLimitVisible" class="em-input__count">
            <span class="em-input__count-inner">
              {{ textLength }} / {{ maxlength }}
            </span>
          </span>
        </span>
      </span>
    </template>
    <template v-else>
      <textarea
        ref="textarea"
        class="em-textarea__inner"
        v-bind="$attrs"
        :style="props._textareaCalcStyle"
        :tabindex="tabindex"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />
      <span v-if="isWordLimitVisible" class="em-input__count">
        {{ textLength }} / {{ maxlength }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import EmIcon from '@/packages/icon/main.vue'
import { calcTextareaHeight } from './calc-textarea-height'
import { UPDATE_MODEL_EVENT } from '@/constants/event'
@Component({
  name: 'em-input',
  components: {
    'em-icon': EmIcon
  }
})
export default class EmInput extends Vue {
  @Prop({ type: String, default: 'text' })
  private type!: String

  @Prop({ type: String, default: '请输入内容' })
  private placeholder!: string

  @Prop({ type: Boolean, default: !1 })
  private disabled!: boolean

  @Prop({ type: [String, Object] })
  private autosize!: String|{}

  @Prop({ type: Boolean, default: !1 })
  private clearable!: boolean

  @Prop({ type: Boolean, default: !1 })
  private readonly!: boolean

  @Prop({ type: Boolean, default: !1 })
  private showPassword!: boolean

  @Prop({ type: Boolean, default: !1 })
  private showWordLimit!: boolean

  @Prop({ type: String, default: '' })
  private size!: string

  @Prop({ type: String })
  private prefixIcon!: string

  @Prop({ type: String })
  private prefixSvg!: string

  @Prop({ type: String })
  private suffixIcon!: string

  @Prop({ type: String })
  private suffixSvg!: string

  @Prop({ type: [String, Number] })
  private tabindex!: string|number

  @Prop({ type: [String, Number] })
  private maxlength!: string|number

  @Prop({ type: String, default: 'off' })
  private autocomplete!: string

  private sizes = ['medium', 'small', 'mini']

  private props = {
    hovering: !1,
    focused: !1,
    isComposing: !1,
    iStyle: {} as any,
    _textareaCalcStyle: {} as any
  }

  get inputExceed () {
    return !!this.isWordLimitVisible && this.textLength > Number(this.maxlength)
  }

  get nativeInputValue () {
    if (this.$attrs.value === null || this.$attrs.value === undefined) return ''
    return String(this.$attrs.value)
  }

  get inputSize () {
    if (!this.sizes.includes(this.size)) return ''
    else if (this.size) return `em-input--${this.size}`
  }

  get textLength () {
    return this.nativeInputValue.length
  }

  get isWordLimitVisible () {
    return this.showWordLimit &&
        !!this.maxlength &&
        (this.type === 'text' || this.type === 'textarea') &&
        !this.disabled &&
        !this.readonly &&
        !this.showPassword
  }

  get suffixVisible () {
    return !!this.$slots.suffix ||
      !!this.suffixIcon ||
      !!this.suffixSvg ||
      this.showClear ||
      this.showPassword ||
      this.isWordLimitVisible
      // (!!this.validateState && this.needStatusIcon))
  }

  get showClear () {
    return this.clearable &&
        !this.disabled &&
        !this.readonly &&
        !!this.nativeInputValue &&
        (this.props.focused || this.props.hovering)
  }

  get showPwdVisible () {
    return this.showPassword &&
        !this.disabled &&
        !this.readonly &&
        (!!this.nativeInputValue || this.props.focused)
  }

  private setNativeInputValue () {
    const input = this.$refs.input as HTMLInputElement || this.$refs.textarea as HTMLTextAreaElement
    if (!input || input.value === this.nativeInputValue) return
    input.value = this.nativeInputValue
  }

  private resizeTextarea () {
    const { type, autosize } = this as any
    if (type !== 'textarea') return

    if (autosize) {
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows
      this.props._textareaCalcStyle = {
        ...this.$el.style,
        ...calcTextareaHeight(this.$refs.textarea as HTMLTextAreaElement, minRows, maxRows)
      }
    } else {
      this.props._textareaCalcStyle = {
        ...this.$el.style,
        minHeight: calcTextareaHeight(this.$refs.textarea as HTMLTextAreaElement).minHeight
      }
    }
  }

  // @Watch('$attrs.value')
  // private nativeInputValueChange = this.setNativeInputValue()

  private handleclick () {
    this.disabled || this.$emit('click')
  }

  private onMouseLeave = (evt: MouseEvent) => {
    this.props.hovering = false
    this.$emit('mouseleave', evt)
  }

  private onMouseEnter = (evt: MouseEvent) => {
    this.props.hovering = true
    this.$emit('mouseenter', evt)
  }

  private handleKeydown = (evt: KeyboardEvent) => {
    this.$emit('keydown', evt)
  }

  private handleCompositionStart = (event: CompositionEvent) => {
    this.$emit('compositionstart', event)
    this.props.isComposing = true
  }

  private handleCompositionUpdate = (event: CompositionEvent) => {
    this.$emit('compositionupdate', event)
    // const text = (event.target as HTMLInputElement)?.value
    // const lastCharacter = text[text.length - 1] || ''
    // this.isComposing = !isKorean(lastCharacter)
  }

  private handleCompositionEnd = (event: CompositionEvent) => {
    this.$emit('compositionend', event)
    if (this.props.isComposing) {
      this.props.isComposing = false
      this.handleInput(event)
    }
  }

  private handleInput = (event: Event) => {
    const { value } = event.target as any

    // should not emit input during composition
    // see: https://github.com/ElemeFE/element/issues/10516
    if (this.props.isComposing) return

    // hack for https://github.com/ElemeFE/element/issues/8548
    // should remove the following line when we don't support IE
    if (value === this.nativeInputValue) return

    this.$emit(UPDATE_MODEL_EVENT, value)
    this.$emit('input', value)

    // ensure native input value is controlled
    // see: https://github.com/ElemeFE/element/issues/12850
    this.$nextTick(this.setNativeInputValue)
  }

  private handleChange = (event: Event) => {
    this.$emit('change', (event.target as any).value)
  }

  private focus = () => {
    // see: https://github.com/ElemeFE/element/issues/18573
    this.$nextTick(() => {
      // this.inputOrTextarea?.focus()
    })
  }

  private blur = () => {
    // this.inputOrTextarea?.blur()
  }

  private handleFocus = (event: FocusEvent) => {
    this.props.focused = true
    delete this.props.iStyle['padding-right']
    this.$emit('focus', event)
  }

  private handleBlur = (event: FocusEvent) => {
    this.props.focused = false
    this.props.iStyle['padding-right'] = '7px'
    this.$emit('blur', event)
    // if (this.validateEvent) {
    //   formItem?.validate?.('blur').catch((err) => debugWarn(err))
    // }
  }

  private clear () {
    this.$emit(UPDATE_MODEL_EVENT, '')
    this.$emit('change', '')
    this.$emit('clear')
    this.$emit('input', '')
  }

  mounted () {
    this.setNativeInputValue()
    // this.updateIconOffset()
    this.$nextTick(() => {
      this.resizeTextarea()
    })
  }
}
</script>

<style lang="scss" scoped>
@import "./main.scss";
</style>
