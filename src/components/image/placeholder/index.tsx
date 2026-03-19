/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:18:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 19:05:45
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'

import type { WithViewStyles } from '@types'

function Placeholder({ style }: WithViewStyles) {
  return <View style={style} />
}

export default observer(Placeholder)
