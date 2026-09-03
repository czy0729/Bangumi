/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:12:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:12:09
 *
 * 时区
 */

/** GMT+0800 的偏移量 */
export const TIMEZONE_OFFSET_GMT8 = -480

/** 本地时区的偏移量 */
export const TIMEZONE_OFFSET_LOCAL = new Date().getTimezoneOffset()

/** 本地时区是否 GMT+0800 */
export const TIMEZONE_IS_GMT8 = TIMEZONE_OFFSET_LOCAL === TIMEZONE_OFFSET_GMT8
