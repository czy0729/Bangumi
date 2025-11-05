/*
 * @Author: czy0729
 * @Date: 2021-07-15 19:15:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:43:35
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import styles from './styles'

function IconBlog() {
  const { $, navigation } = useStore<Ctx>()
  if (!systemStore.setting.showBlog) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        navigation.push('Reviews', {
          subjectId: $.subjectId,
          name: $.cn
        })

        t('条目.跳转', {
          to: 'Reviews',
          from: '日志',
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

export default ob(IconBlog)
