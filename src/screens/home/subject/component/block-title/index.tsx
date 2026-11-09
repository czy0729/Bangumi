/*
 * @Author: czy0729
 * @Date: 2026-11-09 05:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 05:00:00
 *
 * 板块标题 (点击弹出布局菜单: 收起展开 / 重置布局 / 隐藏 / 管理, 前三项只作用于本条目)
 *  - 仅标题部分是菜单触发器, right 等功能图标不在菜单手势区内
 */
import { observer } from 'mobx-react'
import { SectionTitle } from '@_'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function BlockTitle({ layoutKey, ...sectionTitleProps }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return <SectionTitle popover={$.blockMenu(layoutKey, navigation)} {...sectionTitleProps} />
}

export default observer(BlockTitle)
