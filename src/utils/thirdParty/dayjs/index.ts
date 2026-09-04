/*
 * @Author: czy0729
 * @Date: 2026-09-04 19:21:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-04 19:21:19
 *
 * 自研轻量日期库, 完全替代 dayjs
 *
 * 只实现项目内实际用到的能力 (对拍基准见 web/test/agents/dayjs-audit.md):
 * - 无格式解析: 'YYYY-MM-DD' / 'YYYY-MM-DD HH:mm:ss' / 'YYYY-MM-DDTHH:mm:ss' 按本地时间,
 *   带时区偏移 (+08:00) 或 Z 结尾的字符串交给原生 Date 解析
 * - customParseFormat: dayjs(str, format) 按指定格式解析
 * - format: YYYY YY MM DD HH mm ss M D H m s + [...] 字面量转义
 * - add / subtract: day week month hour minute second (month 处理月末溢出)
 * - weekday(n) / isoWeek() / utcOffset(n) / isAfter(other, 'day') / diff(other)
 * - isValid / unix / valueOf / day / year / month / date
 * - dayjs.tz.guess()
 *
 * 与 dayjs 对齐的行为:
 * - 越界日期静默进位 (2026-02-30 -> 2026-03-02)
 * - 无效日期 valueOf() 返回 NaN, format() 返回 'Invalid Date'
 * - 不可变, 所有写操作返回新实例
 */
import { Dayjs } from './core'

/**
 * 自研 dayjs 入口
 * @example dayjs('2024-01-15').format('YYYY-MM-DD')
 */
function dayjs(input?: string | number | Date | null, format?: string): Dayjs {
  return new Dayjs(input, format)
}

namespace dayjs {
  /** 当前时区 (IANA 名称, 如 Asia/Shanghai) */
  export const tz = {
    guess(): string {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
      } catch (error) {
        return 'UTC'
      }
    }
  }
}

export { dayjs as default, dayjs }
export type { Dayjs, Unit } from './core'
