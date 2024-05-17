/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 04:02:25
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import Menu from './menu'
import PopToTop from './pop-to-top'
import { COMPONENT } from './ds'

function Header({ onScrollTo }, { $ }: Ctx) {
  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Subject'
      fixed={$.state.fixed}
      title='条目'
      domTitle={$.jp || $.cn}
      hm={[$.url, 'Subject']}
      headerLeft={<PopToTop />}
      headerTitle={<HeaderTitle $={$} />}
      headerRight={() => <Menu onScrollTo={onScrollTo} />}
    />
  )
}

export default obc(Header, COMPONENT)
