/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:53:24
 *
 * 工具栏: 受众
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, DATA_TARGET } from './ds'

import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Target')

/** 受众 */
function Target() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const typeCn = $.typeCn as '动画' | '游戏'
  const data = DATA_TARGET[typeCn]
  if (!data) return null

  return (
    <ToolBar.Popover
      key={typeCn}
      data={data}
      value={$.state.target}
      text={$.target || '受众'}
      type={$.target === '' ? undefined : 'desc'}
      onSelect={$.onTargetSelect}
      heatmap='排行榜.受众选择'
    />
  )
}

export default observer(Target)
