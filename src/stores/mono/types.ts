/*
 * @Author: czy0729
 * @Date: 2022-07-01 03:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-01 04:08:36
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
    actorId: string
    actorCover: CoverCrt<'s'>
    actor: string
    actorCn: string
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
    position: string
    info: string
  }>
>
