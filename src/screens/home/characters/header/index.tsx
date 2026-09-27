/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:10:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 07:46:44
 *
 * 更多角色页头部: 标题 + 右上角浏览器打开菜单
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { getHeaderTitleSize, open } from '@utils'
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

            t('更多角色.右上角菜单', {
              key: title
            })
          }
        }}
      />
    ),
    [$]
  )

  const title = $.params?.name ? `${$.params.name}的角色` : '更多角色'

  return (
    <HeaderV2
      title={title}
      headerTitleSize={getHeaderTitleSize(title)}
      alias='更多角色'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
