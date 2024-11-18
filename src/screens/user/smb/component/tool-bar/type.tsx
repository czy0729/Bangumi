/*
 * @Author: czy0729
 * @Date: 2023-09-23 07:04:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:31:43
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function Type() {
  const { $ } = useStore<Ctx>()
  const { tags } = $.state
  const tagsCount = $.tagsCount()
  return (
    <ToolBar.Popover
      data={['全部', ...$.memoTags.map(item => `${item} (${tagsCount[item]})`)]}
      icon='md-folder-open'
      iconSize={17}
      iconColor={_.colorDesc}
      text={tags.length ? tags[0] : '类型'}
      type='desc'
      onSelect={title => {
        setTimeout(() => {
          let tag = ''
          if (title !== '全部') tag = title.split(' ')?.[0] || ''
          $.onSelectTag(tag)
        }, 0)
      }}
    />
  )
}

export default ob(Type)
