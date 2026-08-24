/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:15:28
 */
import { computed } from 'mobx'
import { rakuenStore, subjectStore, systemStore, usersStore, userStore } from '@stores'
import { freeze } from '@utils'
import { HOST, WEB } from '@constants'
import {
  filterDefaultAvatar,
  filterUserAvatar,
  findRelationByType,
  findRelationByTypes,
  mapBoardToTopic,
  mapFriendsRating,
  mapReviewsToBlog
} from '../utils'
import Meta from './meta'

import type { Subject, SubjectFromHtmlWhoItem } from '@stores/subject/types'
/** 关联与筛选派生 */
export default class Relations extends Meta {
  /** 关联数据 (原始) */
  @computed get subjectRelations() {
    if (this.isFormHTMLLoaded) return freeze(this.subjectFormHTML.relations || [])

    return freeze(this.subjectFromOSS.relations || [])
  }

  /** 关联: 前传和续集, 或系列: 若为单行本, relations 第一项则为系列前传 */
  @computed get subjectPrev() {
    return freeze(findRelationByType(this.subjectRelations, '前传'))
  }

  /** 续集 */
  @computed get subjectAfter() {
    return freeze(findRelationByType(this.subjectRelations, '续集'))
  }

  /** 系列 */
  @computed get subjectSeries() {
    return freeze(this.subjectRelations?.[0]?.type === '系列' ? this.subjectRelations[0] : null)
  }

  /** 书籍 */
  @computed get subjectBook() {
    if (!WEB) {
      // 客户端中更加谨慎展示关联书籍数据, 往往越后面越不是本体, 而是衍生
      const index = this.subjectRelations.findIndex(item => item.type === '书籍')
      if (index !== -1 && index <= 3) return this.subjectRelations[index]

      return null
    }

    return freeze(findRelationByType(this.subjectRelations, '书籍'))
  }

  /** 动画化 */
  @computed get subjectAnime() {
    const title = this.titleLabel || ''
    if (!title.includes('系列') && !title.includes('音乐')) return null

    const find = findRelationByTypes(this.subjectRelations, ['动画', '其他'])

    // 部分条目维护不够好, 动画化条目标签为其他, 若日文名字相等都认为是动画化
    if (find?.type === '动画' || (find?.type === '其他' && this.jp.includes(find?.title))) {
      return freeze(find)
    }

    return null
  }

  /** 不同演绎 */
  @computed get subjectDiff() {
    const find = findRelationByTypes(this.subjectRelations, ['不同演绎', '主版本', '主线故事'])
    if (find) return freeze(find)

    if (this.type === '书籍' && this.comic?.length) {
      const item = this.comic[0]
      return {
        id: item.id,
        image: item.image,
        title: item.name,
        type: '单行本',
        url: `${HOST}/subject/${item.id}`
      } as const
    }

    return freeze(findRelationByType(this.subjectRelations, '外传'))
  }

  /** 是否有相关系列 */
  @computed get hasSeries() {
    return !!(
      this.subjectAfter ||
      this.subjectPrev ||
      this.subjectSeries ||
      this.subjectAnime ||
      this.subjectDiff ||
      this.subjectBook
    )
  }

  /** 是否存在在目录中 */
  @computed get catalogIncludes() {
    return usersStore.catalogSubjectCount(this.subjectId)
  }

  /** 是否应该过滤默认头像 */
  @computed get shouldFilterDefault() {
    return systemStore.setting.filterDefault || userStore.isLimit
  }

  /** 过滤后的目录 */
  @computed get filterCatalog() {
    return freeze(filterDefaultAvatar(this.catalog))
  }

  /** 过滤后的日志 */
  @computed get filterBlog() {
    let blog = this.subject.blog || []
    if (this.shouldFilterDefault) {
      blog = filterUserAvatar(blog)
    }

    if (!blog.length) {
      try {
        const reviews = rakuenStore.reviews(this.subjectId)
        if (reviews?.list?.length) {
          blog = mapReviewsToBlog(reviews.list) as typeof blog
        }
      } catch {}
    }

    return freeze(blog) as Subject['blog']
  }

  /** 过滤后的帖子 */
  @computed get filterTopic() {
    let topic = this.subject.topic || []
    if (this.shouldFilterDefault) {
      topic = filterUserAvatar(topic)
    }

    if (!topic.length) {
      try {
        const board = rakuenStore.board(this.subjectId)
        if (board?.list?.length) {
          topic = mapBoardToTopic(board.list, this.subjectId) as typeof topic
        }
      } catch {}
    }

    return freeze(topic)
  }

  /** 过滤后的动态 */
  @computed get filterRecent() {
    return freeze(filterDefaultAvatar(this.subjectFormHTML.who || [])) as SubjectFromHtmlWhoItem[]
  }

  /** 原始好友评分数据 */
  @computed get rawFriendsRating() {
    const { list: doings = [] } = subjectStore.rating(this.subjectId, 'doings', true)
    const { list: collections = [] } = subjectStore.rating(this.subjectId, 'collections', true)
    return { doings, collections }
  }

  /** 好友评分（映射后） */
  @computed get friendsRating() {
    const { doings, collections } = this.rawFriendsRating
    const result = mapFriendsRating(doings, collections, this.action)
    return result.length > 0 ? result : freeze([])
  }

  /** 吐槽数量 */
  @computed get commentLength() {
    const {
      list,
      pagination: { pageTotal = 0 }
    } = this.subjectComments
    return pageTotal <= 1 ? list.length : 20 * (pageTotal >= 2 ? pageTotal - 1 : pageTotal)
  }
}
