/*
 * @Author: czy0729
 * @Date: 2022-10-21 13:06:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 13:20:39
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import styles from './styles'

function IconPreview({ data, headers }, { $, navigation }: Ctx) {
  if (!systemStore.setting.showThumbs) return null

  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t('条目.跳转', {
          to: 'Preview',
          from: '预览',
          subjectId: $.subjectId
        })

        navigation.push('Preview', {
          subjectId: $.subjectId,
          cn: $.cn,
          jp: $.jp,
          data,
          headers
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

export default obc(IconPreview)
