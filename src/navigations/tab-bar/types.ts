/*
 * @Author: czy0729
 * @Date: 2022-08-04 15:48:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:20:46
 */
import type { Navigation, Paths } from '@types'
import type { BOTTOM_TABS } from './config'

export type RouteNames = (typeof BOTTOM_TABS)[number]['name']

export type State = {
  stale: boolean
  type: 'tab'
  key: string
  index: number
  routeNames: RouteNames
  history: {
    type: string
    key: string
  }[]
  routes: {
    name: string
    key: string
  }[]
}

export type Descriptors = {
  [key: string]: {
    navigation: object
    options: {
      tabBarVisible: boolean
    }
  }
}

export type Route = {
  name: Paths
  key: string
}

export type Props = {
  state: State
  descriptors: Descriptors
  navigation: Navigation
}
