/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 *
 * 链接输入表单
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Input, Text, Touchable } from '@components'
import { _, uiStore } from '@stores'
import { memoStyles } from './styles'

import type { Props } from './types'

function Form({ inputRef, link }: Props) {
  const styles = memoStyles()

  return (
    <View style={styles.container}>
      <Text size={13} bold>
        可能由于权限问题，未能在剪贴板中匹配到链接，请手动粘贴或输入
      </Text>
      <Flex style={_.mt.md} align='center'>
        <Flex.Item>
          <Input
            ref={inputRef}
            style={styles.ipt}
            value={link}
            placeholder='输入或粘贴 bgm.tv 的链接'
            showClear
            onChangeText={uiStore.setLinkModalText}
            onSubmitEditing={uiStore.submitLinkModal}
          />
        </Flex.Item>
        <Touchable style={_.ml.md} onPress={uiStore.submitLinkModal}>
          <Text size={13}>提交</Text>
        </Touchable>
      </Flex>
    </View>
  )
}

export default observer(Form)
