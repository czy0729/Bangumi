/*
 * @Author: czy0729
 * @Date: 2023-03-31 02:01:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 08:41:08
 */
import { computed } from 'mobx'
import { rakuenStore, subjectStore, systemStore, usersStore, userStore } from '@stores'
import { asc, freeze, getGroupThumbStatic, HTMLDecode } from '@utils'
import { HOST_IMAGE } from '@utils/app/ds'
import CacheManager from '@utils/cache-manager'
import { CDN_OSS_MAGMA_PIC, CDN_OSS_MAGMA_POSTER, HOST, URL_DEFAULT_AVATAR } from '@constants'
import { Id, TopicId, UserId } from '@types'
import State from './state'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class Computed extends State {
  /** 本地化 */
  save = (common: boolean = false) => {
    return this.saveStorage(common ? NAMESPACE : this.namespace, EXCLUDE_STATE)
  }

  /** 帖子 id */
  @computed get topicId() {
    const { topicId = '' } = this.params
    return (topicId ? topicId.split('#')?.[0] || '' : '0') as TopicId
  }

  /** 需要跳转到的楼层 id */
  @computed get postId() {
    const { topicId = '' } = this.params
    return topicId.split('#post_')?.[1]
  }

  /** 本地化数据键名 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.topicId}`
  }

  /** 帖子内容 */
  @computed get topic() {
    return freeze(rakuenStore.topic(this.topicId))
  }

  /** 帖子快照 (用于帖子首次渲染加速) */
  @computed get topicFromOSS() {
    return this.state.topic
  }

  /** 帖子回复 */
  @computed get topicComments() {
    return rakuenStore.comments(this.topicId)
  }

  /** 筛选逻辑 */
  @computed get comments() {
    return freeze(() => {
      // 只显示跳转楼层
      if (this.state.filterPost) {
        return {
          ...this.topicComments,
          list: this.topicComments.list.filter(item => {
            if (item.id === this.state.filterPost) return true

            let flag = false
            item.sub.forEach(i => {
              if (i.id === this.state.filterPost) flag = true
            })
            return flag
          }),
          pagination: {
            page: 1,
            pageTotal: 1
          }
        }
      }

      const comments = this.topicComments._loaded ? this.topicComments : this.state.comments
      let { list } = comments

      // 楼层翻转
      if (this.state.reverse) list = list.slice().reverse()

      // 主动设置屏蔽默认头像用户相关信息
      if (systemStore.setting.filterDefault) {
        list = list
          .filter(item => !item.avatar?.includes(URL_DEFAULT_AVATAR))
          .map(item => ({
            ...item,
            sub: item.sub.filter(i => !i.avatar?.includes(URL_DEFAULT_AVATAR))
          }))
      }

      const { filterType } = this.state
      if (filterType === 'follow') {
        const { commentTrack } = rakuenStore.setting
        if (!commentTrack.length) {
          return {
            ...comments,
            list
          }
        }

        return {
          ...comments,
          list: list.filter(item => {
            if (commentTrack.includes(item.userId)) return true

            let flag = false
            item.sub.forEach(i => {
              if (commentTrack.includes(i.userId)) flag = true
            })
            return flag
          }),
          pagination: {
            page: 1,
            pageTotal: 1
          }
        }
      }

      if (filterType === 'likes') {
        const ids: Id[] = [...(this.likesFloorIds || [])]
        if (!ids.length) {
          return {
            ...comments,
            list
          }
        }

        return {
          ...comments,
          list: list
            .filter(item => {
              if (ids.includes(item.id)) return true

              let flag = false
              item.sub.forEach(i => {
                if (ids.includes(i.id)) flag = true
              })
              return flag
            })
            .map(item => ({
              ...item,
              sub: item.sub.filter(i => ids.includes(i.id))
            })),
          pagination: {
            page: 1,
            pageTotal: 1
          }
        }
      }

      // 只显示自己参与评论
      if (filterType === 'me') {
        return {
          ...comments,
          list: list.filter(item => {
            if (item.sub.findIndex(i => i.userId === userStore.myId) !== -1) return true

            return item.userId === userStore.myId
          }),
          pagination: {
            page: 1,
            pageTotal: 1
          }
        }
      }

      // 只显示好友相关评论
      if (filterType === 'friends') {
        return {
          ...comments,
          list: list.filter(item => {
            if (item.sub.findIndex(i => this.myFriendsMap[i.userId]) !== -1) return true

            return this.myFriendsMap[item.userId]
          }),
          pagination: {
            page: 1,
            pageTotal: 1
          }
        }
      }

      return {
        ...comments,
        list
      }
    })
  }

  /** 特别关注的回复数统计 */
  @computed get commentFollowCount() {
    const { commentTrack } = rakuenStore.setting
    if (!commentTrack.length) return 0

    const map: Record<UserId, true> = {}
    commentTrack.forEach(item => (map[item] = true))

    return this.topicComments.list.filter(item => {
      let flag: boolean = map[item.userId]
      if (!flag) flag = item.sub.some(i => map[i.userId])
      return flag
    }).length
  }

  /** 我的回复数统计 */
  @computed get commentMeCount() {
    return this.topicComments.list.filter(item => {
      let flag: boolean = item.userId === userStore.myId
      if (!flag) flag = item.sub.some(i => i.userId === userStore.myId)
      return flag
    }).length
  }

  /** 好友的回复数统计 */
  @computed get commentFriendsCount() {
    return this.topicComments.list.filter(item => {
      let flag: boolean = !!this.myFriendsMap[item.userId]
      if (!flag) flag = item.sub.some(i => this.myFriendsMap[i.userId])
      return flag
    }).length
  }

  /** 带有贴贴的楼层 */
  @computed get likesFloorIds() {
    return freeze(Object.keys(rakuenStore.likes(this.topicId)))
  }

  /** 导演排序 */
  @computed get directItems(): {
    pid?: number
    id: number
    floor: string
    index: [number, number?]
    sibling?: number[]
  }[] {
    return freeze(() => {
      const key = `directItems|${this.topicId}|${this.comments._loaded}`
      if (CacheManager.get(key)) return CacheManager.get(key)

      const data = []
      this.comments.list.forEach((item, index) => {
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
    })
  }

  /** 是否章节 */
  @computed get isEp() {
    return this.topicId.indexOf('ep/') === 0
  }

  /** 是否人物 */
  @computed get isMono() {
    return this.topicId.indexOf('crt/') === 0 || this.topicId.indexOf('prsn/') === 0
  }

  /** 人物 id */
  @computed get monoId() {
    if (this.topicId.indexOf('crt/') === 0) return this.topicId.replace('crt/', 'character/')

    if (this.topicId.indexOf('prsn/') === 0) return this.topicId.replace('prsn/', 'person/')

    return this.topicId
  }

  /** 章节内容 */
  @computed get epFormHTML() {
    return subjectStore.epFormHTML(this.topicId.replace('ep/', ''))
  }

  /** 是否已读 */
  @computed get readed() {
    return rakuenStore.readed(this.topicId)
  }

  /** 我的好友 userId 哈希映射 */
  @computed get myFriendsMap() {
    return freeze(usersStore.myFriendsMap)
  }

  /** 是否本地收藏 */
  @computed get isFavor() {
    return rakuenStore.favorV2(this.topicId)
  }

  /** 收藏人数 */
  @computed get favorCount() {
    return rakuenStore.favorCount(this.topicId)
  }

  /** 帖子里所有用户的映射 */
  @computed get postUsersMap() {
    const postUsersMap: Record<
      string,
      {
        userId: UserId
        userName: string
        avatar: string
      }
    > = {}
    this.topicComments.list.forEach(item => {
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
    return freeze(postUsersMap)
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

  /** 帖子标题 */
  @computed get title() {
    return HTMLDecode(
      (this.topic.title === 'undefined' ? '' : this.topic.title) ||
        this.params._title ||
        this.topicFromOSS.title ||
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

    return this.topic.group || this.params._group || this.topicFromOSS.group || ''
  }

  /** 帖子小组封面 */
  @computed get groupThumb() {
    const { _group, _groupThumb } = this.params
    if (_groupThumb) return _groupThumb

    if (_group) return rakuenStore.groupThumb(_group)

    return this.topic.groupThumb || this.topicFromOSS.groupThumb || ''
  }

  /** 最终帖子小组封面 */
  @computed get groupThumbFinal() {
    let src = getGroupThumbStatic(this.groupThumb)
    if (
      typeof src === 'string' &&
      systemStore.setting.cdn &&
      systemStore.setting.cdnOrigin === 'magma' &&
      src.includes(HOST_IMAGE)
    ) {
      if (src.includes('pic/cover')) {
        src = CDN_OSS_MAGMA_POSTER(src.replace('/s/', '/l/'), 'bgm_poster_100')
      } else {
        src = CDN_OSS_MAGMA_PIC(src)
      }
    }
    return src
  }

  /** 帖子小组地址 */
  @computed get groupHref() {
    return this.topic.groupHref || this.topicFromOSS.groupHref || ''
  }

  /** 发帖时间 */
  @computed get time() {
    return this.topic.time || this.topicFromOSS.time || ''
  }

  /** 发帖人头像 */
  @computed get avatar() {
    return this.topic.avatar || this.params._avatar || this.topicFromOSS.avatar || ''
  }

  /** 发帖人用户 id */
  @computed get userId(): UserId {
    return this.topic.userId || this.params._userId || this.topicFromOSS.userId || ''
  }

  /** 发帖人用户名 */
  @computed get userName() {
    return HTMLDecode(
      this.topic.userName || this.params._userName || this.topicFromOSS.userName || ''
    )
  }

  /** 发帖人个性签名 */
  @computed get userSign() {
    return this.topic.userSign || this.topicFromOSS.userSign || ''
  }

  /** 帖子地址 */
  @computed get html() {
    // ep 带上章节详情
    if (this.isEp) return this.epFormHTML || this.params._desc

    return (this.topic.message || this.topicFromOSS.message || '').replace(
      /(<br\s*\/?>){3,}/g,
      '<br><br>'
    )
  }

  /** 帖子网址 */
  @computed get url() {
    return this.params?._url || `${HOST}/rakuen/topic/${this.topicId}`
  }

  @computed get hm() {
    return [this.url, 'Topic'] as const
  }

  @computed get currentChatValues() {
    return this.state.chat[systemStore.setting.musumePrompt] || []
  }

  @computed get event() {
    return {
      id: '帖子.跳转',
      data: {
        from: '#1',
        topicId: this.topicId
      }
    } as const
  }
}
