/*
 * @Author: czy0729
 * @Date: 2023-03-31 02:09:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-17 20:10:28
 */
import { rakuenStore } from '@stores'
import {
  HTMLDecode,
  feedback,
  info,
  loading,
  removeHTMLTag,
  updateVisibleBottom
} from '@utils'
import { t, baiduTranslate } from '@utils/fetch'
import { update } from '@utils/kv'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { IOS, HOST } from '@constants'
import { RakuenReplyType } from '@constants/html/types'
import { AnyObject } from '@types'
import { NAMESPACE } from './ds'
import Fetch from './fetch'

export default class Action extends Fetch {
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

  onExpand = (id: any) => {
    const { expands } = this.state
    if (expands.includes(String(id))) return

    this.toggleExpand(String(id))
  }

  updateDirection = (directIndex: number, directFloor: string = '') => {
    this.setState({
      directIndex,
      directFloor
    })
    this.setStorage(this.namespace)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

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
