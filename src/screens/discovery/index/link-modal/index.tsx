/*
 * @Author: czy0729
 * @Date: 2021-06-11 17:29:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 07:32:01
 */
import React from 'react'
import { View } from 'react-native'
import { autorun } from 'mobx'
import { Flex, Touchable, Text, Input } from '@components'
import Modal from '@components/@/ant-design/modal'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { memoStyles } from './styles'

export default obc(
  class LinkModal extends React.Component {
    componentDidMount() {
      const { $ } = this.context
      autorun(() => {
        if ($.state.visible) {
          setTimeout(() => {
            try {
              if (typeof this?.iptRef?.inputRef?.focus === 'function') {
                this.iptRef.inputRef.focus()
              }
            } catch (error) {}
          }, 240)
        }
      })
    }

    iptRef: any

    render() {
      global.rerender('Discovery.LinkModal')

      const { $, navigation } = this.context
      const { visible, link } = $.state
      return (
        <Modal
          style={this.styles.modal}
          visible={visible}
          title={
            <Text type='title' size={16}>
              剪贴板
            </Text>
          }
          transparent
          maskClosable
          closable
          onClose={$.toggleLinkModal}
        >
          <View style={this.styles.container}>
            <Text size={12} bold>
              可能由于权限问题, 未能在剪贴板中匹配到链接, 请手动输入
            </Text>
            <Flex style={_.mt.md} align='center'>
              <Flex.Item>
                <Input
                  ref={ref => (this.iptRef = ref)}
                  style={this.styles.ipt}
                  defaultValue={link}
                  placeholder='输入或粘贴 bgm.tv 的链接'
                  showClear
                  onChangeText={$.onChangeText}
                  onSubmitEditing={() => $.onLinkSubmit(navigation)}
                />
              </Flex.Item>
              <Touchable style={_.ml.md} onPress={() => $.onLinkSubmit(navigation)}>
                <Text size={13}>提交</Text>
              </Touchable>
            </Flex>
          </View>
        </Modal>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
