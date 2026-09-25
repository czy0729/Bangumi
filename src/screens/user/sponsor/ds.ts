/*
 * @Author: czy0729
 * @Date: 2022-09-07 14:38:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 12:10:48
 */
import { desc } from '@utils'
import advanceJSON from '@assets/json/advance.json'
import usersMapJSON from '@assets/json/user.json'

import type { User } from './types'

/** advance.json 的值: 1 或 'a|10' */
const ADVANCE = advanceJSON as Record<string, 1 | string>

export const USERS_MAP = usersMapJSON as Record<string, User>

export const COMPONENT = 'Sponsor'

/**
 * 支持者名单, 按支持额降序
 *  - 同金额带一个随机值参与排序, 每次冷启动相对顺序都不同, 露脸机会均等
 * */
export const LIST = Object.entries(ADVANCE)
  .filter(([, value]) => value === 1 || typeof value === 'string')
  .map(([key, value]) => {
    const item = String(value)
    if (item === '1') {
      return {
        data: key,
        weight: 10,
        rand: Math.random()
      }
    }

    const [, weight] = item.split('|')
    return {
      data: key,
      weight: Number(weight),
      rand: Math.random()
    }
  })
  .sort((a, b) => desc(a.weight, b.weight) || a.rand - b.rand)
  .map(({ data, weight }) => ({
    data,
    weight
  }))

/** treemap 最多显示格子数 */
export const MAX_NODES = 40

/** 列表每页条数 */
export const LIST_LIMIT = 40

/** 过滤比例 */
export const FILTER_RATE = 0.002

/** 支持额分档, 与色阶 l1~l4 一一对应, 图表配色、图例、列表奖牌共用 */
export const LEVELS = [
  {
    min: 100,
    level: 'l4',
    icon: 'gold'
  },
  {
    min: 50,
    level: 'l3',
    icon: 'silver'
  },
  {
    min: 20,
    level: 'l2',
    icon: 'bronze'
  },
  {
    min: 10,
    level: 'l1',
    icon: ''
  }
] as const

/** 各档区间文案, 与 LEVELS 一一对应 */
export const LEVEL_LABELS = ['≥ 100', '50 ~ 99', '20 ~ 49', '10 ~ 19'] as const
