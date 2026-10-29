/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:46:36
 *
 * 工具栏: 分级
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, DATA_CLASSIFICATION } from './ds'

import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Classification')

/** 分级 */
function Classification() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const typeCn = $.typeCn as '游戏'
  const data = DATA_CLASSIFICATION[typeCn]
  if (!data) return null

  return (
    <ToolBar.Popover
      key={typeCn}
      data={data}
      value={$.state.classification}
      text={$.classification || '分级'}
      type={$.classification === '' ? undefined : 'desc'}
      onSelect={$.onClassificationSelect}
      heatmap='排行榜.分级选择'
    />
  )
}

export default observer(Classification)
