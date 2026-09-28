/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:45:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
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

  const handleHeaderRight = useCallback(
    () => (
      <HeaderV2Popover
        data={DATA}
        onSelect={title => {
          if (title === TEXT_MENU_BROWSER) {
            open($.url)

            t('修订历史.右上角菜单', {
              key: title
            })
          }
        }}
      />
    ),
    [$]
  )

  return (
    <HeaderV2
      title={$.params?.name ? `${$.params.name}的修订历史` : '修订历史'}
      alias='修订历史'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
