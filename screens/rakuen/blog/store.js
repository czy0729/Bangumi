/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:16:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-04 10:48:51
 */
import { observable, computed } from 'mobx'
import {
  systemStore,
  rakuenStore,
  subjectStore,
  userStore,
  usersStore
} from '@stores'
import { IOS, HOST } from '@constants'
import store from '@utils/store'
import { removeHTMLTag } from '@utils/html'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import decoder from '@utils/thirdParty/html-entities-decoder'

const namespace = 'ScreenBlog'
const initState = {
  placeholder: '', // 回复框placeholder
  value: '', // 回复框value
  replySub: '', // 存放bgm特有的子回复配置字符串
  message: '' // 存放子回复html
}

export default class ScreenBlog extends store {
  state = observable({
    ...initState,
    filterMe: false,
    filterFriends: false,
    reverse: false,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, this.namespace)
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
    return blogId.split('#')[0]
  }

  /**
   * 需要跳转到的楼层id
   */
  @computed get postId() {
    const { blogId = '' } = this.params
    const [, postId] = blogId.split('#post_')
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
    const comments = rakuenStore.blogComments(this.blogId)
    const { filterMe, filterFriends, reverse } = this.state

    const list = reverse ? comments.list.reverse() : comments.list
    if (filterMe) {
      return {
        ...comments,
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

    // @notice 只显示好友相关评论
    if (filterFriends) {
      return {
        ...comments,
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
      ...comments,
      list
    }
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
    return this.blog.time || this.blogFormCDN.time || ''
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

  // -------------------- page --------------------
  /**
   * 吐槽倒序
   */
  toggleReverseComments = () => {
    const { reverse } = this.state
    t('日志.吐槽倒序', {
      blogId: this.blogId,
      reverse: !reverse
    })

    this.setState({
      reverse: !reverse
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /**
   * 显示与我相关的回复
   */
  toggleFilterMe = () => {
    const { filterMe } = this.state
    t('日志.与我相关', {
      blogId: this.blogId,
      filterMe: !filterMe
    })

    this.setState({
      filterMe: !filterMe,
      filterFriends: false
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /**
   * 显示好友相关的回复
   */
  toggleFilterFriends = () => {
    const { filterFriends } = this.state
    t('日志.好友相关', {
      blogId: this.blogId,
      filterFriends: !filterFriends
    })

    this.setState({
      filterMe: false,
      filterFriends: !filterFriends
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

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

  // -------------------- action --------------------
  /**
   * 提交回复
   */
  doSubmit = content => {
    // const { replySub } = this.state
    // if (replySub) {
    //   this.doReplySub(content)
    //   return
    // }

    // this.doReply(content)
  }

  /**
   * 回复
   */
  doReply = (content, type) => {
    t('日志.回复', {
      blogId: this.blogId,
      sub: false
    })

    const { formhash } = this.blog
    console.log(formhash)
    // rakuenStore.doReplyBlog(
    //   {
    //     type,
    //     blogId: this.blogId.match(/\d+/g)[0],
    //     content,
    //     formhash
    //   },
    //   responseText => {
    //     let res = {}
    //     try {
    //       res = JSON.parse(responseText)
    //     } catch (error) {
    //       // do nothing
    //     }

    //     if (IOS && res.status !== 'ok') {
    //       this.recoveryContent(content)
    //     } else {
    //       this.setState({
    //         value: ''
    //       })
    //     }

    //     this.fetchBlog()
    //   }
    // )
  }

  /**
   * 回复子回复
   */
  doReplySub = (content, type) => {
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
    // rakuenStore.doReplyBlog(
    //   {
    //     type,
    //     content: _content,
    //     formhash,
    //     blogId,
    //     related,
    //     sub_reply_uid: subReplyUid,
    //     post_uid: postUid
    //   },
    //   responseText => {
    //     let res = {}
    //     try {
    //       res = JSON.parse(responseText)
    //     } catch (error) {
    //       // do nothing
    //     }

    //     if (IOS && res.status !== 'ok') {
    //       this.recoveryContent(content)
    //     } else {
    //       this.setState({
    //         value: ''
    //       })
    //     }

    //     this.fetchBlog()
    //   }
    // )
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

    // rakuenStore.doDeleteReplyBlog(
    //   {
    //     url: `${HOST}/${url}`
    //   },
    //   () => {
    //     info('已删除')
    //     this.fetchBlog()
    //   }
    // )
  }
}
