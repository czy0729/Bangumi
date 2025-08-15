/*
 * @Author: czy0729
 * @Date: 2021-04-06 19:39:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:01:08
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import styles from './styles'

function IconTopic() {
  const { $, navigation } = useStore<Ctx>()
  if (!systemStore.setting.showTopic) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        navigation.push('Board', {
          subjectId: $.subjectId,
          name: $.cn
        })

        t('条目.跳转', {
          to: 'Board',
          from: '帖子',
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

export default ob(IconTopic)
