/*
 * 小圣杯图标
 * @Author: czy0729
 * @Date: 2019-09-07 15:58:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:59:22
 */
import React from 'react'
import { Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { ColorValue, EventType, Navigation, ViewStyle } from '@types'
import { IconTabsHeader } from '../tabs-header'

type Props = {
  navigation?: Navigation
  style?: ViewStyle
  color?: ColorValue
  event?: EventType
}

export const IconTinygrail = ob(
  ({ style, navigation, color, event = EVENT }: Props) => {
    const { tinygrail } = systemStore.setting
    if (tinygrail) {
      return (
        <IconTabsHeader
          style={style}
          name='trophy'
          size={19}
          color={_.colorDesc}
          onPress={() => {
            const { id, data } = event
            t(id, {
              to: 'Tinygrail',
              ...data
            })
            navigation.push('Tinygrail')
          }}
        >
          <Heatmap
            right={52}
            id='首页.跳转'
            to='Tinygrail'
            alias='小圣杯'
            transparent
          />
        </IconTabsHeader>
      )
    }

    return (
      <IconTabsHeader
        style={style}
        name='md-calendar-today'
        size={18}
        color={color}
        onPress={() => {
          const { id, data } = event
          t(id, {
            to: 'Calendar',
            ...data
          })
          navigation.push('Calendar')
        }}
      />
    )
  }
)
