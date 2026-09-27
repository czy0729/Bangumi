/*
 * @Author: czy0729
 * @Date: 2022-03-15 01:10:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 10:04:21
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

            t('章节.右上角菜单', {
              key: title
            })
          }
        }}
      />
    ),
    [$]
  )

  const title = $.params?.name ? `${$.params.name}的章节` : '章节'

  return (
    <HeaderV2
      title={title}
      headerTitleSize={getHeaderTitleSize(title)}
      alias='章节'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
