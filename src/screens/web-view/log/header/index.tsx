/*
 * @Author: czy0729
 * @Date: 2025-02-20 04:46:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-23 04:46:50
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  const { show } = $.state
  return (
    <HeaderV2
      title={`错误上报分析 (${$.state.data.list.length})`}
      headerRight={() => (
        <>
          <IconTouchable
            style={_.mr.xs}
            name='md-insert-chart-outlined'
            size={18}
            color={_.colorDesc}
            onPress={$.getStatsQueue}
          />
          <IconTouchable
            style={_.mr.xs}
            name={show ? 'md-close' : 'md-notes'}
            size={20}
            color={_.colorDesc}
            onPress={$.onToggleForm}
          />
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
