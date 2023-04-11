/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:27:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:27:38
 */
import React from 'react'
import {
  Page,
  StorybookList,
  StorybookNavigation,
  StorybookSPA,
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
  title: 'screens/Browser',
  component: Component
}

export const Browser = () => {
  const route = getStorybookRoute('Browser')
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
