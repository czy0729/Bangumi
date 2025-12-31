/*
 * @Author: czy0729
 * @Date: 2025-12-31 21:08:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 22:25:21
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  return useObserver(() => <HeaderV2 title='社区项目' hm={HM} />)
}

export default Header
