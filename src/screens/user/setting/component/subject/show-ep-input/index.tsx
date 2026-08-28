/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 02:52:22
 */
import React from 'react'
import { LAYOUT_VALUES, TEXTS } from '../ds'
import ItemSettingSegmented from '../../item-setting-segmented'
import { THUMB } from './ds'

import type { WithFilterProps } from '../../../types'

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
