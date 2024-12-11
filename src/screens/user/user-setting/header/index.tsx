/*
 * @Author: czy0729
 * @Date: 2024-01-21 07:52:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 05:06:27
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import Check from '../component/check'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return <HeaderV2 title='个人设置' hm={HM} headerRight={() => <Check $={$} />} />
}

export default ob(Header, COMPONENT)
