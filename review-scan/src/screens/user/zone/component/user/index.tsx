/*
 * @Author: czy0729
 * @Date: 2020-10-24 23:25:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:21:10
 */
import React from 'react'
import { Text } from '@components'
import { userStore, useStore } from '@stores'
import { toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

const userJson = {}

function User({ style }) {
  const { $ } = useStore<Ctx>()
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
      {/* @ts-ignore */}
      {item} / {toFixed((item / userJson._sum) * 100, 2)}% ({/* @ts-ignore */}
      {toFixed((item / (userJson._sum - userJson[0])) * 100, 2)}%)
    </Text>
  )
}

export default ob(User, COMPONENT)
