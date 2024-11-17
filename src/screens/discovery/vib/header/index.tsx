/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:58:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:11:07
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
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

              t('评分月刊.跳转', {
                to: 'Group'
              })
              return
            }

            const index = data.findIndex(item => item === label)
            onSelect(index)

            t('评分月刊.选择', {
              title: data[index]
            })
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
