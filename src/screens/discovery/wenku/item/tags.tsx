/*
 * @Author: czy0729
 * @Date: 2022-09-21 00:33:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-27 23:55:36
 */
import React from 'react'
import { Tags as CompTags } from '@_'
import { desc } from '@utils'
import { obc } from '@utils/decorators'

function Tags({ value }, { $ }) {
  if (!value || typeof value !== 'string') return null

  const { tags: selected } = $.state.query
  const tags = value
    .split(' ')
    .sort((a, b) => desc(selected.includes(a), selected.includes(b)))
  return <CompTags value={tags} />
}

export default obc(Tags)
