/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 19:24:19
 */
import React from 'react'
import { WithFilterProps } from '../../../types'
import { LAYOUT_VALUES, TEXTS } from '../ds'
import ItemSettingSegmented from '../../item-setting-segmented'
import { THUMB } from './ds'

/** 进度输入框 */
function ShowEpInput({ filter }: WithFilterProps) {
  return (
    <ItemSettingSegmented
      setting='showEpInput'
      values={LAYOUT_VALUES}
      filter={filter}
      thumb={THUMB}
      {...TEXTS.showEpInput}
    />
  )
}

export default ShowEpInput
