/*
 * @Author: czy0729
 * @Date: 2020-01-02 20:28:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 08:18:51
 */
import { observable, computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { date, getTimestamp, HTMLDecode, info, removeHTMLTag, x18s } from '@utils'
import store from '@utils/store'
import { t, queue } from '@utils/fetch'
import { update } from '@utils/kv'
import catalogs from '@assets/json/catalogs.json'
import { Id, SubjectTypeCn } from '@types'
import { TypeLabel } from './types'
import {
  APP_USERID_IOS_AUTH,
  APP_USERID_TOURIST,
  MODEL_SUBJECT_TYPE,
  STORYBOOK
} from '@constants'
import { NAMESPACE, STATE } from './ds'

export default class ScreenCatalog extends store<typeof STATE> {
  state = observable(STATE)

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

    let data: any[]
    if (type === 'advance') {
      data = this.catalogAdvanceFilter.list
    } else {
      data = await discoveryStore.fetchCatalog({
        type,
        page
      })
    }
    queue(data.map(item => () => this.fetchCatalogDetail(item.id)))

    return data
  }

  /** 目录详情 */
  fetchCatalogDetail = async (id: Id) => {
    if (discoveryStore.catalogDetail(id)._loaded) return true

    const oss = discoveryStore.catalogDetailFromOSS(id)
    if (oss?._loaded && oss?.list?.length) return true

    if (!oss?._loaded) {
      const result = await discoveryStore.fetchCatalogDetailFromOSS({
        id
      })
      if (result) return true
    }

    const data = await discoveryStore.fetchCatalogDetail({
      id
    })

    // 因为新账号是访问不到带有 NSFW 条目的目录的, 没有数据的情况不能缓存快照
    if (data?.list?.length) {
      this.updateCatalogDetail({
        ...data,
        id
      })
    }

    return true
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

  // -------------------- get --------------------
  /** 目录 (高级) */
  @computed get catalogAdvance() {
    return catalogs.map(item => {
      // 计算这个目录大部分是什么类型的条目
      let _type: string
      if (item.r >= Math.max(item.a || 0, item.b || 0, item.m || 0, item.g || 0)) {
        _type = 'real'
      } else if (item.g >= Math.max(item.a || 0, item.b || 0, item.m || 0)) {
        _type = 'game'
      } else if (item.m >= Math.max(item.a || 0, item.b || 0)) {
        _type = 'music'
      } else if (item.b >= (item.a || 0)) {
        _type = 'book'
      } else {
        _type = 'anime'
      }

      return {
        id: item.i,
        title: item.t,
        last: item.d,
        anime: item.a || 0,
        book: item.b || 0,
        music: item.m || 0,
        game: item.g || 0,
        real: item.r || 0,
        _type
      }
    })
  }

  /** 目录筛选后 (高级) */
  @computed get catalogAdvanceFilter() {
    const { page, filterType, filterYear, filterKey } = this.state
    let list = this.catalogAdvance
    if (filterType && filterType !== '不限') {
      list = list.filter(
        item => MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item._type) === filterType
      )
    }

    if (filterYear && filterYear !== '不限') {
      if (filterYear === '近1年') {
        const ts = getTimestamp()
        const day = Number(`${Number(date('Y', ts)) - 1}${date('md', ts)}`)
        list = list.filter(item => Number(item.last.replace(/-/g, '')) >= day)
      } else if (filterYear === '近3年') {
        const ts = getTimestamp()
        const day = Number(`${Number(date('Y', ts)) - 3}${date('md', ts)}`)
        list = list.filter(item => Number(item.last.replace(/-/g, '')) >= day)
      } else {
        list = list.filter(item => item.last.includes(filterYear))
      }
    }

    if (filterKey && filterKey !== '不限') {
      list = list.filter(item => item.title.includes(filterKey))
    }

    const limit = 10
    return {
      list: list.slice(limit * (page - 1), limit * page),
      _loaded: true
    }
  }

  /** 目录 */
  @computed get catalog() {
    const { type, page } = this.state
    if (type === 'advance') return this.catalogAdvanceFilter

    const catalog = discoveryStore.catalog(type, page)
    if (userStore.isLimit) {
      return {
        ...catalog,
        list: catalog.list.filter(item => !x18s(item.title))
      }
    }
    return catalog
  }

  /** 是否限制显示 */
  @computed get isLimit() {
    if (STORYBOOK) return false

    const { type } = this.state
    if (type !== 'advance') return false

    if (!userStore.isLogin) return true

    const { id } = userStore.userInfo
    if (!id || id == APP_USERID_TOURIST || id == APP_USERID_IOS_AUTH) return true
  }

  // -------------------- page --------------------
  /** 显示列表 */
  onShow = () => {
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 400)
  }

  /** 切换类型 */
  onToggleType = async (label: TypeLabel) => {
    const { type } = this.state
    if (label) {
      if (label === '最新' && type === '') return
      if (label === '热门' && type === 'collect') return
      if (label === '高级' && type === 'advance') return
    }

    t('目录.切换类型', {
      type: label
    })

    this.setState({
      type: label === '热门' ? 'collect' : label === '高级' ? 'advance' : '',
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
    this.onShow()
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
    this.onShow()
  }

  /** 页码输入框变化 */
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  /** 高级筛选 */
  onFilterChange = (key: string, value: string) => {
    this.setState({
      page: 1,
      show: false,
      ipt: '1',
      [key]: value
    })
    this.onShow()
    this.fetchCatalog()

    t('目录.高级筛选', {
      value: `${key}|${value}`
    })
  }

  /** 切换锁定 */
  onToggleFixed = (key: string) => {
    this.setState({
      [key]: !this.state[key]
    })
    this.setStorage(NAMESPACE)

    t('目录.切换锁定', {
      value: `${key}|${!this.state[key]}`
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
