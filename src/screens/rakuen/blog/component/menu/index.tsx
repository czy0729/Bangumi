/*
 * @Author: czy0729
 * @Date: 2025-02-09 23:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-05 05:50:19
 */
import React, { useCallback } from 'react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { copy, open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_BROWSER, TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../../types'

function Menu() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (title: (typeof DATA)[number]) => {
      switch (title) {
        case TEXT_MENU_BROWSER:
          open($.url)
          break

        case TEXT_MENU_COPY_LINK:
          copy($.url, '已复制链接')
          break

        case TEXT_MENU_COPY_SHARE:
          copy(`【链接】${$.title} | Bangumi番组计划\n${$.url}`, '已复制分享文案')
          break

        default:
          break
      }

      t('日志.右上角菜单', {
        key: title
      })
    },
    [$]
  )

  return useObserver(() => <HeaderV2Popover data={DATA} onSelect={handleSelect} />)
}

export default Menu
