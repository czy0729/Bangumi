/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:11:15
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import Menu from './menu'
import PopToTop from './pop-to-top'
import { COMPONENT } from './ds'

function Header({ onScrollTo, onScrollToTop }) {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Subject'
      fixed={$.state.fixed}
      title='条目'
      domTitle={$.jp || $.cn}
      hm={[$.url, 'Subject']}
      headerLeft={<PopToTop />}
      headerTitle={<HeaderTitle $={$} onScrollToTop={onScrollToTop} />}
      headerRight={() => <Menu onScrollTo={onScrollTo} />}
    />
  )
}

export default ob(Header, COMPONENT)
