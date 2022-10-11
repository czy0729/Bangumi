/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-11 19:56:49
 */
import { observable, computed } from 'mobx'
import { subjectStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { HTML_MONO_VOICES, LIST_EMPTY } from '@constants'
import { NAMESPACE, EXCLUDE_STATE } from './ds'
import { Params } from './types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenVoices extends store {
  params: Params

  state = observable({
    ...EXCLUDE_STATE,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchMonoVoices()
  }

  onHeaderRefresh = () => {
    return this.fetchMonoVoices()
  }

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId } = this.params
    return monoId
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    const { position } = this.state
    const query = [this.monoId, position].join('_')
    return `voices_${query}`.replace('/', '_')
  }

  /** 人物饰演的角色 */
  @computed get monoVoices() {
    const monoVoices = subjectStore.monoVoices(this.monoId)
    if (!monoVoices._loaded) {
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

    return monoVoices
  }

  @computed get url() {
    const { position } = this.state
    return HTML_MONO_VOICES(this.monoId, position)
  }

  // -------------------- fetch --------------------
  /** 人物角色 */
  fetchMonoVoices = async () => {
    this.fetchThirdParty()

    const { position } = this.state
    const data = await subjectStore.fetchMonoVoices({
      monoId: this.monoId,
      position
    })

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
    if (!this.ota && !this.monoVoices._loaded) {
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
        list: this.monoVoices.list.slice(0, 24)
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  // -------------------- page --------------------
  /** 职位选择 */
  onFilterSelect = async (label: string, data: any[]) => {
    t('角色.职位选择', {
      label: label.split(' ')[0]
    })

    const { value = '' } = data.find(item => item.title === label) || {}
    this.setState({
      position: value
    })

    this.fetchMonoVoices()
    this.setStorage(NAMESPACE)
  }
}
