/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-13 00:10:42
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
    onCancel: Function.prototype
  }

  state = {
    value: '',
    focus: false
  }

  ref

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

  renderToolBar() {
    const { focus } = this.state
    if (!focus) {
      return null
    }

    return (
      <Flex style={styles.toolBar}>
        <Touchable
          style={styles.toolBarBtn}
          onPress={() => this.addSymbolText('b')}
        >
          <Text type='sub'>加粗</Text>
        </Touchable>
        <Touchable
          style={styles.toolBarBtn}
          onPress={() => this.addSymbolText('i')}
        >
          <Text type='sub'>斜体</Text>
        </Touchable>
        <Touchable
          style={styles.toolBarBtn}
          onPress={() => this.addSymbolText('u')}
        >
          <Text type='sub'>下划线</Text>
        </Touchable>
        <Touchable
          style={styles.toolBarBtn}
          onPress={() => this.addSymbolText('s')}
        >
          <Text type='sub'>删除线</Text>
        </Touchable>
        <Touchable
          style={styles.toolBarBtn}
          onPress={() => this.addSymbolText('mask')}
        >
          <Text type='sub'>防剧透</Text>
        </Touchable>
      </Flex>
    )
  }

  renderTextarea() {
    const { value, focus } = this.state
    return (
      <Flex align='start'>
        <Flex.Item>
          <TextareaItem
            ref={ref => (this.ref = ref)}
            style={styles.textarea}
            value={value}
            placeholder='不吐槽一下吗'
            rows={focus ? 4 : 1}
            selectionColor={_.colorMain}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        </Flex.Item>
        <Touchable style={styles.send}>
          <Iconfont name='navigation' />
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
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorPlain,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: _.colorBorder
  },
  toolBar: {
    marginBottom: _.sm
  },
  toolBarBtn: {
    padding: _.sm,
    marginRight: _.sm
  },
  textarea: {
    borderWidth: 0
  },
  send: {
    padding: _.sm
  }
})
