/*
 * @Author: czy0729
 * @Date: 2022-10-30 06:58:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 14:39:40
 */
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

type $State = $['state']

export const DEFAULT_PROPS = {
  store: {} as $,
  styles: {} as ReturnType<typeof memoStyles>,
  visible: false as $State['visible'],
  name: '' as $State['name'],
  onClose: (() => {}) as $['onClose']
}

export const URL_DDPLAY = 'ddplay:[PATH]/[FILE]'
export const URL_POTPLAYRER = 'potplayer://[PATH]/[FILE]'
export const URL_VLC = 'vlc://[PATH]/[FILE]'
export const URL_MPV = 'mpv://weblink?url=[PATH]/[FILE]'
