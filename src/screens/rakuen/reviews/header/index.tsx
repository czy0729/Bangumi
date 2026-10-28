/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:57:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <HeaderV2Popover
        data={DATA}
        onSelect={title => {
          if (title === TEXT_MENU_BROWSER) {
            open($.url)
          }
        }}
      />
    ),
    [$]
  )

  return (
    <HeaderV2
      title={$.params?.name ? `${$.params.name}的影评` : '影评'}
      alias='影评'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
