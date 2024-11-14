/*
 * @Author: czy0729
 * @Date: 2021-07-12 13:36:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:02:30
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import styles from './styles'

function IconWiki() {
  const { $, navigation } = useStore<Ctx>()
  if (!systemStore.setting.showInfo) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        navigation.push('SubjectWiki', {
          subjectId: $.subjectId,
          name: $.cn
        })

        t('条目.跳转', {
          to: 'SubjectWiki',
          from: '详情',
          subjectId: $.subjectId
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

export default ob(IconWiki)
