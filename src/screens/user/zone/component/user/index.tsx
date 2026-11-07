/*
 * @Author: czy0729
 * @Date: 2020-10-24 23:25:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * 开发调试占位, 仅对指定账号显示
 */
import { observer } from 'mobx-react'
import { Text } from '@components'
import { userStore } from '@stores'

import type { Props } from './types'

function User({ style }: Props) {
  if (userStore.userInfo.username !== 'sukaretto') return null

  return (
    <Text style={style} type='__plain__' size={10} bold>
      -
    </Text>
  )
}

export default observer(User)
