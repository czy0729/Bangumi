/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 05:56:25
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_NOTIFY, TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  return (
    <HeaderV2
      title='电波提醒'
      hm={HM}
      headerRight={() => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(HTML_NOTIFY())

              t('电波提醒.右上角菜单', {
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
