/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-12 07:31:16
 */
import { observable, computed } from 'mobx'
import { subjectStore, discoveryStore } from '@stores'
import { getTimestamp, HTMLDecode, removeHTMLTag } from '@utils'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { HTML_SUBJECT_CATALOGS, LIST_EMPTY } from '@constants'
import { Id } from '@types'
import { Params } from './types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenSubjectCatalogs extends store {
  params: Params

  state = observable({
    /** 云快照 */
    ota: {}
  })

  init = () => {
    return this.fetchSubjectCatalogs(true)
  }

  onHeaderRefresh = () => {
    return this.fetchSubjectCatalogs(true)
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  @computed get url() {
    return HTML_SUBJECT_CATALOGS(this.subjectId)
  }

  @computed get subjectCatalogs() {
    return subjectStore.subjectCatalogs(this.subjectId)
  }

  /** 包含条目的目录 */
  @computed get list() {
    if (!this.subjectCatalogs._loaded) {
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

    return this.subjectCatalogs
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    return `subject-catalogs_${this.subjectId}`
  }

  // -------------------- fetch --------------------
  /** 包含条目的目录 */
  fetchSubjectCatalogs = async (refresh: boolean = false) => {
    if (refresh) this.fetchThirdParty()

    const data = await subjectStore.fetchSubjectCatalogs(
      {
        subjectId: this.subjectId
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

    queue(data.list.map(item => () => this.fetchCatalogDetail(item.id)))
    return true
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    if (
      discoveryStore.catalogDetail(id)._loaded ||
      discoveryStore.catalogDetailFromOSS(id)._loaded
    ) {
      return true
    }

    const result = await discoveryStore.fetchCatalogDetailFromOSS({
      id
    })
    if (result) return true

    const data = await discoveryStore.fetchCatalogDetail({
      id
    })
    this.updateCatalogDetail({
      ...data,
      id
    })

    return true
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.list._loaded) {
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
        list: this.list.list
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  /** 上传目录详情 */
  updateCatalogDetail = data => {
    setTimeout(() => {
      const {
        id,
        title,
        info,
        content,
        avatar,
        nickname,
        userId,
        time,
        collect,
        list
      } = data

      const desc = HTMLDecode(removeHTMLTag(info || content))
      update(`catalog_${id}`, {
        id,
        title,
        info: desc ? desc.slice(0, 40) : '',
        avatar,
        nickname,
        userId,
        time,
        collect,
        list: list
          .filter((item, index: number) => index < 3)
          .map(item => ({
            id: item.id,
            image: item.image,
            title: item.title,
            type: item.type,
            info: item.info,
            comment: item.comment
          })),
        total: list.length
      })
    }, 2000)
  }
}
