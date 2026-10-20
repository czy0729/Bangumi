/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:32:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 22:44:04
 *
 * 页面头部: 标题 + 浏览器查看菜单
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (title: string) => {
      if (title === TEXT_MENU_BROWSER) {
        open($.url)

        t('照片墙.右上角菜单', {
          key: title
        })
      }
    },
    [$]
  )

  const handleHeaderRight = useCallback(
    () => <HeaderV2Popover data={DATA} onSelect={handleSelect} />,
    [handleSelect]
  )

  return <HeaderV2 title={$.params.title} hm={$.hm} headerRight={handleHeaderRight} />
}

export default observer(Header)
