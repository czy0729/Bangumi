/*
 * @Author: czy0729
 * @Date: 2024-04-25 03:42:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 05:39:05
 */
import React from 'react'
import i18n from '@constants/i18n'
import { LAYOUT_VALUES, TEXTS } from '../ds'
import ItemSettingSegmented from '../../item-setting-segmented'
import { THUMB } from './ds'

import type { WithFilterProps } from '../../../types'

/** 自定义放送时间块 */
function ShowCustomOnair({ filter }: WithFilterProps) {
  return (
    <ItemSettingSegmented
      setting='showCustomOnair'
      values={LAYOUT_VALUES}
      filter={filter}
      thumb={THUMB}
      {...TEXTS.showCustomOnair}
      information={`收藏状态为在看的动画，章节的右下方，${i18n.initial()}值为线上放送时间，手动更改后首页收藏排序以此为准`}
    />
  )
}

export default ShowCustomOnair
