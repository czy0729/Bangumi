/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:00:00
 *
 * 全局「更多」菜单抽屉: 发现页只显示隐藏项, 其他入口显示全部功能
 */
import { observer } from 'mobx-react'
import { Drawer } from '@components'
import { _, uiStore } from '@stores'
import { r } from '@utils/dev'
import Background from './background'
import Header from './header'
import { useMoreMenu } from './hooks'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export { getMenus, getVisibleMenus, getHiddenMenus } from './utils'
export { pressMenu } from './press'

function MoreMenu() {
  r(COMPONENT)

  const { visible, all, rendered, statusBarHeight, bottom, visibleMenus, hiddenMenus } =
    useMoreMenu()

  if (!rendered) return null

  const styles = memoStyles()

  return (
    <Drawer
      style={styles.body}
      position='left'
      maskColor={_.select('rgba(0, 0, 0, 0.16)', 'rgba(0, 0, 0, 0.64)')}
      show={visible}
      swipeToClose
      onToggle={uiStore.closeMoreMenu}
    >
      <Background />
      <Header all={all} statusBarHeight={statusBarHeight} onClose={uiStore.closeMoreMenu} />
      <List all={all} bottom={bottom} visibleMenus={visibleMenus} hiddenMenus={hiddenMenus} />
    </Drawer>
  )
}

export default observer(MoreMenu)
