/*
 * @Author: czy0729
 * @Date: 2023-03-31 02:09:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-02 05:30:18
 */
import { HEADER_TRANSITION_HEIGHT } from '@components/header/utils'
import { rakuenStore, systemStore, uiStore } from '@stores'
import { feedback, HTMLDecode, info, loading, removeHTMLTag, updateVisibleBottom } from '@utils'
import CacheManager from '@utils/cache-manager'
import { baiduTranslate, t } from '@utils/fetch'
import { lx, update } from '@utils/kv'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { HOST, IOS } from '@constants'
import { RakuenReplyType } from '@constants/html/types'
import { AnyObject, Fn, Id, ScrollEvent, TopicType } from '@types'
import { getTopicMainFloorRawText } from '../utils'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 缓存用户头像关系 */
  cacheAvatars = () => {
    const { list } = this.comments
    list.forEach(item => {
      const key = `avatar|${item.userId}`
      if (!CacheManager.has(key)) CacheManager.set(key, item.avatar)

      item.sub.forEach(i => {
        const key = `avatar|${i.userId}`
        if (!CacheManager.has(key)) CacheManager.set(i.userId, i.avatar)
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

  /** 显示特别关注相关的回复 */
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
      message: '',
      editPostId: ''
    })
  }

  /** 显示编辑评论框 */
  showFixedTextareaEdit = async (postId: Id, showFixedTextareCallback: Fn) => {
    const value = await rakuenStore.fetchTopicEdit(
      postId,
      String(this.topicId).split('/')?.[0] as TopicType
    )
    if (value === true) {
      info('此楼层不再允许修改，可能已被回复过')
      return
    }

    if (!value) {
      info('未能获取到回复内容，可能授权过期了')
      return
    }

    this.setState({
      value: ''
    })
    setTimeout(() => {
      this.setState({
        editPostId: postId,
        value
      })
      showFixedTextareCallback()
    }, 0)
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

  /** 设置显示头顶吸附标题组件 */
  updateShowHeaderTitle = (showHeaderTitle: boolean) => {
    this.setState({
      showHeaderTitle
    })
  }

  /** 展开的子楼层 */
  toggleExpand = (id: any) => {
    const { expands } = this.state
    this.setState({
      expands: expands.includes(id) ? expands.filter(item => item !== id) : [...expands, id]
    })
    this.save()
  }

  /** 展开的子楼层回调 */
  onExpand = (id: any) => {
    const { expands } = this.state
    if (expands.includes(String(id))) return

    this.toggleExpand(String(id))
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

    const { fixed } = this.state
    if ((fixed && y > HEADER_TRANSITION_HEIGHT) || (!fixed && y <= HEADER_TRANSITION_HEIGHT)) return

    this.setState({
      fixed: y > HEADER_TRANSITION_HEIGHT
    })
  }

  /** 更新是否完成渲染 */
  setRendered = (rendered: boolean) => {
    this.setState({
      rendered
    })
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

    const { replySub, editPostId } = this.state
    if (editPostId) {
      this.doEditReply(editPostId, content)
      return
    }

    if (replySub) {
      this.doReplySub(content, type)
      return
    }

    this.doReply(content, type)
  }

  /** 编辑回复 */
  doEditReply = (postId: Id, content: string) => {
    t('帖子.编辑回复', {
      topicId: this.topicId,
      postId
    })

    const { formhash } = this.topic
    rakuenStore.doEditReply(
      {
        postId,
        topicType: String(this.topicId).split('/')?.[0] as TopicType,
        content,
        formhash
      },
      async () => {
        this.setState({
          value: '',
          editPostId: ''
        })

        await this.fetchTopic()
        feedback()
      }
    )
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
        } catch (error) {}

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
      const _message = decoder(message).replace(/<div class="quote"><q>.*<\/q><\/div>/, '')
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
        topicId: String(topicId || '').trim(),
        related: String(related || '').trim(),
        sub_reply_uid: String(subReplyUid || '').trim(),
        post_uid: String(postUid || '').trim()
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

    const isDeepLX = systemStore.setting.translateEngine === 'deeplx'
    const errorInfo = `翻译${isDeepLX ? '超时' : '失败'}, 请重试`
    let hide: () => void
    try {
      hide = loading()

      const text = getTopicMainFloorRawText(this.title, this.html)
      if (isDeepLX) {
        const response = await lx(text)
        hide()

        if (response) {
          this.setState({
            translateResult: response
          })
          return
        }
      } else {
        const response = await baiduTranslate(text)
        hide()

        const { trans_result: translateResult } = JSON.parse(response)
        if (Array.isArray(translateResult)) {
          this.setState({
            translateResult
          })
          return
        }
      }

      info(errorInfo)
    } catch (error) {
      if (hide) hide()

      info(errorInfo)
    }
  }

  /** 翻译楼层 */
  doTranslateFloor = async (floorId, msg: string) => {
    const { translateResultFloor } = this.state
    if (translateResultFloor[floorId]) return

    t('帖子.翻译内容', {
      floorId
    })

    const isDeepLX = systemStore.setting.translateEngine === 'deeplx'
    const errorInfo = `翻译${isDeepLX ? '超时' : '失败'}, 请重试`
    let hide: () => void
    try {
      hide = loading()

      const text = removeHTMLTag(msg.replace(/<br>/g, '\n'), false)
      if (isDeepLX) {
        const translateResult = await lx(text)
        hide()

        if (translateResult) {
          this.setState({
            translateResultFloor: {
              ...translateResultFloor,
              [floorId]: translateResult.map(item => item.dst).join('\n')
            }
          })
          return
        }
      } else {
        const response = await baiduTranslate(text)
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
      }

      info(errorInfo)
    } catch (error) {
      if (hide) hide()

      info(errorInfo)
    }
  }

  doCompletion = async () => {
    console.log((this.userName, this.title, removeHTMLTag(this.html.replace(/<br>/g, '\n'), false)))
    // const text = await completion(
    //   this.userName,
    //   this.title,
    //   removeHTMLTag(this.html.replace(/<br>/g, '\n'), false)
    // )
    // console.log(text)
  }
}
