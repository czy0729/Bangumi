/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 19:12:20
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { getSPAParams, open } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { HOST, TEXT_MENU_BROWSER, TEXT_MENU_SPA, URL_SPA } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  r(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <HeaderV2Popover
        data={DATA}
        onSelect={title => {
          if (title === TEXT_MENU_BROWSER) {
            open(`${HOST}/user/lilyurey/index`)
          } else if (title === TEXT_MENU_SPA) {
            open(`${URL_SPA}/${getSPAParams('Staff')}`)
          }

          t('新番档期.右上角菜单', {
            key: title
          })
        }}
      />
    ),
    []
  )

  return <HeaderV2 title='新番' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
