/*
 * @Author: czy0729
 * @Date: 2024-09-19 20:45:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:16:59
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import styles from './styles'

function IconRelation(
  {
    title = '关联',
    list = []
  }: {
    title: string
    list: any[] | readonly any[]
  },
  { $, navigation }: Ctx
) {
  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        navigation.push('Overview', {
          subjectId: $.subjectId,
          title: `${cnjp($.cn, $.jp)}的${title}`,
          _list: JSON.stringify(list)
        })

        t('条目.跳转', {
          to: 'Overview',
          from: title,
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

export default obc(IconRelation)
