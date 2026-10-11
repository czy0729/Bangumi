/*
 * @Author: czy0729
 * @Date: 2024-07-30 11:51:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 列表类型切换
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { TYPE_DS } from '../../ds'
import { COMPONENT_TYPE } from './ds'

import type { Ctx } from '../../types'

const DATA = TYPE_DS.map(item => item.title)

/** 当前列表类型标题 */
type Props = {
  type?: string
}

function Type({ type }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT_TYPE)

  return (
    <ToolBar.Popover
      data={DATA}
      icon='icon-more-grid'
      iconColor={_.colorDesc}
      text={type}
      type='desc'
      onSelect={$.onToggleType}
    />
  )
}

export default observer(Type)
