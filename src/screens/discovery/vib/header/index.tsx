/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:58:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 21:16:54
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { Navigation } from '@types'
import { DATA } from '../ds'
import { COMPONENT } from './ds'

function Header({
  navigation,
  onSelect
}: {
  navigation: Navigation
  onSelect: (index: number) => void
}) {
  return (
    <HeaderComp
      title='VIB 数据月刊'
      hm={['vib', 'VIB']}
      headerRight={() => (
        <HeaderComp.Popover
          name='md-menu'
          data={['小组讨论', ...DATA.map(item => item.title)]}
          onSelect={label => {
            if (label === '小组讨论') {
              navigation.push('Group', {
                groupId: 'qpz',
                _title: '评分与排名讨论会'
              })
              return
            }

            onSelect(DATA.findIndex(item => item.title === label))
          }}
        />
      )}
    />
  )
}

export default obc(Header, COMPONENT)
