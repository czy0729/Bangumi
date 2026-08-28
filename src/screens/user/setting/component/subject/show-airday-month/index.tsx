/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 05:38:45
 */
import React from 'react'
import { TEXTS } from '../ds'
import ItemSettingSwitch from '../../item-setting-switch'
import { THUMB } from './ds'

import type { WithFilterProps } from '../../../types'

/** 条目发布日期是否显示到月份 */
function ShowAirdayMonth({ filter }: WithFilterProps) {
  return (
    <ItemSettingSwitch
      setting='subjectShowAirdayMonth'
      filter={filter}
      thumb={THUMB}
      {...TEXTS.showAirdayMonth}
    />
  )
}

export default ShowAirdayMonth
