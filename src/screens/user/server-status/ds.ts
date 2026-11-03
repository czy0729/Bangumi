/*
 * @Author: czy0729
 * @Date: 2024-12-11 20:43:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-04 12:00:00
 *
 * 网络探针: 页面标识、探测地址与检测参数
 */
import { HOST_AC_API } from '@constants'

export const COMPONENT = 'ServerStatus'

export const HM = ['server-status', 'ServerStatus'] as const

/** 探针请求: bilibili 番剧分区, 只用于检测延迟 */
export const URL_PROBE_BILIBILI = `${HOST_AC_API}/pgc/web/season/section?season_id=1`

/** 探针请求: youku 番剧预览, 只用于检测延迟 */
export const URL_PROBE_YOUKU = 'https://list.youku.com/show/module?id=1&tab=point&callback=jQuery'

/** 每个站点最多检测次数, 失败即停止 */
export const PING_COUNTS = 4

/** 单次检测超时 (毫秒) */
export const PING_TIMEOUT = 5000

/** 平均延迟低于此值显示绿色 (毫秒) */
export const STATUS_FAST = 150

/** 平均延迟低于此值显示黄色, 超过或失败显示红色 (毫秒) */
export const STATUS_OK = 1000
