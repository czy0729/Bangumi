/*
 * @Params: { _tags: [] }
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 06:51:09
 */
import React from 'react'
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/subject/anime'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import Extra from './extra'

const namespace = 'ScreenAnime'
let _loaded = false

export default class ScreenAnime extends store {
  state = observable({
    query: {
      area: '日本',
      type: '',
      first: '',
      year: 2022,
      begin: '',
      status: '',
      tags: [], // 已支持多选
      official: '',
      sort: '上映时间'
    },
    data: LIST_EMPTY,
    layout: 'list', // list | grid
    expand: false,
    _loaded: false
  })

  setParams = navigation => {
    navigation.setParams({
      extra: <Extra $={this} />
    })
  }

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      _loaded
    })

    if (!_loaded) await init()
    _loaded = true
    this.setState({
      _loaded: true
    })

    const { _tags = [] } = this.params
    if (_tags.length) this.initQuery(_tags)

    this.search()
    collectionStore.fetchUserCollectionsQueue(false)
  }

  search = passQuery => {
    const { query } = this.state
    const data = search(passQuery || query)
    this.setState({
      data
    })
  }

  // -------------------- get --------------------
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
    const { query } = this.state
    this.setState({
      expand: true,
      query: {
        ...query,
        tags
      }
    })
  }

  onSelect = (type, value, multiple = false) => {
    const { query } = this.state
    if (type === 'tags') {
      const { tags = [] } = query

      if (multiple) {
        // 标签支持多选
        this.setState({
          query: {
            ...query,
            tags:
              value === ''
                ? []
                : tags.includes(value)
                ? tags.filter(item => value !== item)
                : [...tags, value]
          }
        })
      } else {
        this.setState({
          query: {
            ...query,
            tags: value === '' ? [] : [value]
          }
        })
      }
    } else {
      this.setState({
        query: {
          ...query,
          [type]: value
        }
      })
    }

    setTimeout(() => {
      this.search()
      this.setStorage(undefined, undefined, namespace)
      t('Anime.选择', {
        type,
        value,
        multiple
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

      t('Anime.到顶')
    }
  }

  /**
   * 切换布局
   */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('Anime.切换布局', {
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
