/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:44:27
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import styles from './styles'

function IconCharacter() {
  const { $, navigation } = useStore<Ctx>()
  if (!systemStore.setting.showCharacter) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        navigation.push('Characters', {
          subjectId: $.subjectId,
          name: $.cn
        })

        t('条目.跳转', {
          to: 'Characters',
          from: '角色',
          subjectId: $.subjectId
        })
      }}
    >
      <Flex>
        <Text type='sub'>更多</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
}

export default ob(IconCharacter)
