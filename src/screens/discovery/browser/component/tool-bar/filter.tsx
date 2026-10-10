/*
 * @Author: czy0729
 * @Date: 2022-06-04 06:22:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 类型选择
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { DATA_FILTER } from './ds'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../types'

function Filter() {
  const { $ } = useStore<Ctx>()

  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.state.type)

  return (
    <ToolBar.Popover
      data={DATA_FILTER}
      icon='md-filter-list'
      iconColor={_.colorDesc}
      text={typeCn}
      type='desc'
      heatmap='索引.类型选择'
      onSelect={$.onTypeSelect}
    />
  )
}

export default observer(Filter)
