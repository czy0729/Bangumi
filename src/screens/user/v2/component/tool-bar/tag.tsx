/*
 * @Author: czy0729
 * @Date: 2022-06-06 06:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 11:19:08
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { DEFAULT_SUBJECT_TYPE, TABS } from '../../ds'
import { Ctx } from '../../types'

function Tag({ page }) {
  const { $ } = useStore<Ctx>()
  const { subjectType = DEFAULT_SUBJECT_TYPE, tag } = $.state

  const filterData = ['重置']
  const type = MODEL_COLLECTION_STATUS.getValue(TABS[page].title)
  $.userCollectionsTags(subjectType, type).forEach(item =>
    filterData.push(`${item.tag} (${item.count})`)
  )
  return (
    <ToolBar.Popover
      data={filterData}
      icon='md-bookmark-outline'
      iconSize={17}
      iconColor={_.colorDesc}
      text={tag ? tag.replace(/ \(\d+\)/, '') : '标签'}
      type='desc'
      heatmap='我的.排序选择'
      onSelect={$.onTagSelect}
    />
  )
}

export default ob(Tag)
