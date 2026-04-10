/*
 * @Author: czy0729
 * @Date: 2023-04-11 15:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 23:54:48
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconHeader } from '@_'
import { _, useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { HOST, TEXT_MENU_BROWSER, TEXT_MENU_SPA, TEXT_MENU_SPLIT, URL_SPA } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { toolBar } = $
  const memoData = useMemo(() => [...DATA, TEXT_MENU_SPLIT, ...toolBar], [toolBar])

  const handleSelect = useCallback(
    (title: string) => {
      if (title === TEXT_MENU_BROWSER) {
        open(`${HOST}/index/browser?orderby=collect`)

        t('目录.右上角菜单', { key: title })
        return
      }

      if (title === TEXT_MENU_SPA) {
        open(`${URL_SPA}/${getSPAParams('Catalog')}`)

        t('目录.右上角菜单', { key: title })
        return
      }

      $.onToolBar(title)
    },
    [$]
  )

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconHeader
          name='md-person-outline'
          color={_.colorDesc}
          onPress={() => {
            navigation.push('Catalogs')
          }}
        />
        <HeaderV2Popover data={memoData} onSelect={handleSelect} />
      </>
    ),
    [handleSelect, memoData, navigation]
  )

  return <HeaderV2 title='目录' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
