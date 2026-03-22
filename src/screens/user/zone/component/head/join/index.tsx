/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:40:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { useStore } from '@stores'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Join({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  return (
    <Text style={style} type='__plain__' size={11} bold shadow noWrap>
      {$.users.join || '- 加入'}
    </Text>
  )
}

export default observer(Join)
