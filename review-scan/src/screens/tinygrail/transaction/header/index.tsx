/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:19:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 17:20:42
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  const { show } = $.state
  return (
    <HeaderV2
      title='圣杯广场'
      hm={HM}
      headerRight={() => (
        <IconTouchable
          style={_.mr.xs}
          name={show ? 'md-close' : 'md-edit'}
          size={show ? 22 : 16}
          color={_.colorTitle}
          onPress={$.onToggleShow}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
