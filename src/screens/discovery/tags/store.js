/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:48:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 13:21:20
 */
import { observable, computed } from 'mobx'
import { discoveryStore, userStore } from '@stores'
import { _ } from '@stores'
import { open } from '@utils'
import store from '@utils/store'
import { x18s } from '@utils/app'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { HTML_TAGS } from '@constants/html'

export const tabs = MODEL_SUBJECT_TYPE.data.map(item => ({
  title: item.title,
  key: item.label
}))
export const H_FILTER = 36 + 2 * _.md

const namespace = 'ScreenTags'
const excludeState = {
  ipt: '',
  filter: '',
  isFocused: true
}

export default class ScreenTags extends store {
  state = observable({
    page: 0,
    ...excludeState,
    _loaded: false
  })

  setParams = navigation => {
    navigation.setParams({
      heatmap: '标签索引.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('标签索引.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open(this.url)
              break

            default:
              break
          }
        }
      }
    })
  }

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    const { _loaded } = this.list(this.type)
    if (!_loaded) return this.fetchList(this.type, true)
    return true
  }

  // -------------------- fetch --------------------
  fetchList = (type, refresh) => {
    const { filter } = this.state
    return discoveryStore.fetchTags(
      {
        type,
        filter
      },
      refresh
    )
  }

  // -------------------- get --------------------
  @computed get type() {
    const { page } = this.state
    return tabs[page].key
  }

  @computed get url() {
    const { page, filter } = this.state
    return HTML_TAGS(this.type, page, filter)
  }

  list(type) {
    return computed(() => {
      const { filter } = this.state
      const tags = discoveryStore.tags(type, filter)
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
  onChange = page => {
    if (page === this.state.page) return

    t('标签索引.标签页切换')
    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const { key } = tabs[page]
    const { _loaded } = this.list(key)

    if (!_loaded) {
      this.fetchList(key, true)
    }
  }

  onFilterChange = ipt => {
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

  onSubmitEditing = () => {
    const { ipt } = this.state
    if (ipt && ipt.length) {
      this.setState({
        filter: ipt
      })
      this.fetchList(this.type, true)
    }
  }
}
