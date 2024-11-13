/*
 * @Author: czy0729
 * @Date: 2023-06-10 15:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 08:54:27
 */
import { systemStore } from '@stores'
import { desc } from '@utils'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { loadJSON } from '@assets/json'
import { CollectionStatusCn, SubjectId, SubjectType } from '@types'
import { REASONS, TIME_PATTERN } from './ds'
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

/** 构建推荐理由 */
export function getReasonsInfo(reasons: number[], isFromTyperank: boolean) {
  const infos = reasons
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
  infos.push(`数据来源于「${isFromTyperank ? '分类排行' : '全站猜你喜欢'}」`)

  return infos
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

/** 从条目快照中匹配年份 */
export function matchYear(info: string) {
  if (!info || typeof info !== 'string') return ''

  // 连载开始为最优先
  const year =
    (info.match(/<li><span>(连载开始|开始): <\/span>(.+?)<\/li>/)?.[2] || '').match(
      /(\d{4})/
    )?.[0] || ''
  if (year) return year

  return (
    (
      info.match(
        /<li><span>(发售日|发售日期|放送开始|上映年度|上映时间|发行日期): <\/span>(.+?)<\/li>/
      )?.[2] || ''
    ).match(/(\d{4})/)?.[0] || ''
  )
}

/** 交集 */
function intersection(arr1: SubjectId[], arr2: SubjectId[], k: number = 5) {
  const set2 = new Set(arr2)
  const result = arr1.filter(item => set2.has(item))
  return result.length > k ? result.slice(0, k) : result
}

/** 不进入计算的标签 */
const FILTER_TAG = new Set(['TV', 'OVA', 'WEB', '短片', '剧场版', '泡面番', '日本', '原创'])

/**
 * 2024/11/12 v2.0
 * 因官方猜你喜欢已两年没有更新数据
 *  - 从 typerank 中猜测一批新番数据
 *  - 在收藏标签里挑选最多两个标签, 在 typerank 中取出所有前百 ID
 *  - 前百 ID 相交的条目作为 relateID
 */
export async function getTyperankRelates(
  collections: CollectionsItem[],
  type: SubjectType = 'anime'
) {
  const relates: Record<SubjectId, SubjectId[]> = {}
  const subjectIds: SubjectId[] = []
  if (!collections.length) return [relates, subjectIds] as const

  try {
    const typerank = await loadJSON(`typerank/${type}-ids`)
    collections.forEach(item => {
      const tags = (item.tags || []).filter(
        item => !FILTER_TAG.has(item) && !TIME_PATTERN.test(item)
      )
      const tag1 = tags?.[0] || ''
      const tag2 = tags?.[1] || ''

      let ids: SubjectId[] = []
      let ids1: SubjectId[] = []
      let ids2: SubjectId[] = []

      if (tag1 && tag1 in typerank) ids1 = typerank[tag1].filter(i => item.id != i)
      if (tag2 && tag2 in typerank) ids2 = typerank[tag2].filter(i => item.id != i)

      if (ids1.length && ids2.length) {
        ids = intersection(ids1, ids2)
      } else if (type !== 'anime') {
        // 非动画一般没有多少数据, 放宽条件从排行里面多取数据
        if (ids1.length) {
          ids = ids1.slice(0, 5)
        } else if (ids2.length) {
          ids = ids2.slice(0, 5)
        }
      }

      if (ids.length) {
        relates[item.id] = ids
        subjectIds.push(...ids)
      }
    })
  } catch (error) {}

  return [relates, [...new Set(subjectIds)]] as const
}
