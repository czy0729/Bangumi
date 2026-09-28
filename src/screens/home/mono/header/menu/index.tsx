/*
 * @Author: czy0729
 * @Date: 2025-08-17 16:27:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 23:00:00
 *
 * 右上角菜单 (复制链接 / 复制分享文案 / 浏览器打开)
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { withSplit, TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, MENU_ACTIONS, MENU_DS } from './ds'

import type { Ctx } from '../../types'

function Menu() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const data = [`${TEXT_MENU_BROWSER}${withSplit($.id)}`, ...MENU_DS] as const

  const handleSelect = useCallback(
    (key?: (typeof data)[number]) => {
      if (!key) return

      if (key in MENU_ACTIONS) {
        MENU_ACTIONS[key as keyof typeof MENU_ACTIONS]($)
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

  return <HeaderV2Popover data={data} onSelect={handleSelect} />
}

export default observer(Menu)
