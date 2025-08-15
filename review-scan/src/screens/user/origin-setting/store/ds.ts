/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:09:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 04:40:42
 */
import { Loaded, Origin } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  data: {
    /** 预设数据是否启用 */
    base: {} as Origin['base'],

    /** 自定义的源头数据 */
    custom: {
      anime: [],
      hanime: [],
      manga: [],
      wenku: [],
      music: [],
      game: [],
      real: []
    } as Origin['custom']
  },

  /** 编辑表单 */
  edit: {
    type: '',
    item: {
      id: '',
      uuid: '',
      name: '',
      url: '',
      sort: 0,
      active: 1
    }
  }
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 是否显示所有项 */
  active: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
