/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-18 16:33:56
 *
 * @Params: monoId person/{Int}
 * @Params: name   {String}
 */
import { observable, computed } from 'mobx'
import { subjectStore } from '@stores'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HTML_MONO_WORKS } from '@constants/html'
import { MODEL_MONO_WORKS_ORDERBY } from '@constants/model'

const namespace = 'ScreenWorks'
const excludeState = {
  position: '' // 默认全部
}

export default class ScreenWorks extends store {
  state = observable({
    order: MODEL_MONO_WORKS_ORDERBY.getValue('名称'),
    list: true,
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    return this.fetchMonoWorks(true)
  }

  onHeaderRefresh = () => this.fetchMonoWorks(true)

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId
  }

  @computed get monoWorks() {
    return subjectStore.monoWorks(this.monoId)
  }

  @computed get url() {
    const { position, order } = this.state
    return HTML_MONO_WORKS(this.monoId, position, order)
  }

  // -------------------- fetch --------------------
  fetchMonoWorks = refresh => {
    const { position, order } = this.state
    return subjectStore.fetchMonoWorks(
      {
        monoId: this.monoId,
        position,
        order
      },
      refresh
    )
  }

  // -------------------- page --------------------
  onOrderSelect = label => {
    t('作品.排序选择', {
      label
    })

    this.setState({
      order: MODEL_MONO_WORKS_ORDERBY.getValue(label)
    })
    this.fetchMonoWorks(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onFilterSelect = (label, data) => {
    t('作品.职位选择', {
      label: label.split(' ')[0]
    })

    const { value = '' } = data.find(item => item.title === label) || {}
    this.setState({
      position: value
    })
    this.fetchMonoWorks(true)
    this.setStorage(undefined, undefined, namespace)
  }

  toggleList = () => {
    const { list } = this.state
    t('作品.切换布局', {
      list: !list
    })

    this.setState({
      list: !list
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
