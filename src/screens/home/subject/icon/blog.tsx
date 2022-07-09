/*
 * @Author: czy0729
 * @Date: 2021-07-15 19:15:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 00:15:48
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import styles from './styles'

function IconBlog(props, { $, navigation }: Ctx) {
  const { showBlog } = systemStore.setting
  if (!showBlog) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t('条目.跳转', {
          to: 'Reviews',
          from: '日志',
          subjectId: $.subjectId
        })

        navigation.push('Reviews', {
          subjectId: $.subjectId,
          name: $.cn
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

export default obc(IconBlog)
