/*
 * @Author: czy0729
 * @Date: 2026-10-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 帖子回复相关动作
 */
import { rakuenStore } from '@stores'
import { decodeHTMLEntities, feedback, info, removeHTMLTag } from '@utils'
import { t } from '@utils/fetch'
import { HOST, IOS } from '@constants'
import i18n from '@constants/i18n'
import Fetch from './fetch'

import type { Id, TopicType } from '@types'
import type { RakuenReplyType } from '@constants/html/types'

export default class Reply extends Fetch {
  /** 显示评论框 */
  showFixedTextarea = (username: string, replySub: string, message: string) => {
    t('帖子.显示评论框', {
      topicId: this.topicId
    })

    let placeholder = '回复'
    if (username) placeholder += ` ${username}`
    if (message) {
      const _message = decodeHTMLEntities(message).replace(
        /<div class="quote"><q>[\s\S]*?<\/q><\/div>/,
        ''
      )
      let comment = decodeHTMLEntities(removeHTMLTag(_message, false))
      if (comment.length >= 64) comment = `${comment.slice(0, 64)}...`
      if (comment) placeholder += ` 说：${comment}`
    }

    this.setState({
      placeholder,
      replyUsername: username,
      replySub,
      message
    })
  }

  /** 收起评论框 */
  closeFixedTextarea = () => {
    this.setState({
      placeholder: '',
      replyUsername: '',
      replySub: '',
      message: '',
      editPostId: ''
    })
  }

  /** 显示编辑评论框 */
  showFixedTextareaEdit = async (postId: Id, showFixedTextareCallback: () => void) => {
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
    const { formhash } = this.topic
    if (!formhash) {
      info(`表单验证码为空，${i18n.login()}可能过期了`)
      return
    }

    t('帖子.回复', {
      topicId: this.topicId,
      sub: false
    })

    rakuenStore.doReply(
      {
        type,
        topicId: this.topicId.match(/\d+/g)[0],
        content,
        formhash
      },
      responseText => {
        let res: { status?: string } = {}
        try {
          res = JSON.parse(responseText) as { status?: string }
        } catch {}

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
    const { formhash } = this.topic
    if (!formhash) {
      info(`表单验证码为空，${i18n.login()}可能过期了`)
      return
    }

    t('帖子.回复', {
      topicId: this.topicId,
      sub: true
    })

    const { replyUsername, replySub, message } = this.state
    const [, topicId, related, , subReplyUid, postUid] = replySub.split(',')
    let _content = content
    if (message) {
      const _message = decodeHTMLEntities(message).replace(
        /<div class="quote"><q>[\s\S]*?<\/q><\/div>/,
        ''
      )
      _content = `[quote][b]${replyUsername}[/b] 说: ${removeHTMLTag(
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
        let res: { status?: string } = {}
        try {
          res = JSON.parse(responseText) as { status?: string }
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
}
