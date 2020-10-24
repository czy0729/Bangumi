/*
 * 输入框
 * @Author: czy0729
 * @Date: 2019-03-19 01:43:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-24 17:03:23
 */
import React from 'react'
import { View, TextInput, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'
import Iconfont from './iconfont'
import Touchable from './touchable'

const initInputHeight = 18 // 一行的大概高度

export default
@observer
class Input extends React.Component {
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
    if (autoFocus) {
      this.inputRef.focus()
    }
  }

  inputRef

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

  renderClear() {
    const { value } = this.state
    if (IOS || value === '') {
      return null
    }

    const { colorClear } = this.props
    return (
      <Touchable style={this.styles.close} onPress={this.clear}>
        <Iconfont name='close' size={12} color={colorClear} />
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
          <TouchableWithoutFeedback onPress={() => this.inputRef.focus()}>
            <View
              style={[
                this.styles.multiContainer,
                { height: containerHeight },
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
          style={style ? [this.styles.input, style] : this.styles.input}
          numberOfLines={numberOfLines}
          allowFontScaling={false}
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          clearButtonMode='while-editing'
          placeholderTextColor={placeholderTextColor || _.colorDisabled}
          selectionColor={_.colorMain}
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    width: '100%'
  },
  input: {
    width: '100%',
    padding: 8,
    color: _.colorDesc,
    ..._.fontSize(14),
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  multiContainer: {
    width: '100%',
    padding: 8,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  multiInput: {
    width: '100%',
    paddingTop: 0,
    color: _.colorDesc,
    ..._.fontSize(14)
  },
  close: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    right: 0,
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    marginTop: -(6 + _.sm)
  }
}))
