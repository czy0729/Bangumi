/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:17:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-28 15:50:41
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'SelectedList')

export const NUM_COLUMNS = _.isPad ? 5 : 4

export const ACTION_SHEET_HEIGHT_SM = 480

export const ACTION_SHEET_HEIGHT_MD = 640

export const ACTION_SHEET_HEIGHT_LG = 800
