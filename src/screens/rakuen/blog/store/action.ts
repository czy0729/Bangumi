/*
 * @Author: czy0729
 * @Date: 2024-06-21 05:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 09:09:19
 */
import { toJS } from 'mobx'
import { rakuenStore, systemStore } from '@stores'
import { feedback, getTimestamp, info, removeHTMLTag } from '@utils'
import { t } from '@utils/fetch'
import { completions, get, update } from '@utils/kv'
import { MUSUME_BLOG_PROMPT, MUSUME_PROMPT } from '@utils/kv/ds'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { HOST, IOS } from '@constants'
import { getTopicMainFloorRawText } from '@screens/rakuen/topic/utils'
import { CompletionItem, Fn, Id, TopicId } from '@types'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

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
      message: '',
      editPostId: ''
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

  /** 显示编辑评论框 */
  showFixedTextareaEdit = async (postId: Id, showFixedTextareCallback: Fn) => {
    const value = await rakuenStore.fetchTopicEdit(postId, 'blog')
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

  /** 展开的子楼层 */
  toggleExpand = (id: any) => {
    const { expands } = this.state
    this.setState({
      expands: expands.includes(id) ? expands.filter(item => item !== id) : [...expands, id]
    })
    this.save()
  }

  /** 显示锐评框 */
  showChatModal = () => {
    this.setState({
      chatModalVisible: true
    })
    feedback(true)
  }

  /** 隐藏锐评框 */
  hideChatModal = () => {
    this.setState({
      chatModalVisible: false
    })
  }

  /** 前一个锐评 */
  beforeChat = () => {
    let { index } = this.state.chat
    if (index === -1) return

    if (index === 0) {
      index = this.currentChatValues.length - 1
    } else {
      index -= 1
    }
    this.setState({
      chat: {
        index
      }
    })
    this.save()

    feedback(true)
  }

  /** 后一个锐评 */
  nextChat = () => {
    let { index } = this.state.chat
    if (index === -1) return

    if (index === this.currentChatValues.length - 1) {
      index = 0
    } else {
      index += 1
    }
    this.setState({
      chat: {
        index
      }
    })
    this.save()

    feedback(true)
  }

  // -------------------- action --------------------
  /** 提交回复 */
  doSubmit = (content: string) => {
    const { replySub, editPostId } = this.state
    if (editPostId) {
      this.doEditReply(editPostId, content)
      return
    }

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

  /** 编辑回复 */
  doEditReply = (postId: Id, content: string) => {
    const { formhash } = this.blog
    rakuenStore.doEditReply(
      {
        postId,
        topicType: 'blog',
        content,
        formhash
      },
      async () => {
        this.setState({
          value: '',
          editPostId: ''
        })

        await this.fetchBlog()
        feedback()
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
      const _message = decoder(message).replace(/<div class="quote"><q>.*<\/q><\/div>/, '')
      _content = `[quote][b]${placeholder}[/b] 说: ${removeHTMLTag(_message)}[/quote]\n${content}`
    }
    rakuenStore.doReplyBlog(
      {
        content: _content,
        formhash,
        blogId: String(blogId || '').trim() as TopicId,
        related: String(related || '').trim(),
        sub_reply_uid: String(subReplyUid || '').trim(),
        post_uid: String(postUid || '').trim()
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

  /** 设置收藏 */
  setFavor = async () => {
    const key = `blog/${this.blogId}` as const
    const value = !this.isFavor
    const result = await rakuenStore.setFavorV2(key, value)
    if (result?.code === 200) {
      if (value) {
        const data = {
          avatar: this.avatar,
          userId: this.userId,
          userName: this.userName,
          title: this.title,
          group: '',
          time: this.time
        }

        update(`favor_${key.replace('/', '_')}`, data)
      }
    }
  }

  private _doChatUpdate = false

  /** 锐评 */
  doChat = async (refresh = false) => {
    if (this.state.chatLoading || !this.blog._loaded) return

    t('日志.聊天', {
      blogId: this.blogId
    })

    this.showChatModal()

    const { musumePrompt } = systemStore.setting
    let id = 'completions_blog'
    if (musumePrompt !== 'bangumi') id += `_${musumePrompt}`
    id += `_${this.blogId.replace('/', '_')}`

    const now = getTimestamp()
    if (!this.currentChatValues.length) {
      const data = await get(id)
      if (Array.isArray(data?.data) && data.data.length) {
        this.setState({
          chat: {
            [musumePrompt]: data.data,
            index: 0,
            _loaded: now
          }
        })
        return
      }
    }

    if (!refresh && this.currentChatValues.length) return

    const prompt = `${MUSUME_PROMPT[musumePrompt]}${MUSUME_BLOG_PROMPT}`
    const roleSystem = `你正在和用户一起浏览班友"${this.userName}"发布的日志。请评论：`
    const roleUser = `标题：${getTopicMainFloorRawText(this.title, this.html)}`

    this.setState({
      chatLoading: true
    })
    const value = await completions(prompt, roleSystem, roleUser)
    this.setState({
      chatLoading: false
    })
    feedback()

    if (!value) {
      info('请求超时请重试')
      return
    }

    const newValues: CompletionItem[] = toJS(this.currentChatValues)
    newValues.push({
      text: value,
      userId: this.userId || 0,
      _loaded: now
    })
    if (newValues.length > 10) newValues.shift()

    const { length } = newValues
    this.setState({
      chat: {
        [musumePrompt]: newValues,
        index: length - 1,
        _loaded: now
      }
    })
    this.save()

    // 长度1优先能让快照拥有数据; 长度5可以保证有比较多数据; 长度10为数据最大长度, 如果更新过就不再更新, 否则会一直更新
    if (length === 1 || length === 5 || (length === 10 && !this._doChatUpdate)) {
      update(id, {
        data: newValues
      })
      this._doChatUpdate = true
    }
  }
}
