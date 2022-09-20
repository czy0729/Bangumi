/*
 * @Author: czy0729
 * @Date: 2022-09-21 00:33:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-21 00:50:30
 */
import React from 'react'
import { _ } from '@stores'
import { Tag } from '@_'
import { desc } from '@utils'
import { obc } from '@utils/decorators'

function Tags({ value }, { $ }) {
  if (!value || typeof value !== 'string') return null

  const { tags: selected } = $.state.query
  const tags = value
    .split(' ')
    .sort((a, b) => desc(selected.includes(a), selected.includes(b)))

  return (
    <>
      {tags.map((item: string) => (
        <Tag
          key={item}
          style={_.mr.sm}
          value={item}
          type={selected.includes(item) ? 'main' : undefined}
        />
      ))}
    </>
  )
}

export default obc(Tags)
