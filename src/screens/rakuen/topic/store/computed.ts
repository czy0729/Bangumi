/*
 * @Author: czy0729
 * @Date: 2023-03-31 02:01:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-03 16:16:45
 */
import { computed } from 'mobx'
import { rakuenStore, subjectStore, systemStore, usersStore, userStore } from '@stores'
import { asc, HTMLDecode } from '@utils'
import CacheManager from '@utils/cache-manager'
import { URL_DEFAULT_AVATAR } from '@constants'
import { TopicId, UserId } from '@types'
import State from './state'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class Computed extends State {
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 帖子 id */
  @computed get topicId() {
    const { topicId = '' } = this.params
    if (!topicId) return '0' as TopicId
    return (topicId.split('#')?.[0] || '') as TopicId
  }

  /** 需要跳转到的楼层 id */
  @computed get postId() {
    const { topicId = '' } = this.params
    const [, postId] = topicId.split('#post_')
    return postId
  }

  /** 本地化数据键名 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.topicId}`
  }

  /** 帖子内容 */
  @computed get topic() {
    return rakuenStore.topic(this.topicId)
  }

  /** 帖子内容 CDN 自维护数据 (用于帖子首次渲染加速) */
  @computed get topicFormCDN() {
    const { topic } = this.state
    if (topic._loaded) return topic
    return rakuenStore.topicFormCDN(this.topicId.replace('group/', ''))
  }

  /**
   * 筛选逻辑
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 限制用户群体 (iOS的游客和审核员) 强制屏蔽默认头像用户
   */
  @computed get comments() {
    const { filterMe, filterFriends, reverse } = this.state
    const { filterDefault } = systemStore.setting

    const comments = rakuenStore.comments(this.topicId)
    const _comments = comments._loaded ? comments : this.state.comments

    let list = reverse ? _comments.list.slice().reverse() : _comments.list
    if (filterDefault || this.isLimit) {
      list = list
        .filter(item => !item.avatar?.includes(URL_DEFAULT_AVATAR))
        .map(item => ({
          ...item,
          sub: item.sub.filter(i => !i.avatar?.includes(URL_DEFAULT_AVATAR))
        }))
    }

    // 只显示自己参与评论
    if (filterMe) {
      return {
        ..._comments,
        list: list.filter(item => {
          if (item.sub.findIndex(i => i.userId === this.myId) !== -1) {
            return true
          }
          return item.userId === this.myId
        }),
        pagination: {
          page: 1,
          pageTotal: 1
        }
      }
    }

    // 只显示好友相关评论
    if (filterFriends) {
      return {
        ..._comments,
        list: list.filter(item => {
          if (item.sub.findIndex(i => this.myFriendsMap[i.userId]) !== -1) {
            return true
          }
          return this.myFriendsMap[item.userId]
        }),
        pagination: {
          page: 1,
          pageTotal: 1
        }
      }
    }

    return {
      ..._comments,
      list
    }
  }

  /** 我的回复数统计 */
  @computed get commentMeCount() {
    const { list } = rakuenStore.comments(this.topicId)
    return list.filter(item => {
      if (item.sub.findIndex(i => i.userId === this.myId) !== -1) {
        return true
      }
      return item.userId === this.myId
    }).length
  }

  /** 好友的回复数统计 */
  @computed get commentFriendsCount() {
    const { list } = rakuenStore.comments(this.topicId)
    return list.filter(item => {
      if (item.sub.findIndex(i => this.myFriendsMap[i.userId]) !== -1) {
        return true
      }
      return this.myFriendsMap[item.userId]
    }).length
  }

  /** 导演排序 */
  @computed get directItems(): {
    pid?: number
    id: number
    floor: string
    index: [number, number?]
    sibling?: number[]
  }[] {
    const { list, _loaded } = this.comments
    const key = `directItems|${this.topicId}|${_loaded}`
    if (CacheManager.get(key)) return CacheManager.get(key)

    const data = []
    list.forEach((item, index) => {
      data.push({
        id: Number(item.id),
        floor: item.floor,
        index: [index]
      })

      const sibling = []
      item.sub.forEach((i, idx) => {
        sibling.push(Number(i.id))
        data.push({
          pid: Number(item.id),
          id: Number(i.id),
          floor: i.floor,
          index: [index, idx],
          sibling: [...sibling]
        })
      })
    })
    data.sort((a, b) => asc(a.id, b.id))

    return CacheManager.set(key, data)
  }

  /** 是否章节 */
  @computed get isEp() {
    return this.topicId.indexOf('ep/') === 0
  }

  /** 是否人物 */
  @computed get isMono() {
    return this.topicId.indexOf('prsn/') === 0 || this.topicId.indexOf('crt/') === 0
  }

  /** 人物 id */
  @computed get monoId() {
    if (this.topicId.indexOf('prsn/') === 0) {
      return this.topicId.replace('prsn/', 'person/')
    }

    if (this.topicId.indexOf('crt/') === 0) {
      return this.topicId.replace('crt/', 'character/')
    }

    return this.topicId
  }

  /** 章节内容 */
  @computed get epFormHTML() {
    const epId = this.topicId.replace('ep/', '')
    return subjectStore.epFormHTML(epId)
  }

  /** 是否登录 */
  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  /** 是否已读 */
  @computed get readed() {
    return rakuenStore.readed(this.topicId)
  }

  /** 自己用户 Id (改过后的) */
  @computed get myId() {
    return userStore.myId
  }

  /** 我的好友 userId 哈希映射 */
  @computed get myFriendsMap() {
    return usersStore.myFriendsMap
  }

  /** @deprecated iOS 首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审 */
  @computed get isUGCAgree() {
    return systemStore.isUGCAgree
  }

  /** 是否本地收藏 */
  @computed get isFavor() {
    return rakuenStore.favorV2(this.topicId)
  }

  /** 收藏人数 */
  @computed get favorCount() {
    return rakuenStore.favorCount(this.topicId)
  }

  /** 超展开设置 */
  @computed get setting() {
    return rakuenStore.setting
  }

  /** 是否限制内容展示, 用于审核 */
  @computed get isLimit() {
    return userStore.isLimit
  }

  /** 过滤用户删除的楼层 */
  @computed get filterDelete() {
    return rakuenStore.setting.filterDelete
  }

  /** 帖子里所有用户的映射 */
  @computed get postUsersMap() {
    const postUsersMap = {}
    const { list } = rakuenStore.comments(this.topicId)
    list.forEach(item => {
      if (!postUsersMap[item.userName]) {
        postUsersMap[item.userName] = {
          userId: item.userId,
          userName: item.userName,
          avatar: item.avatar
        }
      }

      item.sub.forEach(i => {
        if (!postUsersMap[i.userName]) {
          postUsersMap[i.userName] = {
            userId: i.userId,
            userName: i.userName,
            avatar: i.avatar
          }
        }
      })
    })
    return postUsersMap
  }

  /** 是否屏蔽用户 */
  isBlockUser(userId: UserId, userName: string, replySub: string = '') {
    return computed(() => {
      const findIndex = rakuenStore.blockUserIds.findIndex(item => {
        const [itemUserName, itemUserId] = item.split('@')
        if (itemUserId === 'undefined') return itemUserName === userName

        /**
         * userId 可能是用户更改后的英文单词, 但是外面屏蔽的 userId 一定是整数 ID
         * 所以需要优先使用 subReply('group',361479,1773295,0,456208,[572818],0) 中的 userId 进行匹配
         */
        if (replySub) {
          const splits = replySub.split(',')
          if (splits.length === 7 && itemUserId == splits[5]) return true
        }

        return itemUserId == userId || itemUserName === userName
      })

      return findIndex !== -1
    }).get()
  }

  // -------------------- get: cdn fallback --------------------
  /** 帖子标题 */
  @computed get title() {
    return HTMLDecode(
      (this.topic.title === 'undefined' ? '' : this.topic.title) ||
        this.params._title ||
        this.topicFormCDN.title ||
        ''
    )
  }

  /** 副标题 (用于章节类帖子, 因为章节标题爬取源头只用日文, 但是过来之前是可以带着中文的) */
  @computed get subTitle() {
    if (!this.topicId.includes('ep/')) return ''

    const title = HTMLDecode(this.params._title || '')
    if (title === this.title) return ''

    return title
  }

  /** 帖子小组名 */
  @computed get group() {
    if (this.isMono) return this.topic.title || this.params._title
    return this.topic.group || this.params._group || this.topicFormCDN.group || ''
  }

  /** 帖子小组封面 */
  @computed get groupThumb() {
    const { _group, _groupThumb } = this.params
    if (_groupThumb) return _groupThumb
    if (_group) return rakuenStore.groupThumb(_group)
    return this.topic.groupThumb || this.topicFormCDN.groupThumb || ''
  }

  /** 帖子小组地址 */
  @computed get groupHref() {
    return this.topic.groupHref || this.topicFormCDN.groupHref || ''
  }

  /** 发帖时间 */
  @computed get time() {
    return this.topic.time || this.topicFormCDN.time || ''
  }

  /** 发帖人头像 */
  @computed get avatar() {
    return this.topic.avatar || this.params._avatar || this.topicFormCDN.avatar || ''
  }

  /** 发帖人用户 id */
  @computed get userId(): UserId {
    return this.topic.userId || this.params._userId || this.topicFormCDN.userId || ''
  }

  /** 发帖人用户名 */
  @computed get userName() {
    return HTMLDecode(
      this.topic.userName || this.params._userName || this.topicFormCDN.userName || ''
    )
  }

  /** 发帖人个性签名 */
  @computed get userSign() {
    return this.topic.userSign || this.topicFormCDN.userSign || ''
  }

  /** 帖子地址 */
  @computed get html() {
    // ep 带上章节详情
    if (this.isEp) return this.epFormHTML || this.params._desc

    return (this.topic.message || this.topicFormCDN.message || '').replace(/(<br>)+/g, '<br>')
  }
}
