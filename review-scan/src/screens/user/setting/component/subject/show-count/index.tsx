/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 19:01:10
 */
import React from 'react'
import { WithFilterProps } from '../../../types'
import { LAYOUT_VALUES, TEXTS } from '../ds'
import ItemSettingSegmented from '../../item-setting-segmented'
import { THUMB } from './ds'

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
