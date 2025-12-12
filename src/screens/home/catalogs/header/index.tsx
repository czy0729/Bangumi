/*
 * @Author: czy0729
 * @Date: 2022-03-15 00:48:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 22:07:14
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
    const { url } = $

    const handleHeaderRight = useCallback(
      () => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(url)

              t('条目目录.右上角菜单', {
                key: title
              })
            }
          }}
        />
      ),
      [url]
    )

    return (
      <HeaderV2
        title={$.params?.name ? `包含${$.params.name}的目录` : '条目目录'}
        alias='条目目录'
        hm={$.hm}
        headerRight={handleHeaderRight}
      />
    )
  })
}

export default Header
