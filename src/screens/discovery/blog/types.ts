/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:47:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 04:37:20
 */
import { factory } from '@utils'
import { Navigation, SubjectType } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type BlogType = SubjectType | 'all'
