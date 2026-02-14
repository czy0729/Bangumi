/*
 * @Author: czy0729
 * @Date: 2024-04-03 22:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-13 15:36:16
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { HeaderV2 } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  return useObserver(() => <HeaderV2 title='Bangumi年鉴' hm={HM} />)
}

export default Header
