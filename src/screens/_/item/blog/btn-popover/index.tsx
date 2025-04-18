/*
 * @Author: czy0729
 * @Date: 2024-07-15 13:09:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-15 14:52:32
 */
import React, { useCallback } from 'react'
import { Flex, Iconfont } from '@components'
import { _, rakuenStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { HOST } from '@constants'
import { Popover } from '../../../base'
import { DATA_BOOKMARKS_SAVED, DATA_BOOKMARKS_UNSAVE } from './ds'
import { styles } from './styles'

function BtnPopover({ id, title }) {
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
          {isSaved && <Iconfont style={_.mr.md} name='md-bookmark-outline' size={20} />}
          <Iconfont name='md-more-vert' size={20} />
        </Flex>
      </Popover>
    )
  })
}

export default BtnPopover
