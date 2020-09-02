/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-02 16:28:55
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { search } from '@utils/anime'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

const namespace = 'ScreenAnime'

export default class ScreenAnime extends store {
  state = observable({
    query: {
      area: '日本',
      type: '',
      first: '',
      year: 2020,
      begin: '',
      status: '',
      tags: [], // 已支持多选, 不过暂时不开放
      sort: ''
    },
    data: LIST_EMPTY,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    this.search()
    return res
  }

  search = () => {
    const { query } = this.state
    const data = search(query)
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

  // -------------------- page --------------------
  onSelect = (type, value) => {
    const { query } = this.state
    if (type === 'tags') {
      this.setState({
        query: {
          ...query,
          tags: value === '' ? [] : [value]
        }
      })
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

      t('Anime.到顶')
    }
  }
}
