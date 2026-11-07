/*
 * @Author: czy0729
 * @Date: 2024-09-14 15:58:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * 常量与 WebView 注入脚本的消息类型
 */
import { rc } from '@utils/dev'
import { HOST_AC_M } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Login')

export const URL_ZONE = `${HOST_AC_M}/space?from=headline`

export const TYPE_CHECK_LOGIN = 'CHECK_LOGIN'

export const TYPE_GET_LIST = 'GET_LIST'

export const TYPE_GET_REVIEW = 'GET_REVIEW'
