/*
 * @Author: czy0729
 * @Date: 2024-11-08 07:07:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-12 17:28:38
 */
import React from 'react'
import { WithFilterProps } from '../../../types'
import { TEXTS } from '../ds'
import ItemSettingSwitch from '../../item-setting-switch'
import { THUMB } from './ds'

/** 简介、详情使用新页面展开 */
function HtmlExpand({ filter }: WithFilterProps) {
  return (
    <ItemSettingSwitch
      setting='subjectHtmlExpand'
      filter={filter}
      thumb={THUMB}
      reverse
      {...TEXTS.htmlExpand}
    />
  )
}

export default HtmlExpand
