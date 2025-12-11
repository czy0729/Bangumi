/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-11 04:57:01
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => <HeaderV2 title={`${$.params.name}的多级关联`} hm={$.hm} />)
}

export default Header
