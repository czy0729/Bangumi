/*
 * @Author: czy0729
 * @Date: 2026-06-21 02:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 02:47:01
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'

import type { Props } from './types'

/** 正文段落 */
function Paragraph({ style, children }: Props) {
  return (
    <Text style={stl(_.mt.sm, style)} size={13} lineHeight={18}>
      {children}
    </Text>
  )
}

export default observer(Paragraph)
