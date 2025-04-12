/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 16:54:19
 */
import React from 'react'
import { WithFilterProps } from '../../../types'
import { TEXTS } from '../ds'
import ItemSettingSwitch from '../../item-setting-switch'
import { THUMB } from './ds'

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
