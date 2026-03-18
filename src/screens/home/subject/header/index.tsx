/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:30:29
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import HeaderTitle from '../component/header-title'
import Menu from './menu'
import PopToTop from './pop-to-top'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'
import type { Props } from './types'

function Header({ onScrollTo, onScrollToTop }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elHeaderLeft = useMemo(() => <PopToTop />, [])
  const elHeaderTitle = useMemo(
    () => <HeaderTitle onScrollToTop={onScrollToTop} />,
    [onScrollToTop]
  )

  const handleHeaderRight = useCallback(() => <Menu onScrollTo={onScrollTo} />, [onScrollTo])

  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Subject'
      fixed={$.state.fixed}
      title='条目'
      domTitle={$.jp || $.cn}
      hm={$.hm}
      headerLeft={elHeaderLeft}
      headerTitle={elHeaderTitle}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
