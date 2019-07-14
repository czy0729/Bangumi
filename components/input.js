/*
 * 输入框
 * @Author: czy0729
 * @Date: 2019-03-19 01:43:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 14:34:28
 */
import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import { IOS } from '@constants'
import _ from '@styles'
import Iconfont from './iconfont'
import Touchable from './touchable'

const initInputHeight = 18 // 一行的大概高度

export default class Input extends React.Component {
  static defaultProps = {
    style: undefined,
    multiline: false,
    numberOfLines: 1,
    showClear: false,
    onChange: Function.prototype
  }

  state = {
    value: this.props.value
  }

  componentWillReceiveProps({ value }) {
    this.setState({
      value
    })
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
    const { onChange } = this.props
    onChange({
      nativeEvent: {
        text: ''
      }
    })
  }

  renderClear() {
    if (IOS) {
      return null
    }

    const { value } = this.state
    if (value === '') {
      return null
    }

    return (
      <Touchable style={styles.close} onPress={this.clear}>
        <Iconfont name='close' size={12} />
      </Touchable>
    )
  }

  render() {
    const { style, multiline, numberOfLines, showClear, ...other } = this.props
    if (multiline) {
      const containerHeight = initInputHeight * numberOfLines + 18
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => this.inputRef.focus()}>
            <View
              style={[
                styles.multiContainer,
                { height: containerHeight },
                style
              ]}
            >
              <TextInput
                ref={ref => (this.inputRef = ref)}
                style={styles.multiInput}
                multiline
                textAlignVertical='top'
                numberOfLines={numberOfLines}
                underlineColorAndroid='transparent'
                autoCorrect={false}
                allowFontScaling={false}
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
      <View style={styles.container}>
        <TextInput
          ref={ref => (this.inputRef = ref)}
          style={[styles.input, style]}
          numberOfLines={numberOfLines}
          underlineColorAndroid='transparent'
          autoCorrect={false}
          clearButtonMode='while-editing'
          allowFontScaling={false}
          {...other}
          onChange={this.onChange}
        />
        {showClear && this.renderClear()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  input: {
    width: '100%',
    padding: 8,
    color: _.colorDesc,
    ..._.fontSize(14),
    backgroundColor: _.colorPlain,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  multiContainer: {
    width: '100%',
    padding: 8,
    backgroundColor: _.colorPlain,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  multiInput: {
    width: '100%',
    paddingTop: 0,
    ..._.fontSize(14)
  },
  close: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    right: 0,
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    marginTop: -(6 + _.sm)
  }
})
