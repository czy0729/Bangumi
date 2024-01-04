/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:02:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 14:47:58
 */
import { rc } from '@utils/dev'
import { Navigation, SubjectId, SubjectTypeCn, UserId } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'CoverXs')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  imageWidth: 0 as number,
  avatarRound: false as boolean,
  title: '' as SubjectTypeCn,
  avatar: '' as string,
  data: {} as {
    id: SubjectId
    cover: string
    name: string
    userId: UserId
    userName: string
  }
}
