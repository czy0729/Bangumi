/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:21:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 18:28:06
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER } from '@constants'
import T2S from '../component/t2s'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <T2S $={$} navigation={navigation} />
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)

              t('搜索.右上角菜单', {
                key: title
              })
            }
          }}
        />
      </>
    ),
    [$, navigation]
  )

  return <HeaderV2 title='搜索' hm={$.hm} headerRight={handleHeaderRight} />
}

export default observer(Header)
