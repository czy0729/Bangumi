/*
 * @Author: czy0729
 * @Date: 2024-01-20 09:11:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 06:55:25
 */
import { rc } from '@utils/dev'
import { Subject, SubjectId } from '@types'
import { TabsLabel } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  index: 0 as number,
  title: '' as TabsLabel,
  subjectId: 0 as SubjectId,
  type: '2' as Subject['type'],
  image: '' as Subject['images']['medium'],
  name: '' as Subject['name'],
  name_cn: '' as Subject['name_cn'],
  doing: 0 as Subject['collection']['doing'],

  /** 看到多少集 */
  epStatus: '' as string | number,

  /** 收藏时间 (游戏才有) */
  time: '' as string
}
