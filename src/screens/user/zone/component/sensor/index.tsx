/*
 * @Author: czy0729
 * @Date: 2026-03-14 16:48:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:53:33
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { IconSensor } from '@_'
import { systemStore } from '@stores'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { WithViewStyles } from '@types'

function Sensor({ style }: WithViewStyles) {
  r(COMPONENT)

  return (
    <View style={style}>
      <IconSensor
        enabled={systemStore.setting.zoneSensor}
        onPress={() => {
          systemStore.switchSetting('zoneSensor')
          feedback(true)
        }}
      />
    </View>
  )
}

export default observer(Sensor)
