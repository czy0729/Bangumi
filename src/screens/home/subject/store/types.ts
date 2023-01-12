/*
 * @Author: czy0729
 * @Date: 2022-06-02 05:26:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-10 04:07:54
 */
import { DeepPartial, Expand, Loaded, Sites, SubjectId, SubjectTypeCn } from '@types'

export type Params = {
  subjectId: SubjectId
  _type?: SubjectTypeCn
  _jp?: string
  _cn?: string
  _image?: string
  _imageForce?: string
  _summary?: string
  _collection?: string
  _aid?: number
}

export type EpsData = Expand<
  DeepPartial<
    Record<
      Sites,
      {
        [ep: string]: string
      }
    >
  > & {
    _loaded: Loaded
  }
>

export type AnitabiData = {
  id: SubjectId
  city: string
  title: string
  cn: string
  color: string
  cover: `https://image.anitabi.cn/points/${number}/${string}.jpg?plan=h160`
  geo: [number, number]
  imagesLength: number
  modified: number
  pointsLength: number
  zoom: number
  litePoints: {
    cn: string
    ep: number
    geo: [number, number]
    id: string
    image: `https://image.anitabi.cn/points/${number}/${string}.jpg?plan=h160`
    name: string

    /** 代表 ep 中的秒 */
    s: number
  }[]
  _loaded?: Loaded
}
