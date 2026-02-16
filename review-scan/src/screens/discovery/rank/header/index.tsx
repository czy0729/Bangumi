/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:08:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 15:24:48
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, TEXT_MENU_SPLIT, URL_SPA } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title='排行榜'
      hm={$.hm}
      headerRight={() => (
        <HeaderV2Popover
          data={[...DATA, TEXT_MENU_SPLIT, ...$.toolBar]}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)

              t('排行榜.右上角菜单', {
                key: title
              })
            } else if (title === TEXT_MENU_SPA) {
              open(`${URL_SPA}/${getSPAParams('Rank')}`)

              t('排行榜.右上角菜单', {
                key: title
              })
            } else {
              $.onToolBar(title)
            }
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
