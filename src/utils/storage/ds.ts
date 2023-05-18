/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:48:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-17 20:44:01
 */
import { STORYBOOK } from '@constants/device'
import { DEV } from '@/config'

/** 本地化字符串大于此值会延迟合并再写入 */
export const LAZY_SET_STORAGE_SIZE = 1024

/** 延迟写入间隔 */
export const LAZY_SET_STORAGE_INTERVAL = STORYBOOK ? 1000 : DEV ? 6000 : 18000
