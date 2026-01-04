/*
 * @Author: czy0729
 * @Date: 2024-07-15 13:09:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-02 21:49:52
 */
import React, { useCallback } from 'react'
import { Flex, Iconfont } from '@components'
import { rakuenStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { HOST } from '@constants'
import { Popover } from '../../../base'
import { DATA_BOOKMARKS_SAVED, DATA_BOOKMARKS_UNSAVE } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function BtnPopover({ id, title }: Props) {
  return useObserver(() => {
    const href = `${HOST}/blog/${id}`
    const isSaved = rakuenStore.bookmarksSaved(href)

    const handleSelect = useCallback(() => {
      rakuenStore.toggleBookmarks(href, title)
    }, [href])

    return (
      <Popover
        style={styles.touch}
        data={isSaved ? DATA_BOOKMARKS_SAVED : DATA_BOOKMARKS_UNSAVE}
        onSelect={handleSelect}
      >
        <Flex style={styles.body} justify='end'>
          {isSaved && (
            <Iconfont
              style={{
                marginRight: 12,
                marginLeft: 4
              }}
              name='md-bookmark-outline'
              size={19}
            />
          )}
          <Iconfont name='md-more-vert' size={19} />
        </Flex>
      </Popover>
    )
  })
}

export default BtnPopover
