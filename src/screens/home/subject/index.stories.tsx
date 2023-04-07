/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:30:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 07:14:49
 */
import React from 'react'
import { Page } from '@components'
import { StorybookPage, StorybookList, navigation } from '@components/storybook'
import { ic } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import Store from './store'
import { init } from './index.mock'
import Header from './header'
import { Ctx } from './types'

const Subject = ic(Store, (props, { $ }: Ctx) => {
  useMount(() => {
    init()

    setTimeout(() => {
      $.rendered()
    }, 400)
  })

  return (
    <Page>
      <Header />
    </Page>
  )
})

export default {
  title: 'screens/Subject',
  component: Subject
}

export const Anime = () => (
  <StorybookPage>
    <StorybookList>
      <Subject
        // @ts-expect-error
        route={{
          params: {
            subjectId: 376703
          }
        }}
        navigation={navigation}
      />
    </StorybookList>
  </StorybookPage>
)
