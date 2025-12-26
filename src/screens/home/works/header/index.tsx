/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 03:00:14
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_SPLIT } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    let title = $.params?.name ? `${$.params.name}的作品` : '更多作品'
    const { length } = $.monoWorks.list
    if (length) title += ` (${length})`

    return (
      <HeaderV2
        title={title}
        alias='作品'
        hm={$.hm}
        headerRight={() => (
          <HeaderV2Popover
            data={[...DATA, TEXT_MENU_SPLIT, ...$.toolBar]}
            onSelect={title => {
              if (title === '浏览器查看') {
                open($.url)

                t('作品.右上角菜单', {
                  key: title
                })
              } else {
                $.onToolBar(title)
              }
            }}
          />
        )}
      />
    )
  })
}

export default Header
