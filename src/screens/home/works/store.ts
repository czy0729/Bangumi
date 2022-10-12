/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-31 20:08:40
 */
import { observable, computed } from 'mobx'
import { collectionStore, subjectStore } from '@stores'
import { feedback, getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { HTML_MONO_WORKS, LIST_EMPTY, MODEL_MONO_WORKS_ORDERBY } from '@constants'
import { SubjectId } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'
import { Params, ToolBarKeys } from './types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenWorks extends store {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchMonoWorks(true)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchMonoWorks(true)
  }

  // -------------------- get --------------------
  /** 人物 Id */
  @computed get monoId() {
    const { monoId } = this.params
    return monoId
  }

  /** 人物作品 */
  @computed get monoWorks() {
    return subjectStore.monoWorks(this.monoId)
  }

  /** 过滤数据 */
  @computed get list() {
    if (!this.monoWorks._loaded) {
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

    const { collected } = this.state
    if (collected) return this.monoWorks

    return {
      ...this.monoWorks,
      list: this.monoWorks.list.filter(item => !item.collected)
    }
  }

  /** 网页地址 */
  @computed get url() {
    const { position, order } = this.state
    return HTML_MONO_WORKS(this.monoId, position, order)
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    const { order, position } = this.state
    const query = [this.monoId, order, position].join('_')
    return `works_${query}`.replace('/', '_')
  }

  // -------------------- fetch --------------------
  /** 人物作品 */
  fetchMonoWorks = async (refresh?: boolean) => {
    this.fetchThirdParty()

    const { position, order } = this.state
    const data = await subjectStore.fetchMonoWorks(
      {
        monoId: this.monoId,
        position,
        order
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

    // 延迟获取收藏中的条目的具体收藏状态
    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue(
        data.list
          .filter(item => item.collected)
          .map(item => String(item.id).replace('/subject/', ''))
      )
    }, 160)

    return data
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.monoWorks._loaded) {
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
        list: this.monoWorks.list.map(({ collected, ...other }) => other)
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  // -------------------- page --------------------
  /** 排序选择 */
  onOrderSelect = (label: string) => {
    t('作品.排序选择', {
      label
    })

    this.setState({
      order: MODEL_MONO_WORKS_ORDERBY.getValue(label)
    })
    this.fetchMonoWorks(true)
    this.setStorage(NAMESPACE)
  }

  /** 职位选择 */
  onFilterSelect = (label: string, data: any[]) => {
    t('作品.职位选择', {
      label: label.split(' ')[0]
    })

    const { value = '' } = data.find(item => item.title === label) || {}
    this.setState({
      position: value
    })
    this.fetchMonoWorks(true)
    this.setStorage(NAMESPACE)
  }

  /** 切换布局 */
  onToggleList = () => {
    const { list } = this.state
    t('作品.切换布局', {
      list: !list
    })

    this.setState({
      list: !list
    })
    this.setStorage(NAMESPACE)
  }

  /** 工具栏 */
  onToggleToolbar = (key: ToolBarKeys) => {
    this.setState({
      [key]: !this.state[key]
    })
    this.setStorage(NAMESPACE)
  }

  /** 管理收藏 */
  doUpdateCollection = async (
    values: Parameters<typeof collectionStore.doUpdateCollection>[0]
  ) => {
    await collectionStore.doUpdateCollection(values)
    feedback()

    const { subjectId } = this.state.modal
    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue([subjectId])
    }, 400)

    this.onCloseManageModal()
  }

  /** 显示收藏管理框 */
  onShowManageModal = args => {
    const { subjectId, title, desc, status, typeCn } = args || {}

    let action = '看'
    if (typeCn === '书籍') action = '读'
    if (typeCn === '音乐') action = '听'
    if (typeCn === '游戏') action = '玩'

    this.setState({
      modal: {
        visible: true,
        subjectId,
        title,
        desc,
        status: status || '',
        action
      }
    })
  }

  /** 隐藏收藏管理框 */
  onCloseManageModal = () => {
    this.setState({
      modal: {
        visible: false
      }
    })

    // 等到关闭动画完成后再重置
    setTimeout(() => {
      this.setState({
        modal: EXCLUDE_STATE.modal
      })
    }, 400)
  }
}
