/*
 * @Author: czy0729
 * @Date: 2021-01-16 19:42:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 00:16:10
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { cnjp } from '@utils/app'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import styles from './styles'

function IconCatalog(props, { $, navigation }: Ctx) {
  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t('条目.跳转', {
          to: 'SubjectCatalogs',
          from: '目录',
          subjectId: $.subjectId
        })

        navigation.push('SubjectCatalogs', {
          subjectId: $.subjectId,
          name: cnjp($.cn, $.jp)
        })
      }}
    >
      <Flex>
        <Text type='sub'>更多</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
      <Heatmap id='条目.跳转' from='目录' />
    </Touchable>
  )
}

export default obc(IconCatalog)
