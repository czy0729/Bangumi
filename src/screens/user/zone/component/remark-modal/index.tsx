/*
 * @Author: czy0729
 * @Date: 2024-04-09 16:05:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:52:40
 */
import React, { useRef } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Input, Modal, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { InputInstance } from '@components'
import type { Ctx } from '../../types'

function RemarkModal() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const iptRef = useRef<InputInstance>(null)

  const styles = memoStyles()
  const { remarkModalVisible, remarkModalInput } = $.state

  return (
    <Modal
      style={styles.modal}
      visible={remarkModalVisible}
      title='备注'
      onClose={$.closeRemarkModal}
    >
      <View style={styles.container}>
        <Text size={13} bold>
          在页面中出现该用户，使用备注内容高亮覆盖
        </Text>
        <Flex style={_.mt.md} align='center'>
          <Flex.Item>
            <Input
              ref={iptRef}
              style={styles.ipt}
              defaultValue={remarkModalInput}
              placeholder='输入'
              showClear
              autoFocus
              onChangeText={$.changeRemarkModal}
              onSubmitEditing={$.submitRemarkModal}
            />
          </Flex.Item>
          <Touchable style={styles.btn} onPress={$.submitRemarkModal}>
            <Text size={13}>保存</Text>
          </Touchable>
        </Flex>
      </View>
    </Modal>
  )
}

export default observer(RemarkModal)
