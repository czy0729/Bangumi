/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:37:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-11 17:29:38
 */
import { observable, computed } from 'mobx'
import { monoStore } from '@stores'
import store from '@utils/store'
import { get, update } from '@utils/kv'
import { HTML_SUBJECT_PERSONS, LIST_EMPTY } from '@constants'
import { Params } from './types'
import { getTimestamp } from '@utils'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenPersons extends store {
  params: Params

  state = observable({
    /** 云快照 */
    ota: {}
  })

  init = () => {
    return this.fetchPersons()
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId = '' } = this.params
    return subjectId
  }

  /** 更多制作人员 */
  @computed get persons() {
    const persons = monoStore.persons(this.subjectId)
    if (!persons._loaded) {
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

    return persons
  }

  @computed get url() {
    return HTML_SUBJECT_PERSONS(this.subjectId)
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `persons_${this.subjectId}`
  }

  // -------------------- fetch --------------------
  /** 更多制作人员 */
  fetchPersons = async () => {
    this.fetchThirdParty()

    const data = await monoStore.fetchPersons({
      subjectId: this.subjectId
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
    if (!this.ota && !this.persons._loaded) {
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
        list: this.persons.list
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }
}
