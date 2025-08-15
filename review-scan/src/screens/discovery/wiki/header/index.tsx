/*
 * @Author: czy0729
 * @Date: 2022-03-13 00:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 13:35:01
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  return (
    <HeaderV2
      title='维基人'
      hm={HM}
      headerRight={() => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(`${HOST}/wiki`)

              t('维基人.右上角菜单', {
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
