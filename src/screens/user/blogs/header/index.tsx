/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:34:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:56:58
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconBookmarks } from '@_'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
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

  return (
    <HeaderV2
      title={$.params.userId ? 'TA的日志' : '我的日志'}
      alias='用户日志'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
