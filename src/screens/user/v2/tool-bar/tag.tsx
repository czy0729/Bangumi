/*
 * @Author: czy0729
 * @Date: 2022-06-06 06:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 10:24:43
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { tabs, defaultSubjectType } from '../store'

function Tag({ page }, { $ }) {
  const { subjectType = defaultSubjectType, tag } = $.state

  const filterData = ['重置']
  const type = MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
  $.userCollectionsTags(subjectType, type).forEach(item =>
    filterData.push(`${item.tag} (${item.count})`)
  )
  return (
    <ToolBar.Popover
      data={filterData}
      icon='md-bookmark-outline'
      iconColor={_.colorDesc}
      text={tag ? tag.replace(/ \(\d+\)/, '') : '标签'}
      type='desc'
      heatmap='我的.排序选择'
      onSelect={$.onTagSelect}
    />
  )
}

export default obc(Tag)
