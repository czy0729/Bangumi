/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:18:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:51:40
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'

import type { WithViewStyles } from '@types'

function Placeholder({ style }: WithViewStyles) {
  return useObserver(() => <View style={style} />)
}

export default Placeholder
