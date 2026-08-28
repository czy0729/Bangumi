/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 05:39:04
 */
import React from 'react'
import { LAYOUT_VALUES, TEXTS } from '../ds'
import ItemSettingSegmented from '../../item-setting-segmented'
import { THUMB } from './ds'

import type { WithFilterProps } from '../../../types'

/** 其他用户收藏数量 */
function ShowCount({ filter }: WithFilterProps) {
  return (
    <ItemSettingSegmented
      setting='showCount'
      values={LAYOUT_VALUES}
      filter={filter}
      thumb={THUMB}
      {...TEXTS.showCount}
    />
  )
}

export default ShowCount
