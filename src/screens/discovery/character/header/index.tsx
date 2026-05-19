/*
 * @Author: czy0729
 * @Date: 2022-03-12 22:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 07:11:38
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { HOST, TEXT_MENU_BROWSER } from '@constants'
import IconNavigate from './icon-navigate'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconNavigate $={$} />
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              if (this.title === '人物近况') {
                open(`${HOST}/mono/update`)
              } else {
                open($.url)
              }

              t('收藏的人物.右上角菜单', {
                key: title
              })
            }
          }}
        />
      </>
    ),
    [$]
  )

  return (
    <HeaderV2
      title={$.params.userName ? 'TA的人物' : '我的人物'}
      alias='用户人物'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
