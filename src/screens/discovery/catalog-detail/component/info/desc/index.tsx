/*
 * @Author: czy0729
 * @Date: 2024-08-10 13:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-28 16:05:33
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { simpleTime } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'

function Desc() {
  const { $, navigation } = useStore<Ctx>()
  const { avatar, nickname, userId, time } = $.detail
  if (!(nickname || time)) return null

  const lastUpdate = $.params._lastUpdate || ''
  return (
    <Flex style={_.mt.sm}>
      <Text
        size={13}
        lineHeight={15}
        bold
        onPress={() => {
          navigation.push('Zone', {
            userId,
            _id: userId,
            _name: nickname,
            _image: avatar
          })

          t('目录详情.跳转', {
            to: 'Zone',
            catalogId: $.catalogId,
            userId
          })
        }}
      >
        {nickname}
      </Text>
      <Text type='sub' size={13} lineHeight={15} bold>
        {nickname ? ` · ` : ''}
        {simpleTime(String(time).replace(/\n/g, ''))}
        {!!lastUpdate && ` · 最后更新 ${simpleTime(lastUpdate)}`}
      </Text>
    </Flex>
  )
}

export default ob(Desc, COMPONENT)
