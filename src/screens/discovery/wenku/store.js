/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:44:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-27 11:48:38
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/wenku'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

const namespace = 'ScreenWenku'

export default class ScreenWenku extends store {
  state = observable({
    query: {
      first: '',
      year: 2020,
      status: '',
      anime: '',
      sort: ''
    },
    data: LIST_EMPTY,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state
    })

    await init()
    this.search()
    this.setState({
      _loaded: true
    })

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
    this.setState({
      query: {
        ...query,
        [type]: value
      }
    })

    setTimeout(() => {
      this.search()
      this.setStorage(undefined, undefined, namespace)
      t('文库.选择', {
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

      t('文库.到顶')
    }
  }
}
