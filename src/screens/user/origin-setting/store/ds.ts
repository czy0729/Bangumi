/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:09:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * Store 命名空间、初始状态与不落库的瞬时状态
 */
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'
import type { Data, EditItem, Keys } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

/** 空的编辑表单项 */
export const EMPTY_EDIT_ITEM: EditItem = {
  id: '',
  uuid: '',
  name: '',
  url: '',
  sort: 0,
  active: 1
}

export const EXCLUDE_STATE = {
  data: {
    /** 预设数据是否启用 */
    base: {} as Data['base'],

    /** 自定义的源头数据 */
    custom: {
      anime: [],
      hanime: [],
      manga: [],
      wenku: [],
      music: [],
      game: [],
      real: []
    } as Data['custom']
  },

  /** 编辑表单 */
  edit: {
    /** 当前编辑的分类, '' 为表单关闭 */
    type: '' as '' | Keys,

    /** 当前编辑的条目 */
    item: { ...EMPTY_EDIT_ITEM }
  }
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 是否显示所有项 */
  active: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
