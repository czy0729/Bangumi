/*
 * @Author: czy0729
 * @Date: 2024-02-12 18:01:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 21:23:02
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['tinygrail/chara/assets', 'TinygrailCharaAssets'] as const
