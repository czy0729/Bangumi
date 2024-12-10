/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:38:52
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import Extra from '../component/extra'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return <HeaderV2 title='小组' hm={HM} headerRight={() => <Extra $={$} />} />
}

export default ob(Header, COMPONENT)
