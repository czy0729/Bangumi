/*
 * @Author: czy0729
 * @Date: 2024-04-09 16:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:17:09
 */
import React from 'react'
import { View } from 'react-native'
import { autorun } from 'mobx'
import { Flex, Input, Modal, Text, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default ob(
  class RemarkModal extends React.Component<Ctx> {
    iptRef: any

    componentDidMount() {
      const { $ } = this.props
      autorun(() => {
        if ($.state.remarkModalVisible) {
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

    handleRef = (ref: any) => (this.iptRef = ref)

    render() {
      r(COMPONENT)

      const { $ } = this.props
      const { remarkModalVisible, remarkModalInput } = $.state
      return (
        <Modal
          style={this.styles.modal}
          visible={remarkModalVisible}
          title='备注'
          onClose={$.closeRemarkModal}
        >
          <View style={this.styles.container}>
            <Text size={13} bold>
              在页面中出现该用户，使用备注内容高亮覆盖
            </Text>
            <Flex style={_.mt.md} align='center'>
              <Flex.Item>
                <Input
                  ref={this.handleRef}
                  style={this.styles.ipt}
                  defaultValue={remarkModalInput}
                  placeholder='输入'
                  showClear
                  onChangeText={$.changeRemarkModal}
                  onSubmitEditing={$.submitRemarkModal}
                />
              </Flex.Item>
              <Touchable style={this.styles.btn} onPress={$.submitRemarkModal}>
                <Text size={13}>保存</Text>
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
