/*
 * @Author: czy0729
 * @Date: 2023-02-06 19:35:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-13 05:11:59
 */
import * as Screens from '@screens'
import { RatingStatus, SubjectTypeCn } from '@constants/model/types'
import { SubjectId } from './bangumi'

/** 所有页面路径名 */
export type Paths = keyof typeof Screens

/** 路由和参数约束 */
export type NavigationPushType = ((path: Paths) => any) &
  ((
    path: 'Subject',
    params: {
      subjectId: SubjectId
      _jp?: string
      _cn?: string
      _image?: string
      _collection?: string
      _type?: SubjectTypeCn
    }
  ) => any) &
  ((
    path: 'Rating',
    params: {
      subjectId: SubjectId
      status: RatingStatus | ''
      name: string
      wish: number
      collect: number
      doing: number
      onHold: number
      dropped: number
    }
  ) => any) &
  ((
    path: 'Actions',
    params: {
      subjectId: SubjectId
      name: string
    }
  ) => any) &
  ((
    path: 'Information',
    params: {
      title: string
      message: string[]
      advance?: boolean
    }
  ) => any) &
  ((
    path: 'Share',
    params: {
      _subjectId: SubjectId
      _type: SubjectTypeCn | ''
      _url: string
      _cover: `data:image/jpg;base64,${string}`
      _title: string
      _content: string
      _detail: string
    }
  ) => any) &
  ((
    path: 'Award',
    params: {
      uri: string
    }
  ) => any) &
  ((
    path: 'Setting',
    params: {
      open?: string
    }
  ) => any)
