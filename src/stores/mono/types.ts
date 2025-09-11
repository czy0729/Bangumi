/*
 * @Author: czy0729
 * @Date: 2022-07-01 03:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 21:04:39
 */
import { Id, ListEmpty } from '@types'
import { LOADED } from './init'

export type CacheKey = keyof typeof LOADED

/** 更多角色项 */
export type CharactersItem = {
  id: Id
  cover: string
  name: string
  nameCn: string
  replies: string
  position: string
  info: string
  actors: {
    id: string
    cover: string
    name: string
    nameCn: string
  }[]
}

/** 更多角色 */
export type Characters = ListEmpty<CharactersItem>

/** 更多制作人员项 */
export type PersonsItem = {
  id: `/person/${Id}`
  cover: string
  name: string
  nameCn: string
  replies: string
  info: string
  positions: string[]
  positionDetails: string[]

  /** @deprecated */
  position?: string
}

/** 更多制作人员 */
export type Persons = ListEmpty<PersonsItem>
