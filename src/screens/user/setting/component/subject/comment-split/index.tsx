/*
 * @Author: czy0729
 * @Date: 2025-12-09 20:10:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-09 20:13:23
 */
import React from 'react'
import { TEXTS } from '../ds'
import ItemSettingSwitch from '../../item-setting-switch'
import { THUMB } from './ds'

import type { WithFilterProps } from '../../../types'

/** 条目对吐槽中的斜杠进行换行 */
function HtmlExpand({ filter }: WithFilterProps) {
  return (
    <ItemSettingSwitch
      setting='subjectCommentSplit'
      filter={filter}
      thumb={THUMB}
      {...TEXTS.commentSplit}
    />
  )
}

export default HtmlExpand
