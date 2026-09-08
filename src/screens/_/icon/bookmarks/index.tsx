/*
 * @Author: czy0729
 * @Date: 2024-07-15 14:56:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 21:50:28
 */
import { observer } from 'mobx-react'
import { HeaderV2Popover } from '@components'
import { _, rakuenStore } from '@stores'
import { appNavigate } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props as IconBookmarksProps } from './types'
export type { IconBookmarksProps }

export const IconBookmarks = observer(({ navigation }: IconBookmarksProps) => {
  r(COMPONENT)

  const data: string[] = rakuenStore.bookmarks.map(item => item.title)
  if (!data.length) data.push('(空书签)')

  return (
    <HeaderV2Popover
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
