/*
 * @Author: czy0729
 * @Date: 2025-02-20 04:46:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 05:56:27
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
      title='错误上报分析'
      headerRight={() => (
        <IconTouchable
          style={_.mr.xs}
          name={show ? 'md-close' : 'md-refresh'}
          color={_.colorDesc}
          onPress={$.onToggleForm}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
