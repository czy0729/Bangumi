/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:58:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 15:35:23
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { obc } from '@utils/decorators'
import { COMPONENT } from './ds'
import { Props } from './types'

function Header({ navigation, data, onSelect }: Props) {
  return (
    <HeaderComp
      title='VIB 数据月刊'
      hm={['vib', 'VIB']}
      headerRight={() => (
        <HeaderComp.Popover
          name='md-menu'
          data={['小组讨论', ...data]}
          onSelect={label => {
            if (label === '小组讨论') {
              navigation.push('Group', {
                groupId: 'qpz',
                _title: '评分与排名讨论会'
              })
              return
            }

            onSelect(data.findIndex(item => item === label))
          }}
        />
      )}
    />
  )
}

export default obc(Header, COMPONENT)
