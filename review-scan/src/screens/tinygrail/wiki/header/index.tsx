/*
 * @Author: czy0729
 * @Date: 2025-05-13 15:06:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 14:40:33
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { HM } from './ds'

function Header({ onToggle }) {
  return useObserver(() => (
    <HeaderV2
      title='小圣杯游戏指南'
      hm={HM}
      headerRight={() => (
        <IconTouchable
          style={_.mr.xs}
          name='md-menu-open'
          color={_.colorTinygrailPlain}
          onPress={() => {
            onToggle(true)
          }}
        />
      )}
    />
  ))
}

export default Header
