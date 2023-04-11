/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:34:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:35:06
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
      {/* @ts-expect-error */}
      <List />
    </Page>
  )
})

export default {
  title: 'screens/CatalogDetail',
  component: Component
}

export const CatalogDetail = () => {
  const route = getStorybookRoute('CatalogDetail')
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
