/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:18:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 19:20:25
 */
import { memo } from 'react'
import { View } from 'react-native'

import type { WithViewStyles } from '@types'

function Placeholder({ style }: WithViewStyles) {
  return <View style={style} />
}

export default memo(Placeholder)
