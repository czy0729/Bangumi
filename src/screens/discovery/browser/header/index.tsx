/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 页面头部与右上角菜单 (网页入口 / 工具栏设置)
 */
import { useCallback, useMemo } from 'react'
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

          if (title === TEXT_MENU_BROWSER) {
            open(url)
          } else if (title === TEXT_MENU_SPA) {
            open(`${URL_SPA}/${getSPAParams('Browser')}`)
          } else {
            $.onToolBar(title)
          }

          t('索引.右上角菜单', {
            key: title
          })
        }}
      />
    ),
    [$, memoData, url]
  )

  return <HeaderV2 title='索引' hm={$.hm} headerRight={handleHeaderRight} />
}

export default observer(Header)
