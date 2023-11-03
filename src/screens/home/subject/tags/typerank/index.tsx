/*
 * @Author: czy0729
 * @Date: 2023-10-31 14:40:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 07:03:42
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { calc, exist } from './utils'

function Typerank({ tag }, { $ }: Ctx) {
  let text: string
  if (!exist($.subjectTypeValue, tag)) {
    text = '--'
  } else {
    text = `优于${calc($.subjectTypeValue, tag, $.subject.rank || 9999)}%`
  }

  return (
    <Text style={_.ml.xs} type='sub' size={12} lineHeight={13} bold>
      {text}
    </Text>
  )
}

export default obc(Typerank)
