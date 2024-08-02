/*
 * 小圣杯图标
 * @Author: czy0729
 * @Date: 2019-09-07 15:58:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 04:21:00
 */
import React from 'react'
import { Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { IconTabsHeader } from '../tabs-header'
import { COMPONENT } from './ds'
import { Props as IconTinygrailProps } from './types'

export { IconTinygrailProps }

export const IconTinygrail = ob(
  ({ style, navigation, color, event = EVENT }: IconTinygrailProps) => {
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
          <Heatmap right={52} id='首页.跳转' to='Tinygrail' alias='小圣杯' transparent />
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
  },
  COMPONENT
)

export default IconTinygrail
