/*
 * @Author: czy0729
 * @Date: 2021-01-16 20:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:03:56
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import styles from './styles'

function IconCharacter(props, { $, navigation }: Ctx) {
  if (!systemStore.setting.showCharacter) return null

  return (
    <Touchable
      style={styles.touch}
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
        <Iconfont name='md-navigate-next' />
      </Flex>
    </Touchable>
  )
}

export default obc(IconCharacter)
