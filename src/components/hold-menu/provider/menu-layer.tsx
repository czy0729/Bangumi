/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:58:43
 */
import { useContext } from 'react'
import { Portal } from '@components/portal'
import { MENU_PORTAL_PRIORITY_BACKDROP, MENU_PORTAL_PRIORITY_MENU } from '../ds'
import Backdrop from '../backdrop'
import { MenuParamsContext, MenuShowContext, useHoldMenuParams } from '../context'
import Menu from '../menu'

/**
 * 菜单体系的顶层容器
 *  - 遮罩与菜单都搬到 Portal 渲染, 并声明高于普通门户 (Modal) 的绘制层级, 保证可见
 *  - 层级顺序 遮罩 < 按钮镜像 < 菜单 (镜像的层级由 hold-item 自己声明)
 *  - Portal 搬迁会脱离 Provider 链, 此处回放各自需要的上下文 (MenuContext 由 Portal 内部回放)
 * */
function MenuLayer() {
  const menuParams = useHoldMenuParams()
  const show = useContext(MenuShowContext)

  return (
    <>
      <Portal priority={MENU_PORTAL_PRIORITY_BACKDROP}>
        <MenuShowContext.Provider value={show}>
          <Backdrop />
        </MenuShowContext.Provider>
      </Portal>

      <Portal priority={MENU_PORTAL_PRIORITY_MENU}>
        <MenuParamsContext.Provider value={menuParams}>
          <Menu />
        </MenuParamsContext.Provider>
      </Portal>
    </>
  )
}

export default MenuLayer
