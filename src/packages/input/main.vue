<template>
  <div :class="['em-input',
      disabled ? 'is-disabled' : '',
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
    <div v-if="$slots.prepend" class="em-input-group__prepend">
      <slot name="prepend" />
    </div>
    <input :disabled="disabled" type="text" class="em-input__inner" :placeholder="placeholder"
        ref="input"
        v-bind="$attrs"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
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
            {{ textLength }} / {{ attrs.maxlength }}
          </span>
        </span>
      </span>
      <!-- <em-icon
        v-if="validateState && validateIcon && needStatusIcon"
        class="em-input__icon em-input__validateIcon"
      >
        <component :is="validateIcon" />
      </em-icon> -->
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import EmIcon from '@/packages/icon/main.vue'
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

  private sizes = ['medium', 'small', 'mini']

  private props = {
    hovering: !1,
    focused: !1,
    isComposing: !1
  }

  private input = this.$refs.input as HTMLInputElement

  private textarea = this.$refs.textarea as HTMLTextAreaElement

  private nativeInputValue = this.$attrs.value

  get inputSize () {
    console.log(this)
    if (!this.sizes.includes(this.size)) return ''
    else if (this.size) return `em-input--${this.size}`
  }

  get isWordLimitVisible () {
    return this.showWordLimit &&
        !!this.$attrs.maxlength &&
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

  get inputOrTextarea () {
    return this.input || this.textarea
  }

  private setNativeInputValue = () => {
    const input = this.inputOrTextarea
    if (!input || input.value === this.nativeInputValue) return
    input.value = this.nativeInputValue
  }

  @Watch('nativeInputValue')
  private nativeInputValueChange = this.setNativeInputValue()

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
    // if (value === nativeInputValue.value) return

    // this.$emit(UPDATE_MODEL_EVENT, value)
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
    this.$emit('focus', event)
  }

  private handleBlur = (event: FocusEvent) => {
    this.props.focused = false
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
}
</script>

<style lang="scss" scoped>
@import "./main.scss";
</style>
