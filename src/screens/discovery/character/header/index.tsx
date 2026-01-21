/*
 * @Author: czy0729
 * @Date: 2022-03-12 22:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 11:30:47
 */
import React, { useCallback } from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <HeaderV2Popover
        data={DATA}
        onSelect={title => {
          if (title === TEXT_MENU_BROWSER) {
            open($.url)

            t('收藏的人物.右上角菜单', {
              key: title
            })
          }
        }}
      />
    ),
    [$]
  )

  return useObserver(() => (
    <HeaderV2
      title={$.params.userName ? 'TA的人物' : '我的人物'}
      alias='用户人物'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  ))
}

export default Header
