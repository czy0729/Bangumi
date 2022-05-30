/*
 * 输入框
 * @Author: czy0729
 * @Date: 2019-03-19 01:43:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-30 06:18:46
 */
import React from 'react'
import { View, TextInput, TextInputProps, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'
import { ColorValue, Expand, ViewStyle } from '@types'
import { Iconfont } from '../iconfont'
import { Touchable } from '../touchable'
import { Flex } from '../flex'
import { memoStyles } from './styles'

type Props = Expand<
  TextInputProps & {
    /** Input 容器样式 */
    style?: ViewStyle

    /** 是否启用多行 */
    multiline?: boolean

    /** 开启多行后实际使用多少行 */
    numberOfLines?: number

    /** 是否显示清空图标 */
    showClear?: boolean

    /** 清空图标颜色 */
    colorClear?: ColorValue

    /** 是否自动聚焦 */
    autoFocus?: boolean

    /** 占位文字颜色 */
    placeholderTextColor?: ColorValue

    /** 文字改变回调（待废弃，使用 onTextChange 代替） */
    onChange?: (evt: { nativeEvent: { text: string } }) => any

    /** 文字改变回调 */
    onChangeText?: (text: string) => any
  }
>

const initInputHeight = 18 // 一行的大概高度

export const Input = observer(
  class InputComponent extends React.Component<Props> {
    static defaultProps = {
      style: undefined,
      multiline: false,
      numberOfLines: 1,
      showClear: false,
      colorClear: undefined,
      autoFocus: false,
      placeholderTextColor: undefined,
      onChange: Function.prototype,
      onChangeText: Function.prototype
    }

    state = {
      value: this.props.value
    }

    UNSAFE_componentWillReceiveProps({ value }) {
      this.setState({
        value
      })
    }

    componentDidMount() {
      const { autoFocus } = this.props
      if (autoFocus) this.onFocus()
    }

    inputRef: TextInput

    onFocus = () => {
      try {
        this.inputRef.focus()

        setTimeout(() => {
          this.inputRef.focus()
        }, 0)
      } catch (error) {}
    }

    onChange = evt => {
      const { onChange } = this.props
      const { nativeEvent } = evt
      const { text } = nativeEvent
      this.setState({
        value: text
      })
      onChange(evt)
    }

    clear = () => {
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
      // const { coverRadius } = systemStore.setting
      // return coverRadius || _.radiusXs
    }

    renderClear() {
      const { value } = this.state
      if (IOS || value === '') return null

      const { colorClear } = this.props
      return (
        <Touchable style={this.styles.close} useRN onPress={this.clear}>
          <Flex style={this.styles.icon} justify='center'>
            <Iconfont name='md-close' size={16} color={colorClear} />
          </Flex>
        </Touchable>
      )
    }

    render() {
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
      if (multiline) {
        const containerHeight = initInputHeight * numberOfLines + 18
        return (
          <View style={this.styles.container}>
            <TouchableWithoutFeedback onPress={this.onFocus}>
              <View
                style={[
                  this.styles.multiContainer,
                  {
                    height: containerHeight,
                    borderRadius: this.borderRadius
                  },
                  style
                ]}
              >
                <TextInput
                  ref={ref => (this.inputRef = ref)}
                  style={this.styles.multiInput}
                  multiline
                  textAlignVertical='top'
                  numberOfLines={numberOfLines}
                  underlineColorAndroid='transparent'
                  autoCorrect={false}
                  allowFontScaling={false}
                  placeholderTextColor={placeholderTextColor || _.colorDisabled}
                  {...other}
                  onChange={this.onChange}
                />
              </View>
            </TouchableWithoutFeedback>
            {showClear && this.renderClear()}
          </View>
        )
      }

      return (
        <View style={this.styles.container}>
          <TextInput
            ref={ref => (this.inputRef = ref)}
            style={[
              this.styles.input,
              {
                borderRadius: this.borderRadius
              },
              style
            ]}
            numberOfLines={numberOfLines}
            allowFontScaling={false}
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            clearButtonMode='while-editing'
            placeholderTextColor={placeholderTextColor || _.colorDisabled}
            selectionColor={_.colorMain}
            // @ts-ignore
            cursorColor={_.colorMain}
            {...other}
            onChange={this.onChange}
          />
          {showClear && this.renderClear()}
        </View>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
