/*
 * @Author: czy0729
 * @Date: 2023-09-23 07:04:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 11:44:05
 */
import React from 'react'
import { ToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Type(props, { $ }: Ctx) {
  const { tags } = $.state
  const tagsCount = $.tagsCount()
  return (
    <ToolBar.Popover
      data={['全部', ...$.memoTags.map(item => `${item} (${tagsCount[item]})`)]}
      icon='md-bookmark-outline'
      iconSize={17}
      iconColor={_.colorDesc}
      text={tags.length ? tags[0] : '全部'}
      type='desc'
      onSelect={title => {
        let tag = ''
        if (title !== '全部') tag = title.split(' ')?.[0] || ''
        $.onSelectTag(tag)
      }}
    />
  )
}

export default obc(Type)
