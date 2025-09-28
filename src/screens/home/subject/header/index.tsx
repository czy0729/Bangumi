/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-29 06:28:41
 */
import React, { useCallback } from 'react'
import { Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import Menu from './menu'
import PopToTop from './pop-to-top'
import { COMPONENT } from './ds'
import { Props } from './types'

function Header({ onScrollTo, onScrollToTop }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(() => <Menu onScrollTo={onScrollTo} />, [onScrollTo])

  return useObserver(() => (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Subject'
      fixed={$.state.fixed}
      title='条目'
      domTitle={$.jp || $.cn}
      hm={$.hm}
      headerLeft={<PopToTop />}
      headerTitle={<HeaderTitle onScrollToTop={onScrollToTop} />}
      headerRight={handleHeaderRight}
    />
  ))
}

export default Header
