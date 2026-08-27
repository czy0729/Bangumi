/*
 * @Author: czy0729
 * @Date: 2026-08-27 11:32:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 11:32:44
 */
import { LIKE_TYPE_SAY, LIKE_TYPE_TIMELINE } from '@constants'

import type { Id } from '@types'
import type { LikesItem } from './types'

/** 是否时间线类贴贴 */
export function isTimelineLike(likeType: Id | number) {
  return likeType == LIKE_TYPE_TIMELINE || likeType == LIKE_TYPE_SAY
}

/**
 * 获取可见贴贴列表与是否有被隐藏的项
 *
 * @param likesList 贴贴列表
 * @param state 是否显示全部
 * @param limit 默认显示贴贴数量
 */
export function getVisibleLikes(likesList: LikesItem[], state: boolean, limit: number) {
  const visible: LikesItem[] = []
  let hasHidden = false

  likesList.forEach((item, index) => {
    if (item.selected || state) {
      visible.push(item)
      return
    }

    if (index < limit) {
      visible.push(item)
    } else {
      hasHidden = true
    }
  })

  return {
    /** 可见贴贴列表 */
    visible,

    /** 是否有超出 limit 被隐藏的项 */
    hasHidden
  }
}
