/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 21:31:58
 */
import React from 'react'
import { Page } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Heatmaps from './heatmaps'
import Store from './store'

const Blog = () => {
  const { y, fixed, onScroll } = useOnScroll()
  return useObserver(() => (
    <>
      <Header y={y} fixed={fixed} />
      <Page>
        <List onScroll={onScroll} />
      </Page>
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Blog)
