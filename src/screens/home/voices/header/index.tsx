/*
 * @Author: czy0729
 * @Date: 2022-03-15 20:45:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:38:54
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_BROWSER } from '@constants'
import { SNAPSHOT_LIMIT } from '../ds'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    let title = $.params?.name ? `${$.params.name}的角色` : '角色'
    const { length } = $.monoVoices.list
    if (length && length !== SNAPSHOT_LIMIT) title += ` (${length})`

    return (
      <HeaderV2
        title={title}
        alias='角色'
        hm={$.hm}
        headerRight={() => (
          <HeaderV2Popover
            data={DATA}
            onSelect={title => {
              if (title === TEXT_MENU_BROWSER) {
                open($.url)

                t('角色.右上角菜单', {
                  key: title
                })
              }
            }}
          />
        )}
      />
    )
  })
}

export default Header
