/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:00:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:08:13
 */
import React from 'react'
import {
  Page,
  StorybookList,
  StorybookNavigation,
  StorybookSPA,
  Text,
  getStorybookRoute
} from '@components'
import { _ } from '@stores'
import { urlStringify } from '@utils'
import { ic } from '@utils/decorators'
import Header from './header'
import Store from './store'

const Component = ic(Store, () => {
  return (
    <Page>
      <Header />
      <Text style={_.mt.center} align='center'>
        网页端不支持此功能
      </Text>
    </Page>
  )
})

export default {
  title: 'screens/Anitama',
  component: Component
}

export const Anitama = () => {
  const route = getStorybookRoute('Anitama')
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
