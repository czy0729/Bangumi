/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:02:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 18:12:14
 */
import { rc } from '@utils/dev'
import { Navigation, SubjectId, SubjectTypeCn, UserId } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Xs')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  imageWidth: 0 as number,
  avatarRound: false as boolean,
  title: '' as SubjectTypeCn,
  avatar: '' as string,
  subjectId: 0 as SubjectId,
  cover: '' as string,
  cn: '' as string,
  jp: '' as string,
  name: '' as string,
  userId: '' as UserId,
  userName: '' as string
}
