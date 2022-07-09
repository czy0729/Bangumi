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
