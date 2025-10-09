/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:58:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 19:02:07
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => <HeaderV2 title={$.params.name || '详情'} hm={$.hm} />)
}

export default Header
