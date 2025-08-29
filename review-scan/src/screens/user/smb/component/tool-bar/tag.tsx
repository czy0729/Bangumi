/*
 * @Author: czy0729
 * @Date: 2023-09-23 07:04:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:31:36
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function Tag() {
  const { $ } = useStore<Ctx>()
  const { subjectTags } = $.state
  const tagsCount = $.tagsSubjectCount()
  return (
    <ToolBar.Popover
      data={[
        '全部',
        ...$.memoSubjectTags
          .filter((_item, index) => index < 100)
          .map(item => `${item} (${tagsCount[item]})`)
      ]}
      icon='md-bookmark-outline'
      iconSize={17}
      iconColor={_.colorDesc}
      text={subjectTags.length ? subjectTags[0] : '标签'}
      type='desc'
      onSelect={title => {
        setTimeout(() => {
          let tag = ''
          if (title !== '全部') tag = title.split(' ')?.[0] || ''
          $.onSelectSubjectTag(tag)
        }, 0)
      }}
    />
  )
}

export default ob(Tag)
