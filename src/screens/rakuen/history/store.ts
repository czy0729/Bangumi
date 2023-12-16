/*
 * @Author: czy0729
 * @Date: 2019-11-28 17:18:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 06:51:25
 */
import { observable, computed } from 'mobx'
import { rakuenStore, userStore } from '@stores'
import { desc, info } from '@utils'
import store from '@utils/store'
import { gets } from '@utils/kv'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { TopicId } from '@types'
import { NAMESPACE, STATE } from './ds'
import { Types } from './types'

export default class ScreenRakuenHistory extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    await rakuenStore.init('topic')
    await rakuenStore.init('cloudTopic')

    this.setState({
      ...state,
      _loaded: true
    })

    rakuenStore.getFavor()
    // await rakuenStore.downloadFavorTopic()
    // this.sync()

    return state
  }

  // -------------------- get --------------------
  @computed get isLogin() {
    return userStore.isLogin
  }

  /** 需要把 rakuenStore.state.topic 和 rakuenStore.state.cloudTopic key 值合并计算 */
  @computed get keys() {
    const { favor } = this.state
    const { topic, cloudTopic } = rakuenStore.state
    return Array.from(new Set([...Object.keys(topic), ...Object.keys(cloudTopic)]))
      .filter((topicId: TopicId) => {
        // 不知道哪里有问题, 有时会出现 undefined 的 key 值, 过滤掉
        if (!topicId.includes('group/') || topicId.includes('undefined')) return false
        if (!/^group\/(\d+)$/.test(topicId)) return false
        if (favor) return this.isFavor(topicId)
        return true
      })
      .sort((a, b) => desc(parseInt(a.split('/')?.[1]), parseInt(b.split('/')?.[1])))
  }

  @computed get sections() {
    const sections = []
    const map = {}
    this.keys.forEach(item => {
      const target = rakuenStore.state.topic[item] || rakuenStore.state.cloudTopic[item]
      if (!target?.title || target?.title === 'undefined') return

      const title = (target.time || '').split(' ')[0]
      if (!(title in map)) {
        map[title] = sections.length
        sections.push({
          title,
          data: []
        })
      }
      sections[map[title]].data.push({
        topicId: item,
        ...target
      })
    })
    return sections
  }

  /** 是否收藏 */
  isFavor(topicId: TopicId) {
    return computed(() => rakuenStore.favorV2(topicId)).get()
  }

  /** 收藏键值数组 */
  @computed get list(): string[] {
    const { type } = this.state
    const { favorV2 } = rakuenStore.state
    const list = []
    Object.keys(favorV2).map(key => {
      if (favorV2[key]) list.push(key)
    })

    return list
      .filter(item => {
        if (type === '条目') return item.includes('subject/')
        if (type === '章节') return item.includes('ep/')
        if (type === '人物') return item.includes('crt/') || item.includes('prsn/')
        return item.includes('group/')
      })
      .sort((a, b) => desc(parseInt(a.split('/')?.[1]), parseInt(b.split('/')?.[1])))
  }

  /** 云端帖子数据 */
  topic(key: string) {
    return computed(() => {
      return this.state.topics[`favor_${key.replace('/', '_')}`] || null
    }).get()
  }

  // -------------------- page --------------------
  /** 切换收藏 */
  toggleFavor = (label: string) => {
    const { favor } = this.state
    if (label) {
      if (label === '收藏' && favor) return
      if (label === '缓存' && !favor) return
    }

    const nextFavor = !favor
    t('本地帖子.切换收藏', {
      favor: nextFavor
    })

    this.setState({
      favor: nextFavor
    })
    this.setStorage(NAMESPACE)
  }

  /** 加载一页云端帖子数据 */
  onPage = async (data: string[]) => {
    if (!data.length) return true

    const keys = []
    data.forEach(item => {
      const key = `favor_${item.replace('/', '_')}`
      keys.push(key)
    })

    if (!keys.length) return true
    const datas = await gets(keys)
    this.setState({
      topics: datas
    })
    this.setStorage(NAMESPACE)
  }

  /** 切换类型 */
  onChange = (title: Types) => {
    this.setState({
      type: title
    })
    this.setStorage(NAMESPACE)
  }

  /** @deprecated 同步到云 */
  sync = () => {
    if (!this.isLogin || !userStore.userInfo.id) {
      info(`云同步需先${i18n.login()}`)
      return
    }

    rakuenStore.uploadFavorTopic()
  }
}
