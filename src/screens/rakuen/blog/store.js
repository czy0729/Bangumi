/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:16:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-18 16:34:58
 */
import { observable, computed } from 'mobx'
import { systemStore, rakuenStore, userStore, usersStore } from '@stores'
import { IOS, HOST } from '@constants'
import store from '@utils/store'
import { removeHTMLTag } from '@utils/html'
import { info, feedback } from '@utils/ui'
import { t } from '@utils/fetch'
import decoder from '@utils/thirdParty/html-entities-decoder'

const namespace = 'ScreenBlog'
const initState = {
  placeholder: '', // 回复框placeholder
  value: '', // 回复框value
  replySub: '', // 存放bgm特有的子回复配置字符串
  message: '', // 存放子回复html
  showHeaderTitle: false
}

export default class ScreenBlog extends store {
  state = observable({
    ...initState,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, this.namespace)) || {}
    this.setState({
      ...state,
      ...initState,
      _loaded: true
    })

    // this.fetchBlogFromCDN()
    return this.fetchBlog()
  }

  // -------------------- fetch --------------------
  fetchBlog = () =>
    rakuenStore.fetchBlog({
      blogId: this.blogId
    })

  /**
   * 私有CDN的日志内容信息
   */
  fetchBlogFromCDN = () => {
    const { setting } = systemStore
    const { _loaded } = this.blogDetail
    if (!setting.cdn || _loaded) {
      return true
    }

    return rakuenStore.fetchBlogFormCDN(this.blogId)
  }

  // -------------------- get --------------------
  @computed get blogId() {
    const { blogId = '' } = this.params
    if (!blogId) {
      return '0'
    }
    return String(blogId).split('#')[0]
  }

  /**
   * 需要跳转到的楼层id
   */
  @computed get postId() {
    const { blogId = '' } = this.params
    const [, postId] = String(blogId).split('#post_')
    return postId
  }

  @computed get namespace() {
    return `${namespace}|${this.blogId}`
  }

  @computed get blog() {
    return rakuenStore.blog(this.blogId)
  }

  @computed get blogFormCDN() {
    return rakuenStore.blogFormCDN(this.blogId)
  }

  @computed get comments() {
    return rakuenStore.blogComments(this.blogId)
  }

  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  @computed get readed() {
    return true
  }

  @computed get myId() {
    return userStore.myId
  }

  @computed get myFriendsMap() {
    return usersStore.myFriendsMap
  }

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
    return (
      this.blog.avatar || this.params._avatar || this.blogFormCDN.avatar || ''
    )
  }

  @computed get userId() {
    return (
      this.blog.userId || this.params._userId || this.blogFormCDN.userId || ''
    )
  }

  @computed get userName() {
    return (
      this.blog.userName ||
      this.params._userName ||
      this.blogFormCDN.userName ||
      ''
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
  /**
   * 显示评论框
   */
  showFixedTextarea = (placeholder, replySub, message) => {
    t('日志.显示评论框', {
      blogId: this.blogId
    })

    this.setState({
      placeholder,
      replySub,
      message
    })
  }

  /**
   * 收起评论框
   */
  closeFixedTextarea = () => {
    this.setState({
      placeholder: '',
      replySub: '',
      message: ''
    })
  }

  /**
   * 输入框变化
   */
  onChange = value => {
    this.setState({
      value
    })
  }

  /**
   * 失败后恢复上次的内容
   */
  recoveryContent = content => {
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

  updateShowHeaderTitle = showHeaderTitle => {
    this.setState({
      showHeaderTitle
    })
  }

  // -------------------- action --------------------
  /**
   * 提交回复
   */
  doSubmit = content => {
    const { replySub } = this.state
    if (replySub) {
      this.doReplySub(content)
      return
    }
    this.doReply(content)
  }

  /**
   * 回复
   */
  doReply = content => {
    t('日志.回复', {
      blogId: this.blogId,
      sub: false
    })

    const { formhash } = this.blog
    rakuenStore.doReplyBlog(
      {
        blogId: this.blogId.match(/\d+/g)[0],
        content,
        formhash
      },
      responseText => {
        let res = {}
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
        this.fetchBlog()
      }
    )
  }

  /**
   * 回复子回复
   */
  doReplySub = content => {
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
        blogId,
        related,
        sub_reply_uid: subReplyUid,
        post_uid: postUid
      },
      responseText => {
        let res = {}
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
        this.fetchBlog()
      }
    )
  }

  /**
   * 删除回复
   */
  doDeleteReply = url => {
    if (!url) {
      return
    }

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
