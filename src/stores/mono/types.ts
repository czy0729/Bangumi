/*
 * @Author: czy0729
 * @Date: 2022-07-01 03:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-24 19:10:07
 */
import { ListEmpty, Cover, CoverCrt, DeepPartial, Id } from '@types'

/** 更多角色 */
export type Characters = ListEmpty<
  DeepPartial<{
    id: Id
    cover: Cover<'g'>
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
  }>
>

/** 更多角色 */
export type Persons = ListEmpty<
  DeepPartial<{
    id: `/person/${Id}`
    cover: CoverCrt<'g'>
    name: string
    nameCn: string
    replies: string
    info: string

    /** @deprecated */
    position?: string
    positions: string[]
  }>
>
