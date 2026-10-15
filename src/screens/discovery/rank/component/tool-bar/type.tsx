/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:22:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:54:26
 *
 * 工具栏: 类型
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, DATA_TYPE } from './ds'

import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Type')

/** 类型 */
function Type() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ToolBar.Popover
      data={DATA_TYPE}
      icon='md-filter-list'
      iconColor={_.colorDesc}
      text={$.typeCn}
      type='desc'
      onSelect={$.onTypeSelect}
      heatmap='排行榜.类型选择'
    />
  )
}

export default observer(Type)
