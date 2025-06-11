/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 02:22:07
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Menu from '../component/menu'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <HeaderV2
      backgroundStyle={{
        backgroundColor: _.select('rgba(255, 255, 255, 0.64)', 'rgba(0, 0, 0, 0.64)')
      }}
      title={$.keyword || '图集'}
      hm={HM}
      headerRight={() => <Menu />}
    />
  ))
}

export default Header
