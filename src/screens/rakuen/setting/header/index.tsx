/*
 * @Author: czy0729
 * @Date: 2024-02-01 18:24:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-01 18:33:48
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  return useObserver(() => <HeaderV2 title='超展开设置' hm={HM} />)
}

export default Header
