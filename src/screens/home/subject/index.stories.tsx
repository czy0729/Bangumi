/*
 * @Author: czy0729
 * @Date: 2023-04-08 04:30:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 08:58:32
 */
import React from 'react'
import { Page } from '@components'
import { StorybookPage, StorybookList, navigation } from '@components/storybook'
import { subjectStore } from '@stores'
import { getInt } from '@stores/subject'
import { ic } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import List from './list'
import Store from './store'
import { anime, game } from './index.mock'
import { Ctx } from './types'

const Subject = ic(Store, ({ onMounted }, { $ }: Ctx) => {
  useMount(() => {
    onMounted($)
    setTimeout(() => {
      $.rendered()
    }, 400)
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
  component: Subject
}

export const Anime = () => (
  <StorybookPage>
    <StorybookList>
      <Subject
        navigation={navigation}
        route={{
          params: {
            subjectId: anime.subjectId
          }
        }}
        onMounted={$ => {
          const subjectId = anime.subjectId
          const last = getInt(subjectId)
          subjectStore.setState({
            [`subject${last}`]: {
              [subjectId]: anime.subject
            },
            [`subjectFormHTML${last}`]: {
              [subjectId]: anime.subjectFromHTML
            },
            subjectComments: {
              [subjectId]: anime.subjectComments
            }
          })
          $.setState(anime.state)
        }}
      />
    </StorybookList>
  </StorybookPage>
)

export const Game = () => (
  <StorybookPage>
    <StorybookList>
      <Subject
        navigation={navigation}
        route={{
          params: {
            subjectId: game.subjectId
          }
        }}
        onMounted={$ => {
          const subjectId = game.subjectId
          const last = getInt(subjectId)
          subjectStore.setState({
            [`subject${last}`]: {
              [subjectId]: game.subject
            },
            [`subjectFormHTML${last}`]: {
              [subjectId]: game.subjectFromHTML
            },
            subjectComments: {
              [subjectId]: game.subjectComments
            }
          })
          $.setState(game.state)
        }}
      />
    </StorybookList>
  </StorybookPage>
)
