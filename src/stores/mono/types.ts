/*
 * @Author: czy0729
 * @Date: 2022-07-01 03:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 19:55:44
 */
import { Cover, CoverCrt, Id, ListEmpty } from '@types'

export type CharactersItem = {
  id: Id
  cover: Cover<'m'>
  name: string
  nameCn: string
  replies: string
  position: string
  info: string
  actors: {
    id: string
    cover: CoverCrt<'s'>
    name: string
    nameCn: string
  }[]
}

/** 更多角色 */
export type Characters = ListEmpty<CharactersItem>

export type PersonsItem = {
  id: `/person/${Id}`
  cover: CoverCrt<'g'>
  name: string
  nameCn: string
  replies: string
  info: string

  /** @deprecated */
  position?: string
  positions: string[]
}

/** 更多角色 */
export type Persons = ListEmpty<PersonsItem>
