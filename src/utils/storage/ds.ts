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

/** 缓存过程中间值 (已序列化的大值, 待定时串行落盘) */
export const CACHE_MAP = new Map<string, string>()

/** 待序列化数据 (引用, 同 key 保存自动合并为最后一次) */
export const PENDING_MAP = new Map<string, unknown>()

/** 各 key 上次序列化后的长度记忆, 用于区分大小键走不同的序列化时机 */
export const SIZE_MAP = new Map<string, number>()
