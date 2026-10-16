/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 19:12:20
 *
 * 页面头部与右上角菜单
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { HOST, TEXT_MENU_BROWSER, TEXT_MENU_SPA, URL_SPA } from '@constants'
import Tab from '../component/tab'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { _loaded } = $.state

  const handleHeaderRight = useCallback(
    () => (
      <>
        {!!_loaded && <Tab />}
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(`${HOST}/user/${$.userId}/index`)
            } else if (title === TEXT_MENU_SPA) {
              open(`${URL_SPA}/${getSPAParams('Staff')}`)
            }

            t('新番档期.右上角菜单', {
              key: title
            })
          }}
        />
      </>
    ),
    [$, _loaded]
  )

  return <HeaderV2 title='新番' hm={$.hm} headerTitleAlign='left' headerRight={handleHeaderRight} />
}

export default observer(Header)
