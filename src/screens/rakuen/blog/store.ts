/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:16:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:09:12
 */
import { observable, computed } from 'mobx'
import { systemStore, rakuenStore, userStore, usersStore } from '@stores'
import { IOS, HOST } from '@constants'
import { removeHTMLTag, info, feedback } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { Params } from './types'
import { TopicId } from '@types'

const namespace = 'ScreenBlog'

const initState = {
  /** 回复框 placeholder */
  placeholder: '',

  /** 回复框 value */
  value: '',

  /** 存放 bgm 特有的子回复配置字符串 */
  replySub: '',

  /** 存放子回复 html */
  message: '',
  showHeaderTitle: false
}

export default class ScreenBlog extends store {
  params: Params

  state = observable({
    ...initState,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(this.namespace)) || {}
    this.setState({
      ...state,
      ...initState,
      _loaded: true
    })

    return this.fetchBlog()
  }

  // -------------------- fetch --------------------
  /** 获取日志内容和留言 */
  fetchBlog = () => {
    return rakuenStore.fetchBlog({
      blogId: this.blogId
    })
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
    return `${namespace}|${this.blogId}`
  }

  /** 日志内容 */
  @computed get blog() {
    return rakuenStore.blog(this.blogId)
  }

  /** @deprecated 日志内容 (CDN) */
  @computed get blogFormCDN() {
    return rakuenStore.blogFormCDN()
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

  // -------------------- get: cdn fallback --------------------
  @computed get title() {
    return this.blog.title || this.params._title || this.blogFormCDN.title || ''
  }

  @computed get time() {
    return this.blog.time || this.blogFormCDN.time || this.params._time || ''
  }

  @computed get avatar() {
    return this.blog.avatar || this.params._avatar || this.blogFormCDN.avatar || ''
  }

  @computed get userId() {
    return this.blog.userId || this.params._userId || this.blogFormCDN.userId || ''
  }

  @computed get userName() {
    return (
      this.blog.userName || this.params._userName || this.blogFormCDN.userName || ''
    )
  }

  @computed get userSign() {
    return this.blog.userSign || this.blogFormCDN.userSign || ''
  }

  @computed get html() {
    return this.blog.message || this.blogFormCDN.message || ''
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
