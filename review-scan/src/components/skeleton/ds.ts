/*
 * @Author: czy0729
 * @Date: 2024-01-15 02:19:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:23:30
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { _colorTinygrailBorder, _colorTinygrailIcon } from '@styles'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Skeleton')

export const SHIMMER_COLORS = [_.colorBg, _.colorIcon, _.colorBg]

export const SHIMMER_COLORS_DARK = [
  _._colorDarkModeLevel1,
  _._colorDarkModeLevel2,
  _._colorDarkModeLevel1
]

export const SHIMMER_COLORS_TINYGRAIL_DARK = [
  _colorTinygrailBorder,
  _colorTinygrailIcon,
  _colorTinygrailBorder
]
