/*
 * @Author: czy0729
 * @Date: 2024-02-01 18:24:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-01 18:33:48
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_PRIVACY } from '@constants'
import { COMPONENT } from './ds'

const TEXT_BROWSER = '浏览器查看'
const DATA = [TEXT_BROWSER]

function Header() {
  return (
    <HeaderComp
      title='超展开设置'
      hm={['rakuen/settings', 'RakuenSetting']}
      headerRight={() => (
        <HeaderComp.Popover
          data={DATA}
          onSelect={key => {
            t('超展开设置.右上角菜单', {
              key
            })

            if (key === TEXT_BROWSER) open(HTML_PRIVACY())
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
