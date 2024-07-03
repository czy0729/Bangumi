/*
 * @Author: czy0729
 * @Date: 2024-06-21 05:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-03 10:35:03
 */
import { rakuenStore } from '@stores'
import { feedback, info, removeHTMLTag } from '@utils'
import { t } from '@utils/fetch'
import { update } from '@utils/kv'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { HOST, IOS } from '@constants'
import { Fn, Id, TopicId } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
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
}
