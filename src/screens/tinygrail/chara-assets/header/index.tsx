/*
 * @Author: czy0729
 * @Date: 2022-06-08 09:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 21:24:25
 */
import React, { useCallback } from 'react'
import { HeaderV2 } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Right from '../component/right'
import { COMPONENT, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(() => <Right $={$} />, [$])

  return useObserver(() => (
    <HeaderV2
      backgroundStyle={_.container.tinygrail}
      title={$.params?.userName ? `${$.params.userName}的持仓` : '我的持仓'}
      headerTitleAlign='left'
      alias='我的持仓'
      hm={HM}
      headerRight={handleHeaderRight}
    />
  ))
}

export default Header
