/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 01:31:32
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { getSPAParams, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, URL_SPA } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  return (
    <HeaderV2
      title='日志'
      alias='全站日志'
      hm={HM}
      headerRight={() => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open('https://bgm.tv/blog')
            } else if (title === TEXT_MENU_SPA) {
              open(`${URL_SPA}/${getSPAParams('DiscoveryBlog')}`)
            }

            t('全站日志.右上角菜单', {
              key: title
            })
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
