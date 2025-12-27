/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:38:52
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { HTML_GROUP_MINE, TEXT_MENU_BROWSER } from '@constants'
import Extra from '../component/extra'
import { COMPONENT, DATA, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <HeaderV2
      title='小组'
      headerTitleAlign='left'
      hm={HM}
      headerRight={() => (
        <>
          <Extra $={$} />
          <HeaderV2Popover
            data={DATA}
            onSelect={title => {
              if (title === TEXT_MENU_BROWSER) {
                open(HTML_GROUP_MINE())

                t('我的小组.右上角菜单', {
                  key: title
                })
              }
            }}
          />
        </>
      )}
    />
  ))
}

export default Header
