/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:23:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 11:30:10
 */
import React, { useCallback } from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { confirm, info, open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconTouchable
          name='md-access-time'
          color={_.colorTitle}
          size={20}
          onPress={() => {
            if ($.state.fetching) {
              info('正在获取中，请稍等')
              return
            }

            confirm(
              `批量获取所有好友最近一次的时间胶囊创建时间（单次最大400个），确定？`,
              $.fetchFriendsActive,
              '提示'
            )
          }}
        />
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)

              t('好友.右上角菜单', {
                key: title
              })
            }
          }}
        />
      </>
    ),
    [$]
  )

  return useObserver(() => (
    <HeaderV2
      title={$.params.userId ? 'TA的好友' : '我的好友'}
      alias='好友'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  ))
}

export default Header
