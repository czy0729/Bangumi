/*
 * @Author: czy0729
 * @Date: 2022-11-22 22:41:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-25 13:04:07
 */
import { observable, computed, toJS } from 'mobx'
import { subjectStore } from '@stores'
import { desc, getTimestamp, info, open } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { Item, Params } from './types'

export default class ScreenActions extends store {
  params: Params

  state = observable({
    data: {
      data: []
    },
    edit: {
      show: false,
      uuid: '',
      name: '',
      url: '',
      sort: '',
      active: 1
    } as Item,
    _loaded: false
  })

  init = async () => {
    await subjectStore.init('actions')
    const { subjectId } = this.params
    if (!subjectId) return false

    this.setState({
      data: {
        data: subjectStore.actions(subjectId)
      },
      _loaded: true
    })
  }

  // -------------------- get --------------------
  @computed get data() {
    const { data } = this.state
    return data.data
      .sort((a, b) => desc(Number(a.sort) || 0, Number(b.sort) || 0))
      .sort((a, b) => desc(a.active, b.active))
  }

  // -------------------- action --------------------
  /** 输入框变化 */
  onChangeText = (key: string, val: string) => {
    const { edit } = this.state
    let _val: any = val.trim()
    if (key === 'sort') _val = isNaN(Number(_val)) ? '' : Number(_val)

    this.setState({
      edit: {
        ...edit,
        [key]: _val
      }
    })
  }

  /** 保存命令 */
  submitEdit = () => {
    const { edit, data } = this.state
    if (!edit.name) {
      info('描述不能为空')
      return
    }

    if (!edit.url) {
      info('命令不能为空')
      return
    }

    const { uuid } = edit
    const _data = toJS(data)

    // 新增
    if (uuid === '') {
      _data.data.push({
        uuid: getTimestamp(),
        name: edit.name || '',
        url: edit.url || '',
        sort: edit.sort || '',
        active: 1
      })
    } else {
      // 修改
      const index = _data.data.findIndex(i => i.uuid === uuid)
      if (_data.data[index]) {
        _data.data[index] = {
          ..._data.data[index],
          ...edit
        }
      }
    }

    this.setState({
      data: _data
    })

    this.closeEdit()
    this.updateOrigin()

    const { subjectId } = this.params
    t('自定义跳转.保存', {
      subjectId
    })
  }

  /** 展开编辑表单 */
  openEdit = (item: Item) => {
    this.setState({
      edit: {
        ...item,
        show: true
      }
    })

    const { subjectId } = this.params
    t('自定义跳转.编辑表单', {
      subjectId
    })
  }

  /** 关闭并清空编辑表单 */
  closeEdit = () => {
    this.setState({
      edit: {
        show: false,
        uuid: '',
        name: '',
        url: '',
        sort: 0,
        active: 1
      }
    })

    const { subjectId } = this.params
    t('自定义跳转.关闭表单', {
      subjectId
    })
  }

  /** 停用 */
  disableItem = ({ uuid }) => {
    const { data } = this.state
    const _data = toJS(data)

    const find = _data.data.find(i => i.uuid === uuid)
    if (find) find.active = 0

    this.setState({
      data: _data
    })
    this.updateOrigin()

    const { subjectId } = this.params
    t('自定义跳转.停用', {
      subjectId
    })
  }

  /** 启用 */
  activeItem = ({ uuid }) => {
    const { data } = this.state
    const _data = toJS(data)

    const find = _data.data.find(i => i.uuid === uuid)
    if (find) find.active = 1

    this.setState({
      data: _data
    })
    this.updateOrigin()

    const { subjectId } = this.params
    t('自定义跳转.启用', {
      subjectId
    })
  }

  /** 删除 */
  deleteItem = ({ uuid }) => {
    if (!uuid) return

    const { data } = this.state
    const _data = toJS(data)
    _data.data = _data.data.filter(item => item.uuid !== uuid)

    this.setState({
      data: _data
    })
    this.updateOrigin()

    const { subjectId } = this.params
    t('自定义跳转.删除', {
      subjectId
    })
  }

  /** 测试 */
  go = ({ url }) => {
    if (!url) return

    try {
      setTimeout(() => {
        open(url, true)
      }, 1600)
    } catch (error) {
      info('跳转协议解析出错, 请检查')
    }
  }

  /** 数据提交到 store */
  updateOrigin = () => {
    setTimeout(() => {
      const { subjectId } = this.params
      if (!subjectId) return

      subjectStore.updateActions({
        [subjectId]: this.data
      })
    }, 0)
  }
}
