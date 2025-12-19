/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:31:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 16:57:41
 */
import React, { useCallback } from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const handleHeaderRight = useCallback(
      () => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)

              t('制作人员.右上角菜单', {
                key: title
              })
            }
          }}
        />
      ),
      []
    )

    return (
      <HeaderV2
        title={$.params?.name ? `${$.params.name}的制作人员` : '更多制作人员'}
        alias='制作人员'
        hm={$.hm}
        headerRight={handleHeaderRight}
      />
    )
  })
}

export default Header
