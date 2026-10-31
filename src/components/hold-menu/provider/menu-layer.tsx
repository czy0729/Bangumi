/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:32:51
 */
import { useContext, useEffect } from 'react'
import { Portal } from '@components/portal'
import { MENU_PORTAL_PRIORITY_BACKDROP, MENU_PORTAL_PRIORITY_MENU } from '../ds'
import Backdrop from '../backdrop'
import { MenuParamsContext, MenuShowContext, useHoldMenu, useHoldMenuParams } from '../context'
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
  const { close } = useHoldMenu()

  // 兜底: 遮罩已展开但菜单内容失效时立即收起, 避免残留空菜单与点不掉的遮罩
  useEffect(() => {
    if (show && !menuParams.params) close()
  }, [show, menuParams.params, close])

  /**
   * 收起动画结束后直接卸载视觉层
   *  - 常驻挂载时, 若关闭动画被页面转场打断, 遮罩/菜单会定格在屏幕上且无法再交互 (只能杀进程)
   *  - 卸载后即使上一轮动画卡住也不留下任何像素; 代价是下次展开首帧没有预热好的毛玻璃
   */
  const visible = show || !!menuParams.params
  if (!visible) return null

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
