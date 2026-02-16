/*
 * @Author: czy0729
 * @Date: 2025-02-09 23:37:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-09 23:44:49
 */
import React from 'react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { copy, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_COPY_LINK, TEXT_MENU_COPY_SHARE } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT, DATA } from './ds'

function Menu() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2Popover
      data={DATA}
      onSelect={title => {
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
      }}
    />
  )
}

export default ob(Menu, COMPONENT)
