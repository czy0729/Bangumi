/*
 * @Author: czy0729
 * @Date: 2023-10-31 14:40:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-26 16:32:58
 */
import React from 'react'
import { Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { calc, exist } from '../utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function Typerank({ tag }: { tag: string }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default Typerank
