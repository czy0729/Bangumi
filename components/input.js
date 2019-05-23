/*
 * @Author: czy0729
 * @Date: 2019-03-19 01:43:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-23 04:28:47
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
import Touchable from './touchable'
import Iconfont from './iconfont'

const initInputHeight = 18

export default class Input extends React.Component {
  static defaultProps = {
    style: undefined,
    multiline: false,
    numberOfLines: 1,
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

  ref

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
    const { style, multiline, numberOfLines, ...other } = this.props
    if (multiline) {
      const containerHeight = initInputHeight * numberOfLines + 18
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => this.ref.focus()}>
            <View
              style={[
                styles.multiContainer,
                { height: containerHeight },
                style
              ]}
            >
              <TextInput
                ref={ref => (this.ref = ref)}
                style={styles.multiInput}
                multiline
                textAlignVertical='top'
                numberOfLines={numberOfLines}
                underlineColorAndroid='transparent'
                autoCorrect={false}
                {...other}
                onChange={this.onChange}
              />
            </View>
          </TouchableWithoutFeedback>
          {this.renderClear()}
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <TextInput
          ref={ref => (this.ref = ref)}
          style={[styles.input, style]}
          numberOfLines={numberOfLines}
          underlineColorAndroid='transparent'
          autoCorrect={false}
          clearButtonMode='while-editing'
          {...other}
          onChange={this.onChange}
        />
        {this.renderClear()}
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
