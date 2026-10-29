/*
 * @Author: czy0729
 * @Date: 2023-03-31 02:09:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 页面交互动作: 筛选 / 收藏 / 楼层展开 / 滚动
 */
import { getHeaderFixed } from '@components/header-v2/utils'
import { rakuenStore, uiStore } from '@stores'
import { feedback, updateVisibleBottom } from '@utils'
import { cacheManager } from '@utils/cache'
import { t } from '@utils/fetch'
import { update } from '@utils/kv'
import Chat from './chat'

import type { Id, ScrollEvent } from '@types'

export default class Action extends Chat {
  /** 缓存用户头像关系 */
  cacheAvatars = () => {
    const { list } = this.comments
    list.forEach(item => {
      const key = `avatar|${item.userId}`
      if (!cacheManager.has(key)) cacheManager.set(key, item.avatar)

      item.sub.forEach(i => {
        const key = `avatar|${i.userId}`
        if (!cacheManager.has(key)) cacheManager.set(key, i.avatar)
      })
    })
  }

  /** 吐槽倒序 */
  toggleReverseComments = () => {
    const value = !this.state.reverse
    t('帖子.吐槽倒序', {
      topicId: this.topicId,
      reverse: value
    })

    this.setState({
      reverse: value
    })
    this.save(true)
  }

  /** 显示全部回复 */
  onFilterClear = () => {
    this.setState({
      filterType: '',
      filterPost: ''
    })
    this.save()
    feedback()
  }

  /** 显示追踪相关的回复 */
  onFilterFollow = () => {
    t('帖子.关注相关', {
      topicId: this.topicId
    })

    this.setState({
      filterType: 'follow',
      filterPost: ''
    })
    this.save()
    feedback()
  }

  /** 显示好友相关的回复 */
  onFilterLikes = () => {
    t('帖子.贴贴相关', {
      topicId: this.topicId
    })

    this.setState({
      filterType: 'likes',
      filterPost: ''
    })
    this.save()
    feedback()
  }

  /** 显示与我相关的回复 */
  onFilterMe = () => {
    t('帖子.与我相关', {
      topicId: this.topicId
    })

    this.setState({
      filterType: 'me',
      filterPost: ''
    })
    this.save()
    feedback()
  }

  /** 显示好友相关的回复 */
  onFilterFriends = () => {
    t('帖子.好友相关', {
      topicId: this.topicId
    })

    this.setState({
      filterType: 'friends',
      filterPost: ''
    })
    this.save()
    feedback()
  }

  /** 取消只显示跳转楼层 */
  clearFilterPost = () => {
    this.setState({
      filterPost: ''
    })
  }

  /** 设置收藏 */
  setFavor = async () => {
    const value = !this.isFavor
    const result = await rakuenStore.setFavorV2(this.topicId, value)
    if (result?.code === 200) {
      t('帖子.设置收藏', {
        topicId: this.topicId,
        isFavor: value
      })

      if (value) {
        const data = {
          avatar: this.avatar,
          userId: this.userId,
          userName: this.userName,
          title: this.title,
          group: this.group,
          time: this.time
        }
        if (data.avatar?.includes('icon.jpg')) {
          data.avatar = this.groupThumb
        }
        if (this.topicId.includes('ep/')) {
          const temp = String(this.epFormHTML).match(/\/ 首播:(.+?)<\/span>/)?.[1]
          if (temp) data.time = `首播:${temp}`
        }

        update(`favor_${this.topicId.replace('/', '_')}`, data)
      }
    }
  }

  /** 设置显示头部里程碑 */
  updateShowHeaderTitle = (showHeaderTitle: boolean) => {
    this.setState({
      showHeaderTitle
    })
  }

  /** 展开的子楼层 (expands 统一存字符串, 兼容数字 pid) */
  toggleExpand = (id: Id) => {
    const key = String(id)
    const { expands } = this.state
    this.setState({
      expands: expands.includes(key) ? expands.filter(item => item !== key) : [...expands, key]
    })
    this.save()
  }

  /** 展开的子楼层回调 */
  onExpand = (id: Id) => {
    const key = String(id)
    const { expands } = this.state
    if (expands.includes(key)) return

    this.toggleExpand(key)
  }

  /** 设置导演楼层 */
  updateDirection = (directIndex: number, directFloor: string = '') => {
    this.setState({
      directIndex,
      directFloor
    })
    this.save()
  }

  updateVisibleBottom = updateVisibleBottom.bind(this)

  onScrollY = 0

  /** 更新可视范围底部 y */
  onScroll = (e: ScrollEvent) => {
    this.updateVisibleBottom(e)
    uiStore.closePopableSubject()
    uiStore.closeLikesGrid()

    // 计算头部是否需要固定
    const { y } = e.nativeEvent.contentOffset
    this.onScrollY = y

    const fixed = getHeaderFixed(y, this.state.fixed)
    if (fixed === null) return

    this.setState({
      fixed
    })
    if (!this.state.scrolled) {
      setTimeout(() => {
        this.setState({
          scrolled: true
        })
      }, 0)
    }
  }
}
