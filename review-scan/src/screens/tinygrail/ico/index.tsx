/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:42:25
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import { useTinygrailICOPage } from './hooks'
import { HM } from './ds'

/** ICO 榜单 */
const TinygrailICO = (props: NavigationProps) => {
  const { id } = useTinygrailICOPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-ico'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <Tabs />
        </TinygrailPage>
        <TinygrailHeader title='ICO 榜单' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailICO
