/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-16 20:01:26
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function IconCharacter(props, { $, navigation }) {
  const { showCharacter } = systemStore.setting
  if (!showCharacter) return null
  return (
    <Touchable
      onPress={() => {
        t('条目.跳转', {
          to: 'Characters',
          from: '角色',
          subjectId: $.subjectId
        })

        navigation.push('Characters', {
          subjectId: $.subjectId,
          name: $.cn
        })
      }}
    >
      <Flex>
        <Text type='sub'>更多</Text>
        <Iconfont name='right' size={16} />
      </Flex>
    </Touchable>
  )
}

export default obc(IconCharacter)
