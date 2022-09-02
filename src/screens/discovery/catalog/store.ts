/*
 * @Author: czy0729
 * @Date: 2020-01-02 20:28:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 14:15:26
 */
import { observable, computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { info, x18s } from '@utils'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'
import { Id } from '@types'

const NAMESPACE = 'ScreenCatalog'

export default class ScreenCatalog extends store {
  state = observable({
    type: '' as '' | 'collect' | 'me',
    page: 1,
    show: true,
    ipt: '1',
    _loaded: false
  })

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: true
    })

    return this.fetchCatalog()
  }

  // -------------------- fetch --------------------
  /** 目录 */
  fetchCatalog = async () => {
    const { type, page } = this.state
    const data = await discoveryStore.fetchCatalog({
      type,
      page
    })

    queue(data.map(item => () => this.fetchCatalogDetail(item.id)))

    return data
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    const { _loaded } = discoveryStore.catalogDetail(id)
    if (_loaded) return true

    return discoveryStore.fetchCatalogDetail({
      id
    })
  }

  // -------------------- get --------------------
  /** 目录 */
  @computed get catalog() {
    const { type, page } = this.state
    const catalog = discoveryStore.catalog(type, page)
    if (userStore.isLimit) {
      return {
        ...catalog,
        list: catalog.list.filter(item => !x18s(item.title))
      }
    }
    return catalog
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  // -------------------- page --------------------
  /** 切换类型 */
  onToggleType = async (label: '热门' | '最新') => {
    const { type } = this.state

    // 是否热门
    const isCollect = type === 'collect'
    if (label) {
      if (label === '热门' && isCollect) return
      if (label === '最新' && type === '') return
    }

    t('目录.切换类型', {
      type: isCollect ? '最新' : '热门'
    })

    this.setState({
      type: isCollect ? '' : 'collect',
      page: 1,
      ipt: '1',
      show: false
    })

    await this.fetchCatalog()
    this.setState({
      show: true
    })
    this.setStorage(NAMESPACE)
  }

  /** 上一页 */
  onPrev = async () => {
    const { page } = this.state
    if (page === 1) return

    t('目录.上一页', {
      page: page - 1
    })

    this.setState({
      page: page - 1,
      show: false,
      ipt: String(page - 1)
    })
    this.fetchCatalog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 400)
  }

  /** 下一页 */
  onNext = async () => {
    const { page } = this.state
    t('目录.下一页', {
      page: page + 1
    })

    this.setState({
      page: page + 1,
      show: false,
      ipt: String(page + 1)
    })
    this.fetchCatalog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 400)
  }

  /** 页码输入框变化 */
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  // -------------------- action --------------------
  /** 页码跳转 */
  doSearch = () => {
    const { ipt } = this.state
    const _ipt = ipt === '' ? 1 : parseInt(ipt)
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    t('目录.页码跳转', {
      page: _ipt
    })

    this.setState({
      page: _ipt,
      show: false,
      ipt: String(_ipt)
    })
    this.fetchCatalog()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 400)
  }
}
