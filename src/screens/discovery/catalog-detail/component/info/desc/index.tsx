/*
 * @Author: czy0729
 * @Date: 2024-08-10 13:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:09:45
 */
import React from 'react'
import { Text } from '@components'
import { _, useStore } from '@stores'
import { simpleTime } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function Desc() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { avatar, nickname, userId, time, last } = $.detail
    if (!(nickname || time)) return null

    const lastUpdate = $.params._lastUpdate || last || ''

    return (
      <Text style={_.mt.sm} type='sub' size={13} lineHeight={15} bold>
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
        {nickname ? ` · ` : ''}
        {simpleTime(String(time).replace(/\n/g, ''))}
        {!!lastUpdate && ` · 最后更新 ${simpleTime(lastUpdate)}`}
      </Text>
    )
  })
}

export default Desc
