/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:28:14
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import Tabs from './component/tabs'
import { useTinygrailICOPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** ICO 榜单 */
function TinygrailICO(props: NavigationProps) {
  const { id } = useTinygrailICOPage(props)

  return (
    <Component id='screen-tinygrail-ico'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <Tabs />
        </TinygrailPage>
        <TinygrailHeader title='ICO 榜单' hm={HM} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailICO)
