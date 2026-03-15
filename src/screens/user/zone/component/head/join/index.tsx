/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-15 06:51:01
 */
import React from 'react'
import { Text } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Join({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <Text style={style} type='__plain__' size={11} bold shadow noWrap>
      {$.users.join || '- 加入'}
    </Text>
  ))
}

export default Join
