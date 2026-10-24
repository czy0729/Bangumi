/*
 * @Author: czy0729
 * @Date: 2024-06-21 05:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 回复动作: 提交 / 编辑 / 子回复 / 删除
 */
import { rakuenStore } from '@stores'
import { feedback, info, removeHTMLTag } from '@utils'
import { t } from '@utils/fetch'
import { decodeHTMLEntities } from '@utils/thirdParty/html'
import { HOST, IOS } from '@constants'
import Ui from './ui'

import type { Id, TopicId } from '@types'

export default class Reply extends Ui {
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
        } catch {}

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
      const _message = decodeHTMLEntities(message).replace(
        /<div class="quote"><q>[\s\S]*?<\/q><\/div>/,
        ''
      )
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
        } catch {}

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
