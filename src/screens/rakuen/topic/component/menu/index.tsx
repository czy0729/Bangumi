/*
 * @Author: czy0729
 * @Date: 2025-02-07 06:15:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 17:27:30
 */
import React, { useCallback, useMemo } from 'react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { copy, getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { HOST, URL_SPA } from '@constants'
import { COMPONENT, DATA, TEXT_COPY, TEXT_REPORT, TEXT_SHARE, TEXT_SPA } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Menu() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { topicId, title, url } = $

    const memoData = useMemo(() => [`帖子 · ${topicId}`, ...DATA], [topicId])

    const handleSelect = useCallback(
      (key: string) => {
        switch (key) {
          case TEXT_SPA: {
            const url = `${URL_SPA}/${getSPAParams('Topic', { topicId })}`
            open(url)
            break
          }

          case TEXT_COPY:
            copy(url, '已复制链接')
            break

          case TEXT_SHARE:
            copy(`【链接】${title} | Bangumi番组计划\n${url}`, '已复制分享文案')
            break

          case TEXT_REPORT:
            open(`${HOST}/group/forum`)
            break

          default:
            open(url)
            break
        }

        t('帖子.右上角菜单', {
          key: key.includes('帖子') ? '浏览器查看' : key
        })
      },
      [title, topicId, url]
    )

    return <HeaderV2Popover style={styles.menu} data={memoData} onSelect={handleSelect} />
  })
}

export default Menu
