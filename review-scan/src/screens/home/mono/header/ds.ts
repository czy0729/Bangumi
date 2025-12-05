/*
 * @Author: czy0729
 * @Date: 2024-01-09 17:10:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-09 17:10:26
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const DATA = [TEXT_MENU_BROWSER, TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE] as const
