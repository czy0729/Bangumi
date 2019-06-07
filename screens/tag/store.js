/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-08 05:09:19
 */
import { observable, computed } from 'mobx'
import { tagStore } from '@stores'
import store from '@utils/store'
import { MODEL_TAG_ORDERBY } from '@constants/model'

const namespace = 'ScreenTag'
const defaultOrder = MODEL_TAG_ORDERBY.getValue('名称')

export default class ScreenTag extends store {
  state = observable({
    order: defaultOrder,
    list: true, // list | grid
    hide: false, // 用于列表置顶
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      hide: false,
      _loaded: true
    })

    return this.fetchTag(true)
  }

  // -------------------- get --------------------
  @computed get tag() {
    const { type, tag } = this.params
    return tagStore.tag(tag, type)
  }

  // -------------------- fetch --------------------
  fetchTag = refresh => {
    const { type, tag } = this.params
    const { order } = this.state
    return tagStore.fetchTag(
      {
        text: tag,
        type,
        order
      },
      refresh
    )
  }

  // -------------------- page --------------------
  onOrderSelect = async label => {
    this.setState({
      order: MODEL_TAG_ORDERBY.getValue(label)
    })
    await this.fetchTag(true)
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
    }, 0)
  }

  toggleList = () => {
    const { list } = this.state
    this.setState({
      list: !list
    })
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
    }, 0)
  }

  // -------------------- action --------------------
}
