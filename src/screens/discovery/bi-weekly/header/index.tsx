/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:56:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-14 06:00:57
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { HOST } from '@constants'
import { Navigation } from '@types'
import { COMPONENT } from './ds'

function Header({ navigation }: { navigation: Navigation }) {
  return (
    <HeaderComp
      title='Bangumi 半月刊'
      hm={['biweekly', 'BiWeekly']}
      headerRight={() => (
        <HeaderComp.Popover
          name='md-menu'
          data={['小组讨论', '浏览器查看']}
          onSelect={label => {
            if (label === '小组讨论') {
              navigation.push('Group', {
                groupId: 'biweekly',
                _title: 'Bangumi半月刊'
              })
              return
            }

            if (label === '浏览器查看') {
              open(`${HOST}/group/biweekly`)
              return
            }
          }}
        />
      )}
    />
  )
}

export default obc(Header, COMPONENT)
