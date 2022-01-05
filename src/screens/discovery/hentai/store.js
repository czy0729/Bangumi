/*
 * @Params: { _tags: [] }
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 06:59:00
 */
import React from 'react'
import { observable, computed } from 'mobx'
import { userStore, systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search, getTagType, HENTAI_TAGS } from '@utils/subject/hentai'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import Extra from '../anime/extra'

const namespace = 'ScreenHentai'
let _loaded = false

export default class ScreenHentai extends store {
  state = observable({
    query: {
      first: '',
      year: 2021,
      chara: '',
      job: '',
      body: '',
      content: '',
      sort: '上映时间'
    },
    data: LIST_EMPTY,
    layout: 'list', // list | grid
    expand: false,
    _loaded: false
  })

  setParams = navigation => {
    navigation.setParams({
      extra: <Extra $={this} title='Hentai' />
    })
  }

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded
    })

    if (!_loaded) {
      await init()
    }

    const { _tags = [] } = this.params
    if (_tags.length) {
      this.initQuery(_tags)
    }

    _loaded = true
    this.setState({
      _loaded: true
    })

    this.search()
    collectionStore.fetchUserCollectionsQueue(false)
    return res
  }

  search = passQuery => {
    const { query } = this.state
    const data = search(passQuery || query)
    this.setState({
      data
    })
  }

  // -------------------- get --------------------
  @computed get access() {
    return !userStore.isLimit && systemStore?.ota?.HENTAI
  }

  @computed get isLogin() {
    return userStore.isLogin
  }

  @computed get cnFirst() {
    return systemStore.setting.cnFirst
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  @computed get isList() {
    const { layout } = this.state
    return layout === 'list'
  }

  // -------------------- page --------------------
  initQuery = (tags = []) => {
    this.setState({
      expand: true
    })

    tags.forEach(item => {
      const { query } = this.state
      this.setState({
        query: {
          ...query,
          [getTagType(item)]: HENTAI_TAGS[item]
        }
      })
    })
  }

  onSelect = (type, value) => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        [type]: value
      }
    })

    setTimeout(() => {
      this.search()
      this.setStorage(undefined, undefined, namespace)
      t('Hentai.选择', {
        type,
        value
      })
    }, 0)
  }

  scrollToOffset = null
  scrollToTop = () => {
    if (typeof this.scrollToOffset === 'function') {
      this.scrollToOffset({
        x: 0,
        y: 0,
        animated: true
      })

      t('Hentai.到顶')
    }
  }

  /**
   * 切换布局
   */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('Hentai.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.setStorage(undefined, undefined, namespace)
  }

  onExpand = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
