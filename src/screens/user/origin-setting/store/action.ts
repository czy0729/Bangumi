/*
 * @Author: czy0729
 * @Date: 2024-09-13 03:43:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 03:46:40
 *
 * 用户操作: 编辑表单、预设/自定义源头的启停与删除、测试跳转
 */
import { toJS } from 'mobx'
import { subjectStore, systemStore } from '@stores'
import { copy, getTimestamp, info, open } from '@utils'
import { t } from '@utils/fetch'
import { TYPES_DS } from '../ds'
import { replaceOriginUrl } from '../utils'
import Computed from './computed'
import { EMPTY_EDIT_ITEM } from './ds'

import type { EditItem, ItemParams, Keys } from '../types'
import type { STATE } from './ds'

export default class Action extends Computed {
  onToggle = () => {
    this.setState({
      active: !this.state.active
    })
    this.save()
  }

  updateOrigin = () => {
    setTimeout(() => {
      subjectStore.updateOrigin(this.state.data)
    }, 0)
  }

  /** 展开编辑表单 */
  openEdit = (type: Keys, item: EditItem) => {
    this.setState({
      edit: {
        type,
        item
      }
    })

    t('自定义源头.编辑表单', {
      type
    })
  }

  /** 展开新增表单 */
  openCreate = (type: Keys) => {
    this.openEdit(type, { ...EMPTY_EDIT_ITEM })
  }

  /** 关闭并清空编辑表单 */
  closeEdit = () => {
    this.setState({
      edit: {
        type: '',
        item: { ...EMPTY_EDIT_ITEM }
      }
    })

    t('自定义源头.关闭表单')
  }

  /** 输入框变化 */
  onChangeText = (key: 'name' | 'url' | 'sort', val: string) => {
    const { edit } = this.state
    const item = { ...edit.item }
    if (key === 'sort') {
      item.sort = isNaN(Number(val)) ? 0 : Number(val)
    } else {
      item[key] = val.trim()
    }

    this.setState({
      edit: {
        ...edit,
        item
      }
    })
  }

  /**
   * 在 data 的 toJS 拷贝上应用一次修改, 写回 state 并同步全局
   *
   * @param apply 对拷贝数据的原地修改
   */
  applyDataChange = (apply: (data: (typeof STATE)['data']) => void) => {
    const _data = toJS(this.state.data)
    apply(_data)

    this.setState({
      data: _data
    })
    this.updateOrigin()
  }

  /** 校验名字与网址必填 */
  validateRequired = (item: EditItem) => {
    if (!item.name) {
      info('名字不能为空')
      return false
    }

    if (!item.url) {
      info('网址不能为空')
      return false
    }

    return true
  }

  /** 保存源头 */
  submitEdit = () => {
    const { type, item } = this.state.edit
    if (!type) return

    const { id, uuid } = item
    const isCreate = id === '' && uuid === ''

    if (isCreate) {
      if (!this.validateRequired(item)) return

      this.applyDataChange(_data => {
        _data.custom[type].push({
          uuid: String(getTimestamp()),
          name: item.name || '',
          url: item.url || '',
          sort: item.sort || 0,
          active: 1
        })
      })
    } else if (id) {
      // 预设项只允许改排序
      this.applyDataChange(_data => {
        _data.base[id] = {
          ..._data.base[id],
          sort: item.sort
        }
      })
    } else {
      if (!this.validateRequired(item)) return

      this.applyDataChange(_data => {
        const findIndex = _data.custom[type].findIndex(i => i.uuid === uuid)
        if (_data.custom[type][findIndex]) {
          _data.custom[type][findIndex] = {
            ..._data.custom[type][findIndex],
            ...item
          }
        }
      })
    }

    this.closeEdit()

    t('自定义源头.保存源头', {
      type
    })
  }

  /** 切换预设/自定义源头启用状态 */
  toggleItem = ({
    id,
    uuid,
    type,
    active
  }: ItemParams & {
    /** 是否启用 */
    active: 0 | 1
  }) => {
    if (id) {
      this.applyDataChange(_data => {
        _data.base[id] = {
          ..._data.base[id],
          active
        }
      })
    } else {
      this.applyDataChange(_data => {
        const find = _data.custom[type].find(i => i.uuid === uuid)
        if (find) find.active = active
      })
    }

    t(active ? '自定义源头.启用源头' : '自定义源头.停用源头', {
      type
    })
  }

  /** 停用源头 */
  disableItem = ({ id, uuid, type }: ItemParams) => {
    if (!type) return

    this.toggleItem({ id, uuid, type, active: 0 })
  }

  /** 启用源头 */
  activeItem = ({ id, uuid, type }: ItemParams) => {
    if (!type) return

    this.toggleItem({ id, uuid, type, active: 1 })
  }

  /** 删除自定义源头 */
  deleteItem = ({ uuid, type }: Pick<ItemParams, 'uuid' | 'type'>) => {
    if (!uuid || !type) return

    this.applyDataChange(_data => {
      _data.custom[type] = _data.custom[type].filter(item => item.uuid !== uuid)
    })
  }

  /** 测试 */
  go = ({ type, url }: { type: Keys; url?: string }) => {
    if (!type || !url) return

    const found = TYPES_DS.find(item => item.type === type)
    if (!found) return

    const _url = replaceOriginUrl(url, found.test)
    if (_url) {
      const { openInfo } = systemStore.setting
      if (openInfo) copy(_url, '已复制地址')
      setTimeout(
        () => {
          try {
            open(_url)
          } catch (error) {
            info('网址解析出错, 请检查')
          }
        },
        openInfo ? 1600 : 0
      )
    }
  }
}
