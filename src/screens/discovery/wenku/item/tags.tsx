/*
 * @Author: czy0729
 * @Date: 2022-09-21 00:33:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:20:27
 */
import { observer } from 'mobx-react'
import { Tags as CompTags } from '@_'
import { useStore } from '@stores'
import { desc } from '@utils'

import type { Ctx } from '../types'

function Tags({ value }) {
  const { $ } = useStore<Ctx>()
  if (!value || typeof value !== 'string') return null

  const { tags: selected } = $.state.query
  const tags = value
    .split(' ')
    .sort((a, b) => desc(selected.includes(a) ? 1 : 0, selected.includes(b) ? 1 : 0))
  return <CompTags value={tags} />
}

export default observer(Tags)
