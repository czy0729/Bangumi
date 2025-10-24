/*
 * @Author: czy0729
 * @Date: 2022-06-06 06:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 21:24:44
 */
import React, { useMemo } from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { DEFAULT_SUBJECT_TYPE, TABS } from '../../ds'

import type { Ctx } from '../../types'
import type { TagProps } from './types'

function Tag({ page }: TagProps) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { subjectType = DEFAULT_SUBJECT_TYPE, tag } = $.state
    const tags = $.userCollectionsTags(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue(TABS[page].title)
    )
    const memoData = useMemo(
      () => ['重置', ...tags.map(item => `${item.tag} (${item.count})`)],
      [tags]
    )

    return (
      <ToolBar.Popover
        data={memoData}
        icon='md-bookmark-outline'
        iconSize={17}
        iconColor={_.colorDesc}
        text={tag ? tag.replace(/ \(\d+\)/, '') : '标签'}
        type='desc'
        heatmap='我的.排序选择'
        onSelect={$.onTagSelect}
      />
    )
  })
}

export default Tag
