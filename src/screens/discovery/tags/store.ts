/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:48:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 09:03:19
 */
import { computed, observable } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { getTimestamp, x18s } from '@utils'
import { t } from '@utils/fetch'
import { get, update } from '@utils/kv'
import store from '@utils/store'
import { HTML_TAGS, LIST_EMPTY } from '@constants'
import { SubjectType } from '@types'
import { EXCLUDE_STATE, NAMESPACE, STATE, TABS } from './ds'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenTags extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchList(this.type, true)
  }

  // -------------------- fetch --------------------
  /** 标签 */
  fetchList = async (type: SubjectType, refresh: boolean = false) => {
    if (refresh) this.fetchThirdParty()

    const { filter } = this.state
    const data = await discoveryStore.fetchTags(
      {
        type,
        filter
      },
      refresh
    )

    if (
      data.list.length &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= 60 * 60 * 24 * 7) this.updateThirdParty()
    }

    return data
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.list(this.type)._loaded) {
      const data = await get(this.thirdPartyKey)
      if (!data) {
        // 就算没有数据也插入 key, 用于判断是否需要更新云数据
        this.setState({
          ota: {
            [this.thirdPartyKey]: {
              list: [],
              _loaded: 0
            }
          }
        })
        return
      }

      this.setState({
        ota: {
          [this.thirdPartyKey]: {
            ...data,
            _loaded: getTimestamp()
          }
        }
      })
    }
  }

  /** 上传预数据 */
  updateThirdParty = async () => {
    if (THIRD_PARTY_UPDATED.includes(this.thirdPartyKey)) return

    setTimeout(() => {
      update(this.thirdPartyKey, {
        list: this.list(this.type).list
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  // -------------------- get --------------------
  @computed get type() {
    return TABS[this.state.page].key
  }

  @computed get url() {
    return HTML_TAGS(this.type, this.state.page, this.state.filter)
  }

  @computed get thirdPartyKey() {
    const query = [this.type, this.state.filter].join('_')
    return `tags_${query}`
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  /** 标签 */
  list(type: SubjectType) {
    return computed(() => {
      const tags = discoveryStore.tags(type, this.state.filter)
      if (!tags._loaded) {
        return this.ota
          ? {
              ...this.ota,
              pagination: {
                page: 1,
                pageTotal: 10
              }
            }
          : LIST_EMPTY
      }

      if (userStore.isLimit) {
        return {
          ...tags,
          list: tags.list.filter(item => !x18s(item.name))
        }
      }
      return tags
    }).get()
  }

  // -------------------- page --------------------
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('标签索引.标签页切换')
    this.setState({
      page
    })
    this.tabChangeCallback(page)
    this.setStorage(NAMESPACE)
  }

  onValueChange = (title: string) => {
    this.setState({
      rec: title === '排名'
    })
    this.setStorage(NAMESPACE)
  }

  /** 标签页切换回调 */
  tabChangeCallback = (page: number) => {
    const { key } = TABS[page]
    const { _loaded } = this.list(key)

    if (!_loaded) this.fetchList(key, true)
  }

  /** 筛选输入框改变 */
  onFilterChange = (ipt: string) => {
    const _ipt = ipt.trim()
    if (!_ipt) {
      this.setState({
        ipt: _ipt,
        filter: ''
      })
      return
    }

    this.setState({
      ipt: _ipt
    })
  }

  /** 输入法键盘按钮提交 */
  onSubmitEditing = () => {
    const { ipt } = this.state
    if (ipt && ipt.length) {
      this.setState({
        filter: ipt
      })
      this.fetchList(this.type, true)
      this.setStorage(NAMESPACE)
    }
  }
}
