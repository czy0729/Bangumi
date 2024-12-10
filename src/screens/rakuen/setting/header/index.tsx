/*
 * @Author: czy0729
 * @Date: 2024-02-01 18:24:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-01 18:33:48
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { ob } from '@utils/decorators'
import { COMPONENT, HM } from './ds'

function Header() {
  return (
    <HeaderV2
      title='超展开设置'
      hm={HM}
      // headerRight={() => (
      //   <HeaderV2Popover
      //     data={DATA}
      //     onSelect={title => {
      //       if (title === TEXT_MENU_BROWSER) open(HTML_PRIVACY())

      //       t('超展开设置.右上角菜单', {
      //         key: title
      //       })
      //     }}
      //   />
      // )}
    />
  )
}

export default ob(Header, COMPONENT)
