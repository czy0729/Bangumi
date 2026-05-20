/*
 * @Author: czy0729
 * @Date: 2024-04-12 02:14:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-12 02:14:50
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_DISCONNECT, TEXT_MENU_DISCONNECT_REV, TEXT_MENU_PM } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const DATA_FRIEND = [TEXT_MENU_PM, TEXT_MENU_DISCONNECT] as const

export const DATA_REV_FRIEND = [TEXT_MENU_DISCONNECT_REV] as const
