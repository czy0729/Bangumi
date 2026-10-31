/*
 * @Author: czy0729
 * @Date: 2024-09-14 07:45:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 自定义跳转页业务逻辑
 */
import { toJS } from 'mobx'
import { subjectStore } from '@stores'
import { getTimestamp, info, open } from '@utils'
import { t } from '@utils/fetch'
import Computed from './computed'
import { DELAY_OPEN, INIT_EDIT } from './ds'

import type { EditKey, Item } from '../types'

export default class Action extends Computed {
  /** 输入框变化 */
  onChangeText = (key: EditKey, val: string) => {
    const { edit } = this.state
    let _val: string | number = val.trim()
    // 清空排序时保持空串, 避免落库成 0 与 '' 两种表示
    if (key === 'sort') _val = _val === '' || isNaN(Number(_val)) ? '' : Number(_val)

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
        sort: edit.sort,
        active: 1
      })
    } else {
      // 修改, 只写回数据字段, 不带上表单的 show
      const index = _data.data.findIndex(i => i.uuid === uuid)
      if (_data.data[index]) {
        _data.data[index] = {
          ..._data.data[index],
          name: edit.name,
          url: edit.url,
          sort: edit.sort,
          active: edit.active
        }
      }
    }

    this.setState({
      data: _data
    })

    this.closeEdit()
    this.updateOrigin()

    t('自定义跳转.保存', {
      subjectId: this.subjectId
    })
  }

  /** 展开新建表单 */
  openCreate = () => {
    this.openEdit(INIT_EDIT)
  }

  /** 展开编辑表单 */
  openEdit = (item: Item) => {
    this.setState({
      edit: {
        ...item,
        show: true
      }
    })

    t('自定义跳转.编辑表单', {
      subjectId: this.subjectId
    })
  }

  /** 关闭并清空编辑表单 */
  closeEdit = () => {
    this.setState({
      edit: {
        ...INIT_EDIT
      }
    })

    t('自定义跳转.关闭表单', {
      subjectId: this.subjectId
    })
  }

  /** 停用 */
  disableItem = ({ uuid }: Pick<Item, 'uuid'>) => {
    const { data } = this.state
    const _data = toJS(data)

    const find = _data.data.find(i => i.uuid === uuid)
    if (find) find.active = 0

    this.setState({
      data: _data
    })
    this.updateOrigin()

    t('自定义跳转.停用', {
      subjectId: this.subjectId
    })
  }

  /** 启用 */
  activeItem = ({ uuid }: Pick<Item, 'uuid'>) => {
    const { data } = this.state
    const _data = toJS(data)

    const find = _data.data.find(i => i.uuid === uuid)
    if (find) find.active = 1

    this.setState({
      data: _data
    })
    this.updateOrigin()

    t('自定义跳转.启用', {
      subjectId: this.subjectId
    })
  }

  /** 删除 */
  deleteItem = ({ uuid }: Pick<Item, 'uuid'>) => {
    if (!uuid) return

    const { data } = this.state
    const _data = toJS(data)
    _data.data = _data.data.filter(item => item.uuid !== uuid)

    this.setState({
      data: _data
    })
    this.updateOrigin()

    t('自定义跳转.删除', {
      subjectId: this.subjectId
    })
  }

  /** 测试 */
  go = ({ url }: Pick<Item, 'url'>) => {
    if (!url) return

    setTimeout(() => {
      try {
        open(url, true)
      } catch (error) {
        info('跳转协议解析出错, 请检查')
      }
    }, DELAY_OPEN)
  }

  /** 数据提交到 store */
  updateOrigin = () => {
    setTimeout(() => {
      if (!this.subjectId) return

      subjectStore.updateActions({
        [this.subjectId]: this.data
      })
    }, 0)
  }
}
