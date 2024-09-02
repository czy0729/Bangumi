/*
 * @Author: czy0729
 * @Date: 2022-08-26 09:22:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:58:17
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Recent')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  subjectId: 0 as $['subjectId'],
  showRecent: true as typeof systemStore.setting.showRecent,
  who: [] as $['subjectFormHTML']['who'],
  hideScore: false as $['hideScore'],
  onSwitchBlock: FROZEN_FN as $['onSwitchBlock']
}
