/*
 * @Author: czy0729
 * @Date: 2025-04-26 03:51:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-26 03:52:59
 */
import React from 'react'
import { WithFilterProps } from '../../../types'
import { TEXTS } from '../ds'
import ItemSettingSwitch from '../../item-setting-switch'
import { THUMB } from './ds'

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
