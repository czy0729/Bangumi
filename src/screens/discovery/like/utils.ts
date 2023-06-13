/*
 * @Author: czy0729
 * @Date: 2023-06-10 15:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-13 06:01:21
 */
import { systemStore } from '@stores'
import { desc } from '@utils'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatusCn } from '@types'
import { REASONS } from './ds'
import { CollectionsItem } from './types'

/** 推荐值 */
export function calc(item: CollectionsItem, length = 1) {
  const { likeRec } = systemStore.setting
  const { rate, rank, score, ep, comment, private: _private, diff, rec } = item
  const type = MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(item.type)
  let reasons: number[] = []

  // [0] 用户自己的打分
  if (likeRec[0]) {
    if (rate >= 8) {
      reasons.push(rate * 3)
    } else if (rate <= 4) {
      reasons.push(Math.abs(rate - 5) * -3)
    } else {
      reasons.push(rate)
    }
  } else {
    reasons.push(0)
  }

  // [1] 用户观看状态
  if (likeRec[1]) {
    if (type === '想看') {
      reasons.push(10)
    } else if (type === '搁置') {
      reasons.push(-40)
    } else if (type === '抛弃') {
      reasons.push(-80)
    } else {
      reasons.push(0)
    }
  } else {
    reasons.push(0)
  }

  // [2] 条目自身排名, 高的相对加分, 低扣分
  const canRec = type === '想看' || type === '在看' || type === '看过'
  if (!likeRec[2] || !canRec) {
    reasons.push(0)
  } else {
    if (rank) {
      if (rank <= 100) {
        reasons.push(20)
      } else if (rank <= 1000) {
        reasons.push(10)
      } else if (rank <= 2000) {
        reasons.push(5)
      } else if (rank >= 4000) {
        reasons.push(-5)
      } else if (rank >= 5000) {
        reasons.push(-10)
      } else {
        reasons.push(0)
      }
    } else {
      reasons.push(0)
    }
  }

  // [3] 条目自身评分, 高的相对加分, 低加得少
  if (!likeRec[3] || !canRec) {
    reasons.push(0)
  } else {
    if (rank) {
      reasons.push(score)
    } else {
      reasons.push(score / 2)
    }
  }

  // [4] 条目收看了很多集相对多加分
  if (!likeRec[4] || !canRec) {
    reasons.push(0)
  } else {
    if (ep >= 12) {
      reasons.push(10)
    } else {
      reasons.push(0)
    }
  }

  // [5] 长评相对多加分
  if (!likeRec[5] || !canRec) {
    reasons.push(0)
  } else {
    if (comment >= 32) {
      reasons.push(10)
    } else {
      reasons.push(0)
    }
  }

  // [6] 私密相对多加分
  if (!likeRec[6] || !canRec) {
    reasons.push(0)
  } else {
    if (_private) {
      reasons.push(15)
    } else {
      reasons.push(0)
    }
  }

  // [7] 最后收藏时间相对较近多加分
  if (!likeRec[7] || !canRec) {
    reasons.push(0)
  } else {
    if (diff && diff <= 30) {
      reasons.push(10)
    } else if (diff >= 365) {
      reasons.push(-10)
    } else {
      reasons.push(0)
    }
  }

  // [8] 标签推荐值
  if (!likeRec[8] || !canRec) {
    reasons.push(0)
  } else {
    if (rec) {
      reasons.push(rec / 5)
    } else {
      reasons.push(0)
    }
  }

  // [9] 条目被多个收藏条目同时推荐到
  if (!likeRec[9] || !canRec) {
    reasons.push(0)
  } else {
    if (length) {
      reasons.push(4)
    } else {
      reasons.push(0)
    }
  }

  reasons = reasons.map(item => Math.floor(item))
  return {
    reasons,
    rate: sumArray(reasons)
  }
}

export function getReasonsInfo(reasons: number[]) {
  return reasons
    .map((item, index) => {
      let info = ''
      if (item !== 0) {
        info += `${REASONS[index]}　`
        info += (item > 0 ? '↑' : '↓').repeat(
          item >= 80 ? 5 : item >= 60 ? 4 : item >= 40 ? 3 : item >= 20 ? 2 : 1
        )
      }
      return [info, item]
    })
    .filter(item => !!item[0])
    .sort((a, b) => desc(a[1], b[1]))
    .map(item => item[0])
}

/** 数组求和 */
function sumArray(arr: number[]) {
  let sum = 0
  for (let i = 0; i < arr.length; i += 1) {
    if (isNaN(arr[i])) continue
    sum += Number(arr[i])
  }
  return sum
}

/** 合并数组 */
export function mergeArrays(arr1: number[], arr2: number[]) {
  return arr1.map((value, index) => value + arr2[index])
}

/** 计算时间跟现在差距多少天 */
export function dayDiff(updatedAt: string) {
  try {
    const date = new Date(updatedAt.replace('T', ' '))
    const now = new Date()
    const timeDiff = Math.abs(now.getTime() - date.getTime())
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  } catch (error) {
    return null
  }
}
