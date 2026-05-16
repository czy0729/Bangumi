/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:08:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 15:24:48
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, TEXT_MENU_SPLIT, URL_SPA } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { toolBar, url } = $

  const memoData = useMemo(() => [...DATA, TEXT_MENU_SPLIT, ...toolBar] as const, [toolBar])

  const handleHeaderRight = useCallback(
    () => (
      <HeaderV2Popover
        data={memoData}
        onSelect={(title: string) => {
          if (title === TEXT_MENU_SPLIT) return

          const actions = {
            [TEXT_MENU_BROWSER]: () => open(url),
            [TEXT_MENU_SPA]: () => open(`${URL_SPA}/${getSPAParams('Rank')}`)
          } as const

          actions[title]?.() ?? $.onToolBar(title)

          t('排行榜.右上角菜单', {
            key: title
          })
        }}
      />
    ),
    [$, memoData, url]
  )

  return <HeaderV2 title='排行榜' hm={$.hm} headerRight={handleHeaderRight} />
}

export default observer(Header)
