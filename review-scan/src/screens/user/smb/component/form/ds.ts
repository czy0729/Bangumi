/*
 * @Author: czy0729
 * @Date: 2022-10-30 06:58:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:53:53
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Form')

type $State = $['state']

export const DEFAULT_PROPS = {
  store: {} as $,
  styles: {} as ReturnType<typeof memoStyles>,
  visible: false as $State['visible'],
  name: '' as $State['name'],
  onClose: FROZEN_FN as $['onClose']
}

export const URL_DDPLAY = 'ddplay:[PATH]/[FILE]'
export const URL_POTPLAYRER = 'potplayer://[PATH]/[FILE]'
export const URL_VLC = 'vlc://[PATH]/[FILE]'
export const URL_MPV = 'mpv://weblink?url=[PATH]/[FILE]'
