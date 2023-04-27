/*
 * 通用输入框
 * @Doc: https://www.react-native.cn/docs/textinput
 * @Doc: https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options
 * @Author: czy0729
 * @Date: 2019-03-19 01:43:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 18:16:37
 */
import React from 'react'
import {
  Keyboard,
  View,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInput as RNTextInput
} from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { IOS } from '@constants'
import TextInput from './text-input'
import Clear from './clear'
import { memoStyles } from './styles'
import { Props as InputProps, State } from './types'

export { InputProps }

/** 一行的大概高度 */
const INPUT_LINE_HEIGHT = 18

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
      onChange: () => {},
      onChangeText: () => {},
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
      if (this.keyboardDidShowListener) this.keyboardDidShowListener.remove()
      if (this.keyboardDidHideListener) this.keyboardDidHideListener.remove()
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

      try {
        const node = evt.target || evt.currentTarget
        setTimeout(() => {
          node.measureInWindow(
            (x: number, y: number, width: number, height: number) => {
              const inputBottomPosition = y + height
              const scrollViewHeight = _.window.height
              if (inputBottomPosition > scrollViewHeight - this.keyboardHeight) {
                onScrollIntoViewIfNeeded(
                  inputBottomPosition - scrollViewHeight + this.keyboardHeight + _.md
                )
              }
            }
          )
        }, 640)
      } catch (error) {}
    }

    onChange = (evt: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      const { onChange } = this.props
      const { nativeEvent } = evt
      const { text } = nativeEvent
      this.setState({
        value: text
      })
      onChange(evt)
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

    get borderRadius() {
      return _.radiusXs
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
      const {
        inputStyle,
        numberOfLines,
        placeholderTextColor,
        onFocus,
        onScrollIntoViewIfNeeded
      } = this.props
      const props: any = {
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
      const { style, multiline, numberOfLines, showClear, colorClear } = this.props
      if (multiline) {
        const containerHeight = INPUT_LINE_HEIGHT * numberOfLines + 18
        return (
          <View style={_.container.block}>
            <TouchableWithoutFeedback onPress={this.onTouch}>
              <View
                style={stl(
                  this.styles.multiline,
                  {
                    height: containerHeight,
                    borderRadius: this.borderRadius
                  },
                  style
                )}
              >
                <TextInput multiline {...this.passProps} {...this.overrideProps} />
              </View>
            </TouchableWithoutFeedback>
            {showClear && !!this.state.value && (
              <Clear color={colorClear} onPress={this.onClear} />
            )}
          </View>
        )
      }

      return (
        <View style={_.container.block}>
          <TextInput
            style={stl(
              {
                borderRadius: this.borderRadius
              },
              style
            )}
            {...this.passProps}
            {...this.overrideProps}
            onSubmitEditing={this.onSubmitEditing}
          />
          {showClear && !!this.state.value && (
            <Clear color={colorClear} onPress={this.onClear} />
          )}
        </View>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
