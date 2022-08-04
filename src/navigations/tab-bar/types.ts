/*
 * @Author: czy0729
 * @Date: 2022-08-04 15:48:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-04 16:16:32
 */
import { Paths } from '@types'
import { routesConfig } from './config'

export type RouteNames = keyof typeof routesConfig[]

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
