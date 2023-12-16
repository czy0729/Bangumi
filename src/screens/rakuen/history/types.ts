/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:32:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 06:51:15
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'
import { DS } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Types = (typeof DS)[number]
