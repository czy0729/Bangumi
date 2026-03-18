/*
 * @Author: czy0729
 * @Date: 2023-10-31 14:40:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:37:05
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _, useStore } from '@stores'
import { calc, exist } from '../utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function Typerank({ tag }: { tag: string }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  let text: string
  let percent: number

  if (!exist($.subjectTypeValue, tag)) {
    text = '--'
  } else {
    percent = calc($.subjectTypeValue, tag, $.rank || 9999)
    text = `优于${percent}%`
  }

  return (
    <Text style={_.ml.xs} type={percent >= 90 ? 'main' : 'sub'} size={12} lineHeight={13} bold>
      {text}
    </Text>
  )
}

export default observer(Typerank)
