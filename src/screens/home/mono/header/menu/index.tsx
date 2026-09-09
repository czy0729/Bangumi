/*
 * @Author: czy0729
 * @Date: 2025-08-17 16:27:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:06:31
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPLIT_LEFT, TEXT_MENU_SPLIT_RIGHT } from '@constants'
import { COMPONENT, MENU_ACTIONS, MENU_DS } from './ds'

import type { Ctx } from '../../types'

function Menu() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const memoData = useMemo(
    () =>
      [
        `${TEXT_MENU_BROWSER}${TEXT_MENU_SPLIT_LEFT}${$.id}${TEXT_MENU_SPLIT_RIGHT}`,
        ...MENU_DS
      ] as const,
    [$.id]
  )

  const handleSelect = useCallback(
    (key: string) => {
      if (key in MENU_ACTIONS) {
        MENU_ACTIONS[key]($)
      } else {
        open($.url)
      }

      t('人物.右上角菜单', {
        key,
        monoId: $.monoId
      })
    },
    [$]
  )

  return <HeaderV2Popover data={memoData} onSelect={handleSelect} />
}

export default observer(Menu)
