/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
import type { MenuItem, Navigation } from '@types'

export type Options = {
  /** 来源 (埋点) */
  from?: 'Btn' | 'More'

  /** 路由对象 (默认取全局引用) */
  navigation?: Navigation

  /** Open 点击 (进入菜单编辑) */
  onOpen?: () => void

  /** 校验通过, 跳转前 (如收起抽屉) */
  onValid?: () => void
}

export type UseMoreMenu = {
  visible: boolean
  all: boolean
  rendered: boolean
  statusBarHeight: number
  bottom: number
  visibleMenus: MenuItem[]
  hiddenMenus: MenuItem[]
}
