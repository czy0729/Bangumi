/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:38:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:35:47
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title={$.params?.name ? `${$.params.name}的讨论版` : '讨论版'}
      alias='讨论版'
      hm={$.hm}
      headerRight={() => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)

              t('讨论版.右上角菜单', {
                key: title
              })
            }
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
