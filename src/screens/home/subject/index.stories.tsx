/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:30:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-10 22:35:17
 */
import React from 'react'
import {
  Page,
  StorybookPage,
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
  title: 'screens/Subject',
  component: Component
}

export const Subject = () => {
  const route = getStorybookRoute('Subject')
  return (
    <StorybookPage>
      <StorybookList>
        <Component
          key={urlStringify(route.params)}
          navigation={StorybookNavigation}
          route={route}
        />
      </StorybookList>
    </StorybookPage>
  )
}
