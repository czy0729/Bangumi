/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 17:50:43
 */
import { observable, computed } from 'mobx'
import { tagStore, collectionStore, subjectStore, uiStore } from '@stores'
import { feedback, getTimestamp, info } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { MODEL_TAG_ORDERBY, HTML_TAG, LIST_EMPTY } from '@constants'
import { SubjectId, TagOrder } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE, DEFAULT_ORDER } from './ds'
import { Params } from './types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenTag extends store {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    const _state = {
      ...state,

      // order 慎用排名排序, 不然列表数据几乎没区别
      order:
        state.order === MODEL_TAG_ORDERBY.getValue<TagOrder>('排名')
          ? DEFAULT_ORDER
          : state.order,
      ...EXCLUDE_STATE,
      _loaded: true
    }

    const { airtime } = this.params
    if (airtime) _state.airtime = airtime
    this.setState(_state)

    return this.fetchTag(true)
  }

  // -------------------- fetch --------------------
  /** 标签条目 */
  fetchTag = async (refresh?: boolean) => {
    if (refresh) this.fetchThirdParty()

    const { type, tag } = this.params
    const { order, airtime, month } = this.state
    const data = await tagStore.fetchTag(
      {
        text: tag,
        type,
        order,
        airtime: month ? `${airtime}-${month}` : airtime
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
    if (!this.ota && !this.tag._loaded) {
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
        list: this.tag.list.map(({ collected, ...other }) => other)
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchTag(true)
  }

  /** 加载更多 */
  onFooterRefresh = () => {
    // 网页判断不了还有没有下一页, 假如长度小于一页24个, 不请求
    if (this.tag.list.length < 24) return false

    return this.fetchTag()
  }

  // -------------------- get --------------------
  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  /** 标签条目 */
  @computed get tag() {
    const { type, tag } = this.params
    const { airtime, month } = this.state
    return tagStore.tag(tag, type, month ? `${airtime}-${month}` : airtime)
  }

  /** 过滤列表 */
  @computed get list() {
    if (!this.tag._loaded) {
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
    if (collected) return this.tag

    return {
      ...this.tag,
      list: this.tag.list.filter(item => !item.collected)
    }
  }

  /** 网页端地址 */
  @computed get url() {
    const { type, tag } = this.params
    const { order = 'collects', airtime, month } = this.state
    return HTML_TAG(
      encodeURIComponent(tag),
      type,
      order,
      1,
      month ? `${airtime}-${month}` : airtime
    )
  }

  @computed get thirdPartyKey() {
    const { type, tag } = this.params
    const { airtime, month } = this.state
    const query = [tag, type, month ? `${airtime}-${month}` : airtime].join('_')
    return `tag_${query}`
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  // -------------------- page --------------------
  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  resetScrollView = () => {
    this.setState({
      hide: true
    })

    setTimeout(() => {
      this.setState({
        hide: false
      })
      this.setStorage(NAMESPACE)
    }, 0)
  }

  /** 排序选择 */
  onOrderSelect = (label: any) => {
    this.resetScrollView()

    t('用户标签.排序选择', {
      label
    })

    this.setState({
      order: MODEL_TAG_ORDERBY.getValue(label)
    })
    this.fetchTag(true)
  }

  /** 年选择 */
  onAirdateSelect = (airtime: string) => {
    this.resetScrollView()

    t('用户标签.年选择', {
      airtime
    })

    this.setState({
      airtime: airtime === '全部' ? '' : airtime,
      month: ''
    })
    this.fetchTag(true)
  }

  /** 月选择 */
  onMonthSelect = (month: string) => {
    const { airtime } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    this.resetScrollView()

    t('用户标签.月选择', {
      month
    })

    this.setState({
      month: month === '全部' ? '' : month
    })
    this.fetchTag(true)
  }

  /** 切换布局 */
  onToggleList = () => {
    this.resetScrollView()

    const { list } = this.state
    t('用户标签.切换布局', {
      list: !list
    })

    this.setState({
      list: !list
    })
  }

  /** 切换固定 */
  onToggleFixed = () => {
    const { fixed } = this.state

    this.setState({
      fixed: !fixed
    })
    this.setStorage(NAMESPACE)
  }

  /** 切换显示收藏 */
  onToggleCollected = () => {
    const { collected } = this.state

    this.setState({
      collected: !collected
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
    uiStore.callWebhookCollection(values)
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
