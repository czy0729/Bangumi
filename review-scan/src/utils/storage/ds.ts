/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:48:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-06 18:14:35
 */
import { WEB } from '@constants/device'
import { DEV } from '@src/config'

/** 本地化字符串大于此值会延迟合并再写入 (Bytes) */
export const LAZY_SET_STORAGE_SIZE = 1024 * 20

/** 延迟写入间隔 */
export const LAZY_SET_STORAGE_INTERVAL = WEB ? 1000 : DEV ? 6000 : 12000

/** 缓存过程中间值 */
export const CACHE_MAP = new Map<string, any>()
