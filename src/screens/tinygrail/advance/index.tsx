/*
 * @Author: czy0729
 * @Date: 2020-01-09 16:42:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 21:32:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import TinygrailPage from '@tinygrail/_/page'
import Menus from './component/menus'
import Header from './header'

/** 高级功能 */
function TinygrailAdvance() {
  return (
    <>
      <TinygrailPage>
        <Menus />
      </TinygrailPage>
      <Header />
    </>
  )
}

export default observer(TinygrailAdvance)
