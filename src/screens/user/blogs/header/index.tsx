/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:34:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 18:55:13
 */
import React, { useCallback } from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconBookmarks } from '@_'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconBookmarks navigation={navigation} />
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)

              t('用户日志.右上角菜单', {
                key: title
              })
            }
          }}
        />
      </>
    ),
    [$, navigation]
  )

  return useObserver(() => (
    <HeaderV2
      title={$.params.userId ? '用户日志' : '我的日志'}
      alias='用户日志'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  ))
}

export default Header
