/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 15:51:04
 */
import React from 'react'
import {
  Page,
  StorybookSPA,
  StorybookList,
  StorybookNavigation,
  getStorybookRoute
} from '@components'
import { urlStringify } from '@utils'
import { ic } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Component = ic(Store, (props, { $ }: Ctx) => {
  useMount(() => {
    $.init()
  })

  return (
    <Page>
      <Header />
      <List />
    </Page>
  )
})

export default {
  title: 'screens/Rank',
  component: Component
}

export const Rank = () => {
  const route = getStorybookRoute('Rank')
  return (
    <StorybookSPA>
      <StorybookList>
        <Component
          key={urlStringify(route.params)}
          navigation={StorybookNavigation}
          route={route}
        />
      </StorybookList>
    </StorybookSPA>
  )
}
