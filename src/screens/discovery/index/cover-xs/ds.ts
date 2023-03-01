/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:02:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 07:08:36
 */
import { Navigation, SubjectId, SubjectTypeCn, UserId } from '@types'
import { memoStyles } from './styles'

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
