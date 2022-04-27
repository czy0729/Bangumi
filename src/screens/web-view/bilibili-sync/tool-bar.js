/*
 * @Author: czy0729
 * @Date: 2022-04-27 19:52:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 20:08:19
 */
import React from 'react'
import { ToolBar as CompToolBar, Text } from '@components'
import { obc } from '@utils/decorators'

function ToolBar(props, { $ }) {
  const { hideWatched, hideSame, privacy } = $.state
  return (
    <CompToolBar>
      <CompToolBar.Touchable onSelect={() => $.onToggle('hideWatched')}>
        <Text size={12} type={hideWatched ? 'main' : 'desc'} bold={hideWatched}>
          隐藏看过
        </Text>
      </CompToolBar.Touchable>
      <CompToolBar.Touchable onSelect={() => $.onToggle('hideSame')}>
        <Text size={12} type={hideSame ? 'main' : 'desc'} bold={hideSame}>
          隐藏一致
        </Text>
      </CompToolBar.Touchable>
      <CompToolBar.Touchable onSelect={() => $.onToggle('privacy')}>
        <Text size={12}>{privacy ? '私密' : '公开'}</Text>
      </CompToolBar.Touchable>
    </CompToolBar>
  )
}

export default obc(ToolBar)
