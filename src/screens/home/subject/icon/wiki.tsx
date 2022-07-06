/*
 * @Author: czy0729
 * @Date: 2021-07-12 13:36:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:10:48
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import styles from './styles'

function IconWiki(props, { $, navigation }: Ctx) {
  const { showInfo } = systemStore.setting
  if (!showInfo) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t('条目.跳转', {
          to: 'SubjectWiki',
          from: '详情',
          subjectId: $.subjectId
        })

        navigation.push('SubjectWiki', {
          subjectId: $.subjectId,
          name: $.cn
        })
      }}
    >
      <Flex>
        <Text type='sub'>修订</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
}

export default obc(IconWiki)
