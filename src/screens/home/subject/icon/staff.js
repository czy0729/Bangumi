/*
 * @Author: czy0729
 * @Date: 2021-01-17 01:25:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:26:51
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function IconStaff(props, { $, navigation }) {
  const { showStaff } = systemStore.setting
  if (!showStaff) return null
  return (
    <Touchable
      onPress={() => {
        t('条目.跳转', {
          to: 'Persons',
          from: '制作人员',
          subjectId: $.subjectId
        })

        navigation.push('Persons', {
          subjectId: $.subjectId,
          name: $.cn
        })
      }}
    >
      <Flex>
        <Text type='sub'>更多</Text>
        <Iconfont name='right' size={16} />
      </Flex>
    </Touchable>
  )
}

export default obc(IconStaff)
