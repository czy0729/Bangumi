/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:16:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-13 07:26:01
 */
import { observable, computed } from 'mobx'
import { systemStore, rakuenStore, userStore, usersStore } from '@stores'
import { IOS, HOST } from '@constants'
import { removeHTMLTag, info, feedback, getTimestamp, omit } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { get, update } from '@utils/kv'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { TopicId } from '@types'
import { Params } from './types'

const NAMESPACE = 'ScreenBlog'

const EXCLUDE_STATE = {
  /** 回复框 placeholder */
  placeholder: '',

  /** 回复框 value */
  value: '',

  /** 存放 bgm 特有的子回复配置字符串 */
  replySub: '',

  /** 存放子回复 html */
  message: '',

  /** 云快照 */
  ota: {},
  showHeaderTitle: false
}

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenBlog extends store {
  params: Params

  state = observable({
    ...EXCLUDE_STATE,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(this.namespace)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchBlog()
  }

  // -------------------- fetch --------------------
  /** 获取日志内容和留言 */
  fetchBlog = async () => {
    this.fetchThirdParty()

    const { blog } = await rakuenStore.fetchBlog({
      blogId: this.blogId
    })

    if (
      blog.title &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= 60 * 60 * 24 * 7) this.updateThirdParty()
    }

    return blog
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.blog._loaded) {
      const data = await get(this.thirdPartyKey)
      if (!data) {
        // 就算没有数据也插入 key, 用于判断是否需要更新云数据
        this.setState({
          ota: {
            [this.thirdPartyKey]: {
              _loaded: 0
            }
          }
        })
        return
      }

      this.setState({
        ota: {
          [this.thirdPartyKey]: {
            ...data,
            _loaded: getTimestamp()
          }
        }
      })
    }
  }

  /** 上传预数据 */
  updateThirdParty = async () => {
    if (THIRD_PARTY_UPDATED.includes(this.thirdPartyKey)) return

    setTimeout(() => {
      update(this.thirdPartyKey, {
        ...omit(this.blog, ['formhash'])
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  // -------------------- get --------------------
  @computed get blogId() {
    const { blogId = '' } = this.params
    if (!blogId) return '0'
    return String(blogId).split('#')[0]
  }

  /** 需要跳转到的楼层 id */
  @computed get postId() {
    const { blogId = '' } = this.params
    const [, postId] = String(blogId).split('#post_')
    return postId
  }

  @computed get namespace() {
    return `${NAMESPACE}|${this.blogId}`
  }

  /** 日志内容 */
  @computed get blog() {
    const blog = rakuenStore.blog(this.blogId)
    if (!blog._loaded) return this.ota || {}

    return blog
  }

  /** 日志回复 */
  @computed get comments() {
    return rakuenStore.blogComments(this.blogId)
  }

  /** 是否登录 (web) */
  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  @computed get readed() {
    return true
  }

  /** 自己用户 Id (改过后的) */
  @computed get myId() {
    return userStore.myId
  }

  /** 我的好友 userId 哈希映射 */
  @computed get myFriendsMap() {
    return usersStore.myFriendsMap
  }

  /** 超展开设置 */
  @computed get setting() {
    return rakuenStore.setting
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `blog_${this.blogId}`
  }

  // -------------------- get: cdn fallback --------------------
  @computed get title() {
    return this.blog.title || this.params._title || ''
  }

  @computed get time() {
    return this.blog.time || this.params._time || ''
  }

  @computed get avatar() {
    return this.blog.avatar || this.params._avatar || ''
  }

  @computed get userId() {
    return this.blog.userId || this.params._userId || ''
  }

  @computed get userName() {
    return this.blog.userName || this.params._userName || ''
  }

  @computed get userSign() {
    return this.blog.userSign || ''
  }

  @computed get html() {
    return this.blog.message || ''
  }

  @computed get isUGCAgree() {
    return systemStore.isUGCAgree
  }

  // -------------------- page --------------------
  /** 显示评论框 */
  showFixedTextarea = (placeholder: any, replySub: any, message?: any) => {
    t('日志.显示评论框', {
      blogId: this.blogId
    })

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
  onChange = value => {
    this.setState({
      value
    })
  }

  /** 失败后恢复上次的内容 */
  recoveryContent = (content: string) => {
    t('日志.回复失败', {
      blogId: this.blogId
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

  updateShowHeaderTitle = (showHeaderTitle: boolean) => {
    this.setState({
      showHeaderTitle
    })
  }

  // -------------------- action --------------------
  /** 提交回复 */
  doSubmit = (content: string) => {
    const { replySub } = this.state
    if (replySub) {
      this.doReplySub(content)
      return
    }
    this.doReply(content)
  }

  /** 回复 */
  doReply = (content: string) => {
    t('日志.回复', {
      blogId: this.blogId,
      sub: false
    })

    const { formhash } = this.blog

    rakuenStore.doReplyBlog(
      {
        blogId: this.blogId.match(/\d+/g)[0] as TopicId,
        content,
        formhash
      },
      responseText => {
        let res: { status?: string } = {}
        try {
          res = JSON.parse(responseText)
        } catch (error) {}

        if (IOS && res.status !== 'ok') {
          this.recoveryContent(content)
        } else {
          this.setState({
            value: ''
          })
        }

        feedback()
        this.fetchBlog()
      }
    )
  }

  /** 回复子回复 */
  doReplySub = (content: string) => {
    t('日志.回复', {
      blogId: this.blogId,
      sub: true
    })

    const { placeholder, replySub, message } = this.state
    const { formhash } = this.blog

    const [, blogId, related, , subReplyUid, postUid] = replySub.split(',')
    let _content = content
    if (message) {
      const _message = decoder(message).replace(
        /<div class="quote"><q>.*<\/q><\/div>/,
        ''
      )
      _content = `[quote][b]${placeholder}[/b] 说: ${removeHTMLTag(
        _message
      )}[/quote]\n${content}`
    }
    rakuenStore.doReplyBlog(
      {
        content: _content,
        formhash,
        blogId: blogId as TopicId,
        related,
        sub_reply_uid: subReplyUid,
        post_uid: postUid
      },
      responseText => {
        let res: { status?: string } = {}
        try {
          res = JSON.parse(responseText)
        } catch (error) {}

        if (IOS && res.status !== 'ok') {
          this.recoveryContent(content)
        } else {
          this.setState({
            value: ''
          })
        }

        feedback()
        this.fetchBlog()
      }
    )
  }

  /** 删除回复 */
  doDeleteReply = (url: string) => {
    if (!url) return

    t('日志.删除回复', {
      blogId: this.blogId
    })

    rakuenStore.doDeleteReplyBlog(
      {
        url: `${HOST}/${url}`
      },
      () => {
        feedback()
        info('已删除')
        this.fetchBlog()
      }
    )
  }
}
