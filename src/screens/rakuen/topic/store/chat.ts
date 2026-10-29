/*
 * @Author: czy0729
 * @Date: 2026-10-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 锐评 (AI 楼层点评) 与相关推荐
 */
import { toJS } from 'mobx'
import { systemStore } from '@stores'
import { feedback, getTimestamp, info } from '@utils'
import { ensureArrayLimit } from '@utils/cache'
import { t } from '@utils/fetch'
import { generate, get, update } from '@utils/kv'
import { MUSUME_EP_PROMPT, MUSUME_PROMPT, MUSUME_TOPIC_PROMPT } from '@utils/kv/ds'
import Translate from './translate'

import type { CompletionItem } from '@types'
import type { GenerateType } from '@utils/kv/type'

/** AI 聊天记录上限 */
const CHAT_VALUES_MAX = 10

export default class Chat extends Translate {
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

  /** 显示相关帖子 */
  showRecommend = () => {
    this.setState({
      recommendVisible: true
    })

    if (!this.state.recommendTopics.list.length) {
      this.fetchRecommendTopics()
    }
  }

  /** 隐藏相关帖子 */
  hideRecommend = () => {
    this.setState({
      recommendVisible: false
    })
  }

  private _doChatUpdate = false

  /** 锐评 */
  doChat = async (refresh: boolean = false) => {
    if (this.state.chatLoading || !this.topic._loaded) return

    t('帖子.聊天', {
      topicId: this.topicId
    })

    this.showChatModal()

    const { musumePrompt } = systemStore.setting
    let id = 'completions_topic'
    if (musumePrompt !== 'bangumi') id += `_${musumePrompt}`
    id += `_${this.topicId.replace('/', '_')}`

    const now = getTimestamp()
    if (!this.currentChatValues.length) {
      const data = await get<{ data?: CompletionItem[] }>(id)
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

    const aiType: GenerateType = this.isEp
      ? 'ep'
      : this.isMono
      ? this.topicId.startsWith('prsn/')
        ? 'person'
        : 'character'
      : this.isTopic
      ? 'group_topic'
      : 'subject_topic'
    const aiId = this.topicId.split('/')[1]
    const prompt =
      musumePrompt !== 'bangumi'
        ? `${MUSUME_PROMPT[musumePrompt]}${this.isEp ? MUSUME_EP_PROMPT : MUSUME_TOPIC_PROMPT}`
        : undefined

    this.setState({
      chatLoading: true
    })
    const value = await generate(aiType, aiId, refresh, prompt)
    this.setState({
      chatLoading: false
    })
    feedback()

    if (!value) {
      info('请求超时，可以过一段时间再试')
      return
    }

    const newValues: CompletionItem[] = toJS(this.currentChatValues)
    newValues.push({
      text: value,
      userId: this.userId || 0,
      _loaded: now
    })
    ensureArrayLimit(newValues, CHAT_VALUES_MAX, true)

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
