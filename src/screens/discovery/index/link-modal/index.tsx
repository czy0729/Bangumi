/*
 * @Author: czy0729
 * @Date: 2021-06-11 17:29:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-28 05:15:18
 */
import React from 'react'
import { View } from 'react-native'
import { autorun } from 'mobx'
import { Modal, ActionSheet, Flex, Touchable, Text, Input, Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { memoStyles } from './styles'
import { LINKS } from './ds'

export default obc(
  class LinkModal extends React.Component {
    state = {
      show: false
    }

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

    onOpenActionSheet = () => {
      this.setState(
        {
          show: true
        },
        () => {
          try {
            if (typeof this?.iptRef?.inputRef?.blur === 'function') {
              this.iptRef.inputRef.blur()
            }
          } catch (error) {}
        }
      )
    }

    onCloseActionSheet = () => {
      this.setState(
        {
          show: false
        },
        () => {
          setTimeout(() => {
            try {
              if (typeof this?.iptRef?.inputRef?.focus === 'function') {
                this.iptRef.inputRef.focus()
              }
            } catch (error) {}
          }, 480)
        }
      )
    }

    onSelect = (text: string) => {
      const { $ } = this.context
      $.onChangeText(text)
      this.onCloseActionSheet()
    }

    renderModal() {
      const { $, navigation } = this.context
      const { visible, link } = $.state
      return (
        <Modal
          style={this.styles.modal}
          visible={visible}
          title='剪贴板'
          onClose={$.toggleLinkModal}
        >
          <View style={this.styles.container}>
            <Text size={13} bold>
              可能由于权限问题，未能在剪贴板中匹配到链接，请手动粘贴或输入
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
          <View style={this.styles.info}>
            <Touchable onPress={this.onOpenActionSheet}>
              <Text size={14} type='sub'>
                预设
              </Text>
            </Touchable>
          </View>
        </Modal>
      )
    }

    renderActionSheet() {
      const { show } = this.state
      return (
        <ActionSheet
          show={show}
          title='预设'
          height={640}
          onClose={this.onCloseActionSheet}
        >
          <View style={_.container.wind}>
            {LINKS.map(item => (
              <Touchable
                style={_.mt.md}
                key={item.key}
                onPress={() => this.onSelect(item.value)}
              >
                <Flex>
                  <Flex.Item>
                    <Text size={15} bold>
                      {item.key}
                    </Text>
                    <Text style={_.mt.xs} type='sub' size={12} bold>
                      {item.text}
                    </Text>
                  </Flex.Item>
                  <Iconfont name='md-navigate-next' />
                </Flex>
              </Touchable>
            ))}
          </View>
        </ActionSheet>
      )
    }

    render() {
      // global.rerender('Discovery.LinkModal')

      return (
        <>
          {this.renderModal()}
          {this.renderActionSheet()}
        </>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
