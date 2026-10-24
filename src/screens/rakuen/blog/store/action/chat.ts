/*
 * @Author: czy0729
 * @Date: 2026-10-23 11:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 锐评: 云快照读取与 AI 生成
 */
import { toJS } from 'mobx'
import { systemStore } from '@stores'
import { feedback, getTimestamp, info } from '@utils'
import { ensureArrayLimit } from '@utils/cache'
import { t } from '@utils/fetch'
import { generate, get, update } from '@utils/kv'
import { MUSUME_BLOG_PROMPT, MUSUME_PROMPT } from '@utils/kv/ds'
import Favor from './favor'

import type { ResultData } from '@utils/kv/type'
import type { CompletionItem } from '@types'

/** AI 聊天记录上限 */
const CHAT_VALUES_MAX = 10

export default class Chat extends Favor {
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
      const data = await get<ResultData<{ data: CompletionItem[] }>>(id)
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

    const prompt =
      musumePrompt !== 'bangumi' ? `${MUSUME_PROMPT[musumePrompt]}${MUSUME_BLOG_PROMPT}` : undefined

    this.setState({
      chatLoading: true
    })
    const value = await generate('blog', this.blogId, refresh, prompt)
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
