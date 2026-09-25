/*
 * @Author: czy0729
 * @Date: 2022-09-07 00:56:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 19:16:51
 */
import { toFixed } from '@utils'
import dayjs from '@utils/thirdParty/dayjs'
import treemapRaw from '@utils/thirdParty/treemap'
import { HOST_BGM_STATIC, IMG_DEFAULT_AVATAR } from '@constants'
import { FILTER_RATE, LEVELS, LIST, MAX_NODES, USERS_MAP } from './ds'

import type { Node, TreemapNode } from './types'

/** 第三方库没有类型声明, 按用到的调用签名断言 */
const treemap = treemapRaw as unknown as {
  squarify: (
    options: {
      frame: {
        x: number
        y: number
        width: number
        height: number
      }
      nodes: Node[]
    },
    callback: (x: number, y: number, w: number, h: number, node: Node) => void
  ) => void
}

export function timeDiff() {
  const start = dayjs('2019-03-30')
  const now = dayjs()

  let ts = Math.floor(now.diff(start) / 1000)

  const y = Math.floor(ts / (60 * 60 * 24 * 365))
  ts -= y * (60 * 60 * 24 * 365)

  const m = Math.floor(ts / (60 * 60 * 24 * 30))
  ts -= m * (60 * 60 * 24 * 30)

  const d = Math.floor(ts / (60 * 60 * 24))
  ts -= d * (60 * 60 * 24)

  const h = Math.floor(ts / (60 * 60))
  ts -= h * (60 * 60)

  const i = Math.floor(ts / 60)
  ts -= i * 60

  const s = ts

  return `${y}年${m}月${d}日${h}时${i}分${s}秒`
}

/**
 * 自己在支持者名单里的下标, 未上榜返回 -1
 *  - 名单的键可能是改过的 userId, 也可能是数字 id, 所以两种都要比对
 * */
export function getMyIndex(myUserId: string, myId: string) {
  if (!myUserId && !myId) return -1

  return LIST.findIndex(item => {
    if (item.data === myId) return true
    if (item.data === myUserId) return true

    const id = USERS_MAP[item.data]?.i
    return !!id && String(id) === myUserId
  })
}

/**
 * 支持者头像地址
 *  - USERS_MAP.a 只存了后三级目录 (00/71/7132), 第一级是 id 补零到 9 位的前 3 位, 即 100 万前为 000, 之后为 001
 * */
export function getSponsorAvatar(data: string) {
  const { a } = USERS_MAP[data] || {}
  if (!a) return IMG_DEFAULT_AVATAR

  const id = a.split('/').pop()!.split('_')[0]
  const dir = id.padStart(9, '0').slice(0, 3)
  return `${HOST_BGM_STATIC}/pic/user/l/${dir}/${a}.jpg`
}

/** 支持额所在档位下标, 低于最低档返回 -1 */
export function getLevelIndex(price: number) {
  return LEVELS.findIndex(item => price >= item.min)
}

/** 只显示某一档时, 其余支持者的 id 列表 */
export function getRangeFilterIds(levelIndex: number) {
  const { min } = LEVELS[levelIndex]
  const max = levelIndex === 0 ? Infinity : LEVELS[levelIndex - 1].min

  return LIST.filter(item => !(item.weight >= min && item.weight < max)).map(item => item.data)
}

/** 去掉隐藏项后, 再按占比与格子上限截断出参与排布的节点 */
export function buildNodes(filterUserIds: string[]) {
  const filterUserIdsSet = new Set(filterUserIds)
  const list = LIST.filter(item => !filterUserIdsSet.has(item.data))
  const total = calculateTotal(list)

  /** 面积占比过小或超出格子上限的都不排布 */
  const nodes = list.filter(
    (item, index) => item.weight / total >= FILTER_RATE && index < MAX_NODES
  )
  const currentTotal = calculateTotal(nodes)

  return {
    nodes: nodes.map(item => ({
      data: item.data,
      weight: item.weight,
      price: item.weight,
      percent: item.weight / currentTotal
    })),
    hiddenCount: list.length - nodes.length
  }
}

/** treemap 排布 */
export function squarifyNodes(nodes: Node[], width: number, height: number) {
  const data: TreemapNode[] = []

  try {
    treemap.squarify(
      {
        frame: {
          x: 0,
          y: 0,
          width,
          height
        },
        nodes
      },
      (x, y, w, h, node) =>
        data.push({
          data: node.data,
          price: node.price,
          percent: node.percent,
          x: parseFloat(toFixed(x, 3)),
          y: parseFloat(toFixed(y, 3)),
          w: parseFloat(toFixed(w, 3)),
          h: parseFloat(toFixed(h, 3))
        })
    )
  } catch {}

  return data
}

function calculateTotal(nodes: { weight: number }[]) {
  let total = 0
  nodes.forEach(item => (total += item.weight || 0))
  return total
}
