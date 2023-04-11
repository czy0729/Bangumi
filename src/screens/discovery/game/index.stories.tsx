/*
 * @Author: czy0729
 * @Date: 2023-04-09 09:20:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:26:20
 */
import React from 'react'
import { Page, StorybookSPA, StorybookList, StorybookNavigation } from '@components'
import { ic } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Screen = ic(Store, (props, { $ }: Ctx) => {
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
  title: 'screens/Game',
  component: Screen
}

export const Game = () => (
  <StorybookSPA>
    <StorybookList>
      <Screen
        navigation={StorybookNavigation}
        route={{
          params: {
            name: 'Game'
          }
        }}
      />
    </StorybookList>
  </StorybookSPA>
)
