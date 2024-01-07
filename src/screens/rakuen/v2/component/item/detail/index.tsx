/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 23:20:45
 */
import React from 'react'
import { Text } from '@components'
import { Name } from '@_'
import { _ } from '@stores'
import { correctAgo } from '@utils'
import { ob } from '@utils/decorators'

function Detail({ time, groupCn, userName, userId }) {
  return (
    <Text style={_.mt.xs} size={11} lineHeight={13} numberOfLines={1}>
      <Text type='sub' size={11} lineHeight={13}>
        {time ? correctAgo(time) : ''}
        {groupCn && time ? ' / ' : ''}
      </Text>
      <Text type='sub' size={11} lineHeight={13}>
        {groupCn}
      </Text>
      {!!userName && (
        <Name userId={userId} showFriend type='sub' size={11} lineHeight={13} disabled>
          {' '}
          / {userName}
        </Name>
      )}
    </Text>
  )
}

export default ob(Detail)
