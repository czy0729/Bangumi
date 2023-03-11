/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 15:31:38
 */
import { observable, computed } from 'mobx'
import { systemStore, rakuenStore, subjectStore, userStore, usersStore } from '@stores'
import {
  HTMLDecode,
  feedback,
  getTimestamp,
  info,
  loading,
  omit,
  removeHTMLTag
} from '@utils'
import store from '@utils/store'
import { t, baiduTranslate } from '@utils/fetch'
import { get, update } from '@utils/kv'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { IOS, HOST, URL_DEFAULT_AVATAR } from '@constants'
import { RakuenReplyType } from '@constants/html/types'
import { AnyObject, TopicId, UserId } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'
import { Params } from './types'

let loadedFavor = false

export default class ScreenTopic extends store {
  params: Params

  state = observable(STATE)

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60
    const commonState = (await this.getStorage(NAMESPACE)) || {}

    try {
      const state = (await this.getStorage(this.namespace)) || {}
      this.setState({
        ...state,
        ...EXCLUDE_STATE,
        reverse: commonState.reverse,
        _loaded: needFetch ? current : _loaded
      })

      this.fetchTopicFromOSS()

      if (!loadedFavor) {
        rakuenStore.getFavor()
        loadedFavor = true
      }

      if (needFetch) {
        if (!this.state.topic._loaded) this.fetchTopicFromCDN()

        // 章节需要请求章节详情
        if (this.isEp) {
          this.fetchEpFormHTML()
        } else {
          rakuenStore.checkIsFavor(this.topicId)
        }

        // 本地帖子过来不主动请求
        const { _noFetch } = this.params
        if (!_noFetch) return this.fetchTopic()
      }

      return true
    } catch (error) {
      this.setState({
        ...EXCLUDE_STATE,
        reverse: commonState.reverse,
        _loaded: needFetch ? current : _loaded
      })
      return true
    }
  }

  // -------------------- fetch --------------------
  /** 获取帖子内容和留言 */
  fetchTopic = () => {
    return rakuenStore.fetchTopic({
      topicId: this.topicId
    })
  }

  /** 章节内容 */
  fetchEpFormHTML = () => {
    const epId = this.topicId.replace('ep/', '')
    return subjectStore.fetchEpFormHTML(epId)
  }

  /** 私有 CDN 的帖子内容信息 */
  fetchTopicFromCDN = () => {
    if (!this.topicId.includes('group/')) return false

    const { setting } = systemStore
    const { _loaded } = this.topic
    if (!setting.cdn || _loaded) return true

    return rakuenStore.fetchTopicFormCDN(this.topicId.replace('group/', ''))
  }

  /** 装载云端帖子缓存数据 */
  fetchTopicFromOSS = async () => {
    if (this.topic._loaded) return

    try {
      const data: any = await get(`topic_${this.topicId.replace('/', '_')}`)

      // 云端没有数据存在, 本地计算后上传
      if (!data) {
        this.updateTopicThirdParty()
        return
      }

      const { ts, topic, comments } = data
      const _loaded = getTimestamp()
      if (typeof topic === 'object' && typeof comments === 'object') {
        this.setState({
          topic: {
            ...topic,
            _loaded: getTimestamp()
          },
          comments: {
            ...comments,
            _loaded: getTimestamp()
          }
        })
      }

      if (_loaded - ts >= 60 * 60 * 2) this.updateTopicThirdParty()
    } catch (error) {}
  }

  /** 上传帖子预数据 */
  updateTopicThirdParty = () => {
    setTimeout(() => {
      const { _loaded, formhash } = this.topic

      // formhash 是登录并且可操作条目的用户的必有值
      if (!_loaded || !formhash) return

      try {
        update(`topic_${this.topicId.replace('/', '_')}`, {
          topic: omit(this.topic, ['formhash', 'lastview', 'close', '_loaded']),
          comments: {
            ...this.comments,
            list: this.comments.list
              .filter((item, index) => index < 16)
              .map(item => ({
                ...omit(item, ['replySub', 'erase', 'message', 'sub']),
                message: decoder(item.message),
                sub: item.sub
                  .filter((i, idx) => idx < 8)
                  .map(i => ({
                    ...omit(i, ['replySub', 'erase', 'message']),
                    message: decoder(i.message)
                  }))
              }))
          }
        })
      } catch (error) {}
    }, 10000)
  }

  // -------------------- get --------------------
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

  /** 帖子内容CDN自维护数据 (用于帖子首次渲染加速) */
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
      const { blockUserIds } = rakuenStore.setting
      const findIndex = blockUserIds.findIndex(item => {
        const [itemUserName, itemUserId] = item.split('@')
        if (itemUserId === 'undefined') {
          return itemUserName === userName
        }

        // userId 可能是用户更改后的英文单词, 但是外面屏蔽的 userId 一定是整数id
        // 所以需要优先使用 subReply('group',361479,1773295,0,456208,[572818],0) 中的userId进行匹配
        if (replySub) {
          const splits = replySub.split(',')
          if (splits.length === 7 && itemUserId == splits[5]) {
            return true
          }
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
    // ep带上章节详情
    if (this.isEp) return this.epFormHTML || this.params._desc
    return this.topic.message || this.topicFormCDN.message || ''
  }

  // -------------------- page --------------------
  /** 吐槽倒序 */
  toggleReverseComments = () => {
    const { reverse } = this.state
    t('帖子.吐槽倒序', {
      topicId: this.topicId,
      reverse: !reverse
    })

    this.setState({
      reverse: !reverse
    })
    this.setStorage(NAMESPACE)
  }

  /** 显示与我相关的回复 */
  toggleFilterMe = () => {
    const { filterMe } = this.state
    t('帖子.与我相关', {
      topicId: this.topicId,
      filterMe: !filterMe
    })

    this.setState({
      filterMe: !filterMe,
      filterFriends: false
    })
    this.setStorage(this.namespace)
  }

  /** 显示好友相关的回复 */
  toggleFilterFriends = () => {
    const { filterFriends } = this.state
    t('帖子.好友相关', {
      topicId: this.topicId,
      filterFriends: !filterFriends
    })

    this.setState({
      filterMe: false,
      filterFriends: !filterFriends
    })
    this.setStorage(this.namespace)
  }

  /** 显示评论框 */
  showFixedTextarea = (username: string, replySub: any, message: any, msg?: string) => {
    t('帖子.显示评论框', {
      topicId: this.topicId
    })

    let placeholder = ''
    if (username) placeholder = `回复 ${username}：`
    if (msg) {
      let comment = HTMLDecode(removeHTMLTag(msg, false))
      if (comment.length >= 64) comment = `${comment.slice(0, 64)}...`
      placeholder += comment
    }

    this.setState({
      placeholder,
      replySub,
      message
    })
  }

  /** 收起评论框 */
  closeFixedTextarea = () => {
    this.setState({
      placeholder: '',
      replySub: '',
      message: ''
    })
  }

  /** 输入框变化 */
  onChange = (value: string) => {
    this.setState({
      value
    })
  }

  /** 失败后恢复上次的内容 */
  recoveryContent = (content: string) => {
    t('帖子.回复失败', {
      topicId: this.topicId
    })

    info('回复失败，可能是cookie失效了')
    this.setState({
      value: ''
    })
    setTimeout(() => {
      this.setState({
        value: content
      })
    }, 160)
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

  updateShowHeaderTitle = (showHeaderTitle: boolean) => {
    this.setState({
      showHeaderTitle
    })
  }

  toggleExpand = (id: any) => {
    const { expands } = this.state
    this.setState({
      expands: expands.includes(id)
        ? expands.filter(item => item !== id)
        : [...expands, id]
    })
    this.setStorage(this.namespace)
  }

  // -------------------- action --------------------
  /** 提交回复 */
  doSubmit = (content: string) => {
    let type: RakuenReplyType
    if (this.topicId.includes('group/')) {
      type = 'group/topic'
    } else if (this.topicId.includes('subject/')) {
      type = 'subject/topic'
    } else if (this.topicId.includes('ep/')) {
      type = 'subject/ep'
    } else if (this.topicId.includes('crt/')) {
      type = 'character'
    } else if (this.topicId.includes('prsn/')) {
      type = 'person'
    } else {
      return
    }

    const { replySub } = this.state
    if (replySub) {
      this.doReplySub(content, type)
      return
    }

    this.doReply(content, type)
  }

  /** 回复 */
  doReply = (content: string, type: RakuenReplyType) => {
    t('帖子.回复', {
      topicId: this.topicId,
      sub: false
    })

    const { formhash } = this.topic
    rakuenStore.doReply(
      {
        type,
        topicId: this.topicId.match(/\d+/g)[0],
        content,
        formhash
      },
      responseText => {
        let res: AnyObject = {}
        try {
          res = JSON.parse(responseText)
        } catch (error) {
          // do nothing
        }

        if (IOS && res.status !== 'ok') {
          this.recoveryContent(content)
        } else {
          this.setState({
            value: ''
          })
        }

        feedback()
        this.fetchTopic()
      }
    )
  }

  /** 回复子回复 */
  doReplySub = (content: string, type: RakuenReplyType) => {
    t('帖子.回复', {
      topicId: this.topicId,
      sub: true
    })

    const { placeholder, replySub, message } = this.state
    const { formhash } = this.topic

    const [, topicId, related, , subReplyUid, postUid] = replySub.split(',')
    let _content = content
    if (message) {
      const _message = decoder(message).replace(
        /<div class="quote"><q>.*<\/q><\/div>/,
        ''
      )
      _content = `[quote][b]${placeholder}[/b] 说: ${removeHTMLTag(
        _message,
        false
      )}[/quote]\n${content}`
    }
    rakuenStore.doReply(
      {
        type,
        content: _content,
        formhash,
        topicId,
        related,
        sub_reply_uid: subReplyUid,
        post_uid: postUid
      },
      responseText => {
        let res: AnyObject = {}
        try {
          res = JSON.parse(responseText)
        } catch (error) {
          // do nothing
        }

        if (IOS && res.status !== 'ok') {
          this.recoveryContent(content)
        } else {
          this.setState({
            value: ''
          })
        }

        feedback()
        this.fetchTopic()
      }
    )
  }

  /** 删除回复 */
  doDeleteReply = (url: string) => {
    if (!url) return

    t('帖子.删除回复', {
      topicId: this.topicId
    })

    rakuenStore.doDeleteReply(
      {
        url: `${HOST}/${url}`
      },
      () => {
        feedback()
        info('已删除')
        this.fetchTopic()
      }
    )
  }

  /** 翻译内容 */
  doTranslate = async () => {
    if (this.state.translateResult.length) return

    t('帖子.翻译内容', {
      topicId: this.topicId
    })

    let hide: () => void
    try {
      hide = loading()
      const response = await baiduTranslate(
        String(`${this.title}\n${this.html}`)
          .replace(/<br \/>/g, '\n')
          .replace(/<\/?[^>]*>/g, '') // 去除HTML tag
      )
      hide()

      const { trans_result: translateResult } = JSON.parse(response)
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResult
        })
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }

  /** 翻译楼层 */
  doTranslateFloor = async (floorId, msg) => {
    const { translateResultFloor } = this.state
    if (translateResultFloor[floorId]) return

    t('帖子.翻译内容', {
      floorId
    })

    let hide
    try {
      hide = loading()
      const response = await baiduTranslate(
        removeHTMLTag(msg.replace(/<br>/g, '\n'), false)
      )
      hide()

      const { trans_result: translateResult } = JSON.parse(response)
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResultFloor: {
            ...translateResultFloor,
            [floorId]: translateResult.map(item => item.dst).join('\n')
          }
        })
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }
}
