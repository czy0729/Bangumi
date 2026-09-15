/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:59:25
 */
import { useContext } from 'react'
import { NavigationContext } from '@react-navigation/native'
import { MenuContext } from '@components/hold-menu/context'
import { StoreContext } from '@stores/utils'
import { portal } from './api'
import { usePortalConsumer } from './hooks'
import { PortalContext, PortalHost } from './host'

import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  /** 绘制层级, 越大越上层 (默认 0, 同层级按挂载顺序) */
  priority?: number
}>

function Portal({ children, priority = 0 }: Props) {
  const manager = useContext(PortalContext)

  // Portal 会把内容搬到 App 根部的 Portal.Host 渲染, 脱离屏幕的 StoreContext.Provider 与
  // react-navigation 的 NavigationContext, 在此捕获并回放, 保证 children 内 useStore / useNavigation 可用
  const screenId = useContext(StoreContext)
  const navigation = useContext(NavigationContext)

  /**
   * HoldMenuProvider 挂在 Portal.Host 内部, 菜单上下文同样会脱离
   * 不回放会导致 Modal (基于 Portal 渲染) 内的 Popover / HoldItem 报
   * useHoldMenu must be used within a HoldMenuProvider
   *
   * 只回放 MenuContext: 其 value 由 useMemo 生成且依赖全为稳定引用 (shared value / 回调 / 常量),
   * Portal 订阅它不会被菜单开合触发重渲染;
   * MenuParamsContext 的 value 每次开合都是新对象, 而消费方 (Menu 与 useMenuDragSelect) 都在 Provider 内,
   * Portal 内无消费者, 回放只会让所有 Portal 实例在菜单开合时白重渲染一轮
   * */
  const menu = useContext(MenuContext)

  usePortalConsumer(
    manager,
    <NavigationContext.Provider value={navigation}>
      <StoreContext.Provider value={screenId}>
        <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>
      </StoreContext.Provider>
    </NavigationContext.Provider>,
    priority
  )

  return null
}

Portal.Host = PortalHost
Portal.add = portal.add
Portal.remove = portal.remove

export { Portal }

export default Portal
