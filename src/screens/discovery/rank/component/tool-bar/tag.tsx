/*
 * @Author: czy0729
 * @Date: 2024-10-22 07:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:53:13
 *
 * 工具栏: 公共标签
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { useStore } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, DATA_TAG } from './ds'

import type { Ctx } from '../../types'

const COMPONENT = rc(PARENT, 'Tag')

/** 公共标签 */
function Tag() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const typeCn = $.typeCn as '动画' | '游戏'
  const data = DATA_TAG[typeCn]
  if (!data) return null

  return (
    <ToolBar.Popover
      key={typeCn}
      data={data}
      text={$.tag || '公共标签'}
      type={$.tag === '' ? undefined : 'desc'}
      onSelect={$.onTagSelect}
      heatmap='排行榜.公共标签选择'
    />
  )
}

export default observer(Tag)
