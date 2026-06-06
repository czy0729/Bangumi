/*
 * @Author: czy0729
 * @Date: 2022-09-23 11:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 05:42:48
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Component, HorizontalList } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { Tag } from '../tag'
import { COMPONENT } from './ds'

import type { Props as TagsProps } from './types'
export type { TagsProps }

export const Tags = observer(({ value = [], active = [], limit, ...other }: TagsProps) => {
  r(COMPONENT)

  const hasLimit = limit !== undefined && value.length > limit
  const displayData = hasLimit ? value.slice(0, limit) : value
  const extraCount = value.length - limit

  const memoData = useMemo(() => displayData.map(item => ({ id: item })), [displayData])

  const handleRenderItem = useCallback(
    (item: { id: string }) => (
      <Tag
        style={_.mr.sm}
        value={item.id}
        type={active.includes(item.id) ? 'warning' : undefined}
      />
    ),
    [active]
  )

  if (!value || !value.length) return null

  return (
    <Component id='base-tags'>
      <HorizontalList
        {...other}
        data={memoData}
        showMask
        sortData={false}
        renderItem={handleRenderItem}
      />
      {hasLimit && <Tag value={`+${extraCount}`} />}
    </Component>
  )
})

export default Tags
