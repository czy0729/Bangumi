/*
 * @Author: czy0729
 * @Date: 2019-03-19 01:43:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 17:00:50
 */
import React from 'react'
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN, IOS } from '@constants'
import { Override } from '@types'
import { Component } from '../component'
import Clear from './clear'
import TextInput from './text-input'
import { COMPONENT, INPUT_LINE_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Props as InputProps, State } from './types'

export { InputProps }

/**
 * 通用输入框
 * @doc https://www.react-native.cn/docs/textinput
 * @tutorial https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options
 */
export const Input = observer(
  class InputComponent extends React.Component<InputProps, State> {
    static defaultProps = {
      style: undefined,
      inputStyle: undefined,
      multiline: false,
      numberOfLines: 1,
      showClear: false,
      colorClear: undefined,
      autoFocus: false,
      placeholderTextColor: undefined,
      onChange: FROZEN_FN,
      onChangeText: FROZEN_FN,
      onScrollIntoViewIfNeeded: undefined
    }

    state = {
      value: this.props.value
    }

    inputRef: RNTextInput

    forwardRef = (ref: RNTextInput) => (this.inputRef = ref)

    keyboardHeight: number = 0

    keyboardDidShowListener = null

    keyboardDidHideListener = null

    componentDidMount() {
      const { autoFocus, onScrollIntoViewIfNeeded } = this.props
      if (autoFocus) {
        setTimeout(() => {
          this.onTouch()
        }, 120)
      }

      if (typeof onScrollIntoViewIfNeeded === 'function') {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', evt => {
          this.keyboardHeight = evt.endCoordinates.height || 0
        })

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          this.keyboardHeight = 0
        })
      }
    }

    componentWillUnmount() {
      try {
        if (this.keyboardDidShowListener) this.keyboardDidShowListener.remove()
        if (this.keyboardDidHideListener) this.keyboardDidHideListener.remove()
      } catch (error) {}
    }

    UNSAFE_componentWillReceiveProps({ value }) {
      this.setState({
        value
      })
    }

    onTouch = () => {
      try {
        if (typeof this?.inputRef?.focus === 'function') {
          this.inputRef.focus()
        }

        setTimeout(() => {
          if (typeof this?.inputRef?.focus === 'function') {
            this.inputRef.focus()
          }
        }, 0)
      } catch (error) {}
    }

    onBlur = () => {
      try {
        if (typeof this?.inputRef?.blur === 'function') {
          this.inputRef.blur()
        }

        setTimeout(() => {
          if (typeof this?.inputRef?.blur === 'function') {
            this.inputRef.blur()
          }
        }, 0)
      } catch (error) {}
    }

    onFocus = (evt: any) => {
      const { onFocus, onScrollIntoViewIfNeeded } = this.props
      if (typeof onFocus === 'function') onFocus(evt)

      const node = evt?.target || evt?.currentTarget
      setTimeout(() => {
        try {
          node.measureInWindow((_x: number, y: number, _width: number, height: number) => {
            const inputBottomPosition = y + height
            const scrollViewHeight = _.window.height
            if (inputBottomPosition > scrollViewHeight - this.keyboardHeight) {
              onScrollIntoViewIfNeeded(
                inputBottomPosition - scrollViewHeight + this.keyboardHeight + _.md
              )
            }
          })
        } catch (error) {}
      }, 640)
    }

    onChange = (evt: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      this.setState({
        value: evt.nativeEvent.text
      })
      this.props.onChange(evt)
    }

    onSubmitEditing = (evt: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      const { onSubmitEditing } = this.props
      if (typeof onSubmitEditing === 'function') {
        onSubmitEditing(evt)
        this.onBlur()
      }
    }

    onClear = () => {
      const { onChange, onChangeText } = this.props
      onChange({
        nativeEvent: {
          text: ''
        }
      })
      onChangeText('')
    }

    get clearButtonMode() {
      // 安卓使用了模拟按钮代替原生按钮
      if (!IOS) return 'never'

      const { showClear } = this.props
      return showClear ? 'while-editing' : 'never'
    }

    get passProps() {
      const {
        style,
        multiline,
        numberOfLines,
        showClear,
        colorClear,
        autoFocus,
        placeholderTextColor,
        ...other
      } = this.props
      return other
    }

    get overrideProps() {
      const { inputStyle, numberOfLines, placeholderTextColor, onFocus, onScrollIntoViewIfNeeded } =
        this.props
      const props: Override<
        Partial<TextInputProps>,
        {
          forwardRef: any
        }
      > = {
        forwardRef: this.forwardRef,
        numberOfLines,
        allowFontScaling: false,
        autoCapitalize: 'none',
        autoCorrect: false,
        underlineColorAndroid: 'transparent',
        clearButtonMode: this.clearButtonMode,
        placeholderTextColor: placeholderTextColor || _.colorDisabled,
        selectionColor: _.colorMain,
        cursorColor: _.colorMain,
        onChange: this.onChange,
        onFocus: typeof onScrollIntoViewIfNeeded === 'function' ? this.onFocus : onFocus
      }
      if (inputStyle) props.style = inputStyle
      return props
    }

    render() {
      r(COMPONENT)

      const { style, multiline, numberOfLines, showClear, colorClear, editable } = this.props
      if (multiline) {
        const containerHeight = INPUT_LINE_HEIGHT * numberOfLines + 18
        return (
          <Component id='component-input' data-editable={editable} style={_.container.block}>
            <TouchableWithoutFeedback onPress={this.onTouch}>
              <View
                style={stl(
                  this.styles.multiline,
                  {
                    height: containerHeight,
                    borderRadius: _.radiusXs
                  },
                  style
                )}
              >
                <TextInput multiline {...this.passProps} {...this.overrideProps} />
              </View>
            </TouchableWithoutFeedback>
            {showClear && !!this.state.value && <Clear color={colorClear} onPress={this.onClear} />}
          </Component>
        )
      }

      return (
        <Component id='component-input' data-editable={editable} style={_.container.block}>
          <TextInput
            style={stl(
              {
                fontFamily: _.fontBoldFamily,
                borderRadius: _.radiusXs
              },
              style
            )}
            {...this.passProps}
            {...this.overrideProps}
            onSubmitEditing={this.onSubmitEditing}
          />
          {showClear && !!this.state.value && <Clear color={colorClear} onPress={this.onClear} />}
        </Component>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)

export default Input
