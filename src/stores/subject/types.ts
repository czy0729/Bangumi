/*
 * @Author: czy0729
 * @Date: 2022-06-10 14:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-10 15:22:06
 */
import { SubjectType } from '@constants/model/types'
import { Override, ListEmpty, PersonId } from '@types'

/** 公共回复参数 */
type SubjectCommentsAttrs = {
  id: string
  time: string
  floor: string
  avatar: string
  userId: string
  userName: string
  userSign: string
  replySub: string
  message: string
}

/** 回复项 */
type SubjectCommentsItem = Override<
  SubjectCommentsAttrs,
  {
    /** 子回复 */
    sub: SubjectCommentsAttrs[]
  }
>

/** 条目回复 */
export type SubjectComments = Override<
  ListEmpty<SubjectCommentsItem>,
  {
    _reverse?: SubjectCommentsItem[]
  }
>

/** 角色回复 */
export type MonoCommentsItem = SubjectComments

/** 制作人员职位项 */
export type MonoWorksItem = {
  id: string
  cover: string
  name: string
  nameCn: string
  tip: string
  position: string[]
  score: string
  total: string
  rank: string
  collected: boolean
  type: SubjectType
}

/** 角色列表项 */
export type MonoVoicesItem = {
  cover: string
  id: string
  name: string
  nameCn: string
  subject: any[]
}

/** 人物作品列表 */
export type FetchMonoWorks = (
  args: {
    monoId: PersonId
    position?: string
    order?: 'date' | 'rank' | 'title'
  },
  refresh?: boolean
) => Promise<ListEmpty<MonoWorksItem>>

/** 人物角色列表 */
export type FetchMonoVoices = (args: {
  monoId: PersonId
  position?: string
}) => Promise<ListEmpty<MonoVoicesItem>>
