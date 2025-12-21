/*
 * @Author: czy0729
 * @Date: 2022-08-04 15:48:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-06 17:44:20
 */
import { IconfontNames, Navigation, Paths } from '@types'
import { routesConfig } from './config'

export type RouteNames = keyof (typeof routesConfig)[]

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

export type RoutesConfig = {
  [key: string]: {
    icon: IconfontNames
    size?: number
    label: string
  }
}

export type Props = {
  state: State
  descriptors: Descriptors
  navigation: Navigation
}
