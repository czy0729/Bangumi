/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-13 23:17:09
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextareaItem } from '@ant-design/react-native'
import { Text } from '@components'
import _ from '@styles'
import Flex from './flex'
import Touchable from './touchable'
import Iconfont from './iconfont'
import KeyboardSpacer from './keyboard-spacer'

export default class FixedTextarea extends React.Component {
  static defaultProps = {
    value: '',
    onSubmit: Function.prototype // value => {}
  }

  state = {
    value: this.props.value,
    focus: false
  }

  ref

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (value !== this.state.value) {
      this.setState({
        value
      })
    }
  }

  onFocus = () => {
    this.setState({
      focus: true
    })

    setTimeout(() => {
      const ref = this.ref.textAreaRef
      ref.focus()
    }, 0)
  }

  onBlur = () => {
    this.setState({
      focus: false
    })
  }

  onChange = value => {
    this.setState({
      value
    })
  }

  // @todo 暂时没有对选择了一段文字的情况做判断
  addSymbolText = symbol => {
    const ref = this.ref.textAreaRef
    ref.focus()

    // 获取光标位置
    const selection = ref._lastNativeSelection || null
    const { value } = this.state
    let index = value.length
    if (selection) {
      index = selection.start
    }

    // 插入值
    const left = `${value.slice(0, index)}[${symbol}]`
    const right = `[/${symbol}]${value.slice(index)}`
    this.setState({
      value: `${left}${right}`
    })

    // 重新设定光标位置
    setTimeout(() => {
      ref.setNativeProps({
        selection: {
          start: left.length,
          end: left.length
        }
      })
    })
  }

  onSubmit = () => {
    const { value } = this.state
    if (value === '') {
      return
    }

    const { onSubmit } = this.props
    onSubmit(value)
    this.clear()
  }

  clear = () => {
    this.setState({
      value: '',
      focus: false
    })
  }

  renderBtn(text, symbol) {
    return (
      <Touchable
        style={styles.toolBarBtn}
        onPress={() => this.addSymbolText(symbol)}
      >
        <Text type='sub'>{text}</Text>
      </Touchable>
    )
  }

  renderToolBar() {
    const { focus } = this.state
    if (!focus) {
      return null
    }

    return (
      <Flex style={styles.toolBar}>
        {this.renderBtn('加粗', 'b')}
        {this.renderBtn('斜体', 'i')}
        {this.renderBtn('下划线', 'u')}
        {this.renderBtn('删除线', 's')}
        {this.renderBtn('防剧透', 'mask')}
      </Flex>
    )
  }

  renderTextarea() {
    const { value, focus } = this.state
    const canSend = value !== ''
    return (
      <Flex align='start'>
        <Flex.Item>
          <TextareaItem
            ref={ref => (this.ref = ref)}
            style={styles.textarea}
            value={value}
            placeholder='不吐槽一下吗'
            rows={focus ? 6 : 1}
            selectionColor={_.colorMain}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        </Flex.Item>
        <Touchable style={styles.send} onPress={this.onSubmit}>
          <Iconfont
            name='navigation'
            color={canSend ? _.colorMain : _.colorIcon}
          />
        </Touchable>
      </Flex>
    )
  }

  render() {
    const { focus } = this.state
    return (
      <>
        {focus && (
          <Touchable
            style={styles.mask}
            withoutFeedback
            onPress={this.onBlur}
          />
        )}
        <View style={styles.container}>
          {this.renderToolBar()}
          {this.renderTextarea()}
          <KeyboardSpacer />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorMask
  },
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    paddingHorizontal: _.wind,
    marginBottom: -4,
    backgroundColor: _.colorPlain,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: _.colorBorder
  },
  toolBar: {
    paddingVertical: _.sm,
    marginLeft: -_.sm
  },
  toolBarBtn: {
    padding: _.sm,
    marginRight: _.sm
  },
  textarea: {
    paddingVertical: _.sm,
    paddingHorizontal: 0,
    ..._.fontSize(14)
  },
  send: {
    padding: _.sm,
    marginTop: 3
  }
})
