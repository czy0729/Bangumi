/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:32:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-11 12:32:08
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
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Component = ic(Store, (props, { $ }: Ctx) => {
  useMount(() => {
    $.init()
  })

  return (
    <Page>
      <List />
    </Page>
  )
})

export default {
  title: 'screens/Catalog',
  component: Component
}

export const Catalog = () => {
  const route = getStorybookRoute('Catalog')
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
