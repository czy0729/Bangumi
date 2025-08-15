/*
 * @Author: czy0729
 * @Date: 2019-09-14 20:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:22:04
 */
import React from 'react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { ReactNode } from '@types'
import { Ctx } from '../../types'
import Assets from '../assets'
import MenuItem from '../menu-item'
import { COMPONENT, MENU_ITEMS } from './ds'

function Menus() {
  const { $ } = useStore<Ctx>()
  const bid = $.list('bid').list.length
  const asks = $.list('asks').list.length
  const auction = $.list('auction').list.filter(item => item.state === 0).length
  const assetsIndex = MENU_ITEMS.findIndex(item => item.title === '资产')
  const counts = { bid, asks, auction }

  return (
    <Flex style={_.mt.xs} wrap='wrap'>
      {MENU_ITEMS.map((item, index) => {
        if (item.title === '资产') return <Assets key='assets' />

        let title: string | ReactNode = ''
        if ('dynamicTitle' in item && typeof item.dynamicTitle === 'function') {
          title = item.dynamicTitle(item.title, counts[item?.config?.type || 'bid'])
        } else {
          title = item.title
        }

        return (
          <MenuItem
            key={item.pathname}
            index={index > assetsIndex ? index + 1 : index}
            style={'style' in item ? item.style() : undefined}
            title={title}
            pathname={item.pathname}
            icon={item.icon}
            config={'config' in item ? item.config : undefined}
          />
        )
      })}
    </Flex>
  )
}

export default ob(Menus, COMPONENT)
