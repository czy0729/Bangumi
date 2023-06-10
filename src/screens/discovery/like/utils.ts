/*
 * @Author: czy0729
 * @Date: 2023-06-10 15:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 01:28:32
 */
import { CollectionsItem } from './types'

/** 推荐值 */
export function calc(item: CollectionsItem, length = 1) {
  const { rate, rank, score } = item
  let value = 0

  // 收藏条目用户自己的打分
  if (rate >= 8) {
    // 最高分可以获得很多推荐分，乘以系数 2
    value = rate * 2
  } else if (rate <= 4) {
    // 最低分需要减很多推荐分，乘以系数 -4
    value = (rate - 5) * -4
  } else {
    // 2-8 分之间的分数采用线性插值计算
    value = rate
  }

  // 收藏条目的自身评价
  if (rank) {
    if (rank <= 100) {
      value += 20
    } else if (rank <= 1000) {
      value += 10
    } else if (rank <= 2000) {
      value += 5
    } else if (rank >= 3000) {
      value -= 5
    } else if (rank >= 4000) {
      value -= 10
    }
  }

  if (rank) {
    value += score
  } else {
    value += score / 2
  }

  // 推荐条目在多个收藏条目中推荐到
  value += length * 1.1

  return value
}
