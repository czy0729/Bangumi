/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:09:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:09:54
 *
 * 图片占位与默认图
 */
import { WEB } from '../device'
import { IOS } from '../env'
import { HOST, HOST_BGM_STATIC } from '../host'

import type { ImageRequireSource } from 'react-native'

export const TITLE = IOS ? 'bgm.tv' : 'Bangumi'

/** 占位底图 */
export const IMG_EMPTY = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEX///+nxBvIAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
} as const

/** 占位底图 (黑) */
export const IMG_EMPTY_DARK = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEU+PkC+lq+tAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
} as const

/** 空头像 */
export const IMG_DEFAULT_AVATAR = '//lain.bgm.tv/pic/user/s/icon.jpg'

/** 默认图 */
export const IMG_DEFAULT = require('@assets/images/default.png') as ImageRequireSource

/** 默认用户头像 */
export const IMG_AVATAR_DEFAULT = WEB
  ? `${HOST_BGM_STATIC}/pic/user/l/icon.jpg`
  : (require('@assets/images/l.png') as ImageRequireSource)

/** 默认角色缩略图 */
export const IMG_INFO_ONLY = WEB
  ? (`${HOST}/img/info_only.png` as const)
  : (require('@assets/images/info_only.png') as ImageRequireSource)

/** 默认条目缩略图 */
export const IMG_SUBJECT_ONLY = `${HOST}/img/no_icon_subject.png` as const
