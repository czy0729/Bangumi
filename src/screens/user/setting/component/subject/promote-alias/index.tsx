/*
 * @Author: czy0729
 * @Date: 2025-04-26 03:51:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 05:38:37
 */
import React from 'react'
import { TEXTS } from '../ds'
import ItemSettingSwitch from '../../item-setting-switch'
import { THUMB } from './ds'

import type { WithFilterProps } from '../../../types'

/** 条目详情中，是否把条目的别名提前展示 */
function PromoteAlias({ filter }: WithFilterProps) {
  return (
    <ItemSettingSwitch
      setting='subjectPromoteAlias'
      filter={filter}
      thumb={THUMB}
      {...TEXTS.promoteAlias}
    />
  )
}

export default PromoteAlias
