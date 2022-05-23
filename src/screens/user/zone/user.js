/*
 * @Author: czy0729
 * @Date: 2020-10-24 23:25:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-23 22:18:28
 */
import React from 'react'
import { Text } from '@components'
import { userStore } from '@stores'
import { toFixed } from '@utils'
import { obc } from '@utils/decorators'
import userJson from '@assets/json/user.json'

function User({ style }, { $ }) {
  const { username } = userStore.userInfo
  if (username !== 'sukaretto') return null

  const item = userJson[$.username] || userJson[$.userId] || 0
  if (!item) {
    return (
      <Text style={style} type='__plain__' size={10} bold>
        -
      </Text>
    )
  }

  return (
    <Text style={style} type='__plain__' size={10} bold>
      {item} / {toFixed((item / userJson._sum) * 100, 2)}% (
      {toFixed((item / (userJson._sum - userJson[0])) * 100, 2)}%)
    </Text>
  )
}

export default obc(User)
