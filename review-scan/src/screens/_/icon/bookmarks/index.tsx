/*
 * @Author: czy0729
 * @Date: 2024-07-15 14:56:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-15 15:05:04
 */
import React from 'react'
import { Header } from '@components'
import { _, rakuenStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { Props as IconBookmarksProps } from './types'

export { IconBookmarksProps }

export const IconBookmarks = ob(({ navigation }: IconBookmarksProps) => {
  const data: string[] = rakuenStore.bookmarks.map(item => item.title)
  if (!data.length) data.push('(空书签)')

  return (
    <Header.Popover
      style={_.mr.xs}
      data={data}
      name='md-bookmark-outline'
      size={20}
      onSelect={title => {
        const item = rakuenStore.bookmarks.find(item => item.title === title)
        if (item?.href) {
          appNavigate(item.href, navigation)
        }
      }}
    />
  )
})

export default IconBookmarks
