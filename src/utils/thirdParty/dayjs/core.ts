/*
 * @Author: czy0729
 * @Date: 2026-09-04 19:20:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-04 19:20:40
 */
import { format } from './format'
import { parse, parseWithFormat } from './parse'
import { getISOWeek } from './utils'

import type { Unit } from './types'

type Components = {
  y: number
  m: number
  d: number
  h: number
  i: number
  s: number
}

class Dayjs {
  /** 时刻 (毫秒), 无效日期为 NaN */
  private readonly ms: number

  /** UTC 偏移 (分钟), null 表示本地时区 */
  private readonly offsetMin: number | null

  constructor(input?: string | number | Date | null, format?: string, offsetMin?: number | null) {
    this.offsetMin = offsetMin === undefined ? null : offsetMin
    this.ms =
      typeof input === 'number' && format === undefined
        ? input
        : (format ? parseWithFormat(input as string, format) : parse(input)).getTime()
  }

  /** 用时刻与偏移重建实例 */
  private static fromEpoch(ms: number, offsetMin: number | null): Dayjs {
    return new Dayjs(ms, undefined, offsetMin)
  }

  /** 是否有效日期 */
  isValid(): boolean {
    return !isNaN(this.ms)
  }

  /** 毫秒时间戳, 无效日期为 NaN */
  valueOf(): number {
    return this.ms
  }

  /** 秒时间戳, 无效日期为 NaN */
  unix(): number {
    return Math.floor(this.ms / 1000)
  }

  /** 0-6, 0 为周日 */
  day(): number {
    return this.get('Day')
  }

  year(): number {
    return this.get('FullYear')
  }

  /** 0-11 */
  month(): number {
    return this.get('Month')
  }

  date(): number {
    return this.get('Date')
  }

  hours(): number {
    return this.get('Hours')
  }

  minutes(): number {
    return this.get('Minutes')
  }

  seconds(): number {
    return this.get('Seconds')
  }

  /** 按当前呈现时区取分量 */
  private get(
    unit: 'FullYear' | 'Month' | 'Date' | 'Day' | 'Hours' | 'Minutes' | 'Seconds'
  ): number {
    if (isNaN(this.ms)) return NaN
    if (this.offsetMin === null) {
      return (new Date(this.ms) as any)[`get${unit}`]()
    }
    return (new Date(this.ms + this.offsetMin * 60000) as any)[`getUTC${unit}`]()
  }

  /** 各分量统一出口 */
  private components(): Components {
    return {
      y: this.get('FullYear'),
      m: this.get('Month'),
      d: this.get('Date'),
      h: this.get('Hours'),
      i: this.get('Minutes'),
      s: this.get('Seconds')
    }
  }

  /** 用分量重建时刻 */
  private fromComponents(c: Components): Dayjs {
    const ms =
      this.offsetMin === null
        ? new Date(c.y, c.m, c.d, c.h, c.i, c.s).getTime()
        : Date.UTC(c.y, c.m, c.d, c.h, c.i, c.s) - this.offsetMin * 60000
    return Dayjs.fromEpoch(ms, this.offsetMin)
  }

  clone(): Dayjs {
    return Dayjs.fromEpoch(this.ms, this.offsetMin)
  }

  add(amount: number, unit: Unit): Dayjs {
    if (isNaN(this.ms)) return this.clone()

    // 兼容复数写法: hours / days / ...
    const _unit = unit.replace(/s$/, '') as Unit
    if (_unit === 'month') {
      const c = this.components()
      const targetMonth = c.m + amount
      const y = c.y + Math.floor(targetMonth / 12)
      const m = ((targetMonth % 12) + 12) % 12
      // 月末溢出截断, 与 dayjs 一致 (1-31 加月后可能落在下月, 收回当月最后一天)
      const daysInMonth = new Date(y, m + 1, 0).getDate()
      const d = Math.min(c.d, daysInMonth)
      return this.fromComponents({ y, m, d, h: c.h, i: c.i, s: c.s })
    }

    const multiplier = {
      week: 7 * 24 * 3600 * 1000,
      day: 24 * 3600 * 1000,
      hour: 3600 * 1000,
      minute: 60 * 1000,
      second: 1000
    }[_unit as Exclude<Unit, 'month'>]
    return Dayjs.fromEpoch(this.ms + amount * multiplier, this.offsetMin)
  }

  subtract(amount: number, unit: Unit): Dayjs {
    return this.add(-amount, unit)
  }

  /** 本周内取星期 n (0-6, 0 为周日), 与 dayjs weekday 插件 (weekStart=0) 一致 */
  weekday(n: number): Dayjs {
    return this.add(n - this.day(), 'day')
  }

  /** 重设呈现时区偏移 (小时), 时刻本身不变 */
  utcOffset(offset: number): Dayjs {
    return Dayjs.fromEpoch(this.ms, offset * 60)
  }

  /** ISO-8601 周序号 */
  isoWeek(): number {
    const c = this.components()
    return getISOWeek(c.y, c.m, c.d)
  }

  /** 毫秒差, 仅支持毫秒粒度 (原版 dayjs 的 diff 支持 unit 参数, 自研未实现) */
  diff(other: Dayjs): number {
    return this.ms - other.valueOf()
  }

  /** 是否晚于 other, unit 仅支持 'day', 不传按毫秒比较 */
  isAfter(other: Dayjs, unit?: 'day'): boolean {
    if (isNaN(this.ms) || isNaN(other.valueOf())) return false
    if (unit === 'day') {
      const a = this.startOf()
      const b = other.startOf()
      return a.ms > b.ms
    }
    return this.ms > other.valueOf()
  }

  /** 当天 00:00:00, 仅支持天粒度 (原版 dayjs 的 startOf 支持 unit 参数, 自研未实现) */
  startOf(): Dayjs {
    const c = this.components()
    return this.fromComponents({ ...c, h: 0, i: 0, s: 0 })
  }

  /** 格式化, 支持 YYYY YY MM DD HH mm ss M D H m s 与 [...] 字面量转义 */
  format(fmt?: string): string {
    if (isNaN(this.ms)) return 'Invalid Date'
    return format(this.components(), fmt)
  }
}

export { Dayjs }
export type { Unit }
