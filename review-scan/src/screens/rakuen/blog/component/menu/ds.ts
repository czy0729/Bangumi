/*
 * @Author: czy0729
 * @Date: 2025-02-09 23:43:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-02-09 23:43:42
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Menu')

export const DATA = [TEXT_MENU_BROWSER, TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE] as const
