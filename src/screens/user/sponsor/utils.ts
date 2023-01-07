/*
 * @Author: czy0729
 * @Date: 2022-09-07 00:56:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 08:43:01
 */
import { useCallback, useState } from 'react'
import dayjs from 'dayjs'
import { _, usersStore } from '@stores'
import { queue, toFixed } from '@utils'
import treemap from '@utils/thirdParty/treemap'
import { IOS } from '@constants'
import { AnyObject } from '@types'
import DS from '@assets/json/advance.json'
import { LIST, FILTER_RATE } from './ds'

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

let filterUserIdsCache = []

/** treemap 加权计算 */
export function useTreemapSquarify() {
  const [filterUserIds, setFilterUserIds] = useState([...filterUserIdsCache])
  const setFilter = useCallback(
    id => {
      setFilterUserIds([...filterUserIds, id])
      filterUserIdsCache = [...filterUserIds, id]
    },
    [filterUserIds, setFilterUserIds]
  )
  const resetFilter = useCallback(() => {
    setFilterUserIds([])
    filterUserIdsCache = []
  }, [setFilterUserIds])

  let list = LIST.filter(item => !filterUserIds.includes(item.data))
  const total = caculateTotal(list)

  /** 过滤的个数 */
  let filterCount = 0

  /** 过滤的总值 */
  let filterTotal = 0

  list = list.filter((item, index) => {
    // 面积除以当前总面积小于过滤比例, 需要隐藏区域
    if (item.weight / total < FILTER_RATE || index >= 40) {
      filterCount += 1
      filterTotal += item.weight
      return false
    }
    return true
  })

  const currentTotal = caculateTotal(list)
  const nodes = list.map(item => ({
    data: item.data,
    weight: item.weight,
    price: item.weight,
    percent: item.weight / currentTotal
  }))

  const data = []
  try {
    // @ts-ignore
    treemap.squarify(
      {
        frame: {
          x: 0,
          y: 0,
          width: _.window.width,
          height: _.window.height - _.headerHeight - 56 - (IOS ? 28 : 0)
        },
        nodes
      },
      (x: number, y: number, w: number, h: number, node: AnyObject) =>
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
  } catch (error) {}

  return {
    data,
    filterLength: filterUserIds.length,
    filterCount,
    filterTotal,
    setFilter,
    resetFilter
  }
}

function caculateTotal(nodes: any[]) {
  let total = 0
  nodes.forEach(item => (total += item.weight || 0))
  return total
}

export async function devGetUsersInfo() {
  const USERS_MAP = {}

  await queue(
    Object.keys(DS)
      // .filter((item, index) => index >= 500 && index < 600)
      .map((userId, index) => async () => {
        const data = await usersStore.fetchUsers({
          userId
        })
        console.log(index)

        USERS_MAP[userId] = {
          n: data.userName
        }
        if (data.avatar) USERS_MAP[userId].a = data.avatar
        if (data.userId !== userId) USERS_MAP[userId].i = data.userId
        return true
      })
  )
  // log(USERS_MAP)
}
