/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:56:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:51:13
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(_props, { navigation }: Ctx) {
  return (
    <HeaderComp
      title='Bangumi 半月刊'
      hm={['biweekly', 'BiWeekly']}
      headerRight={() => (
        <HeaderComp.Popover
          name='md-menu'
          data={['小组讨论', '浏览器查看']}
          onSelect={label => {
            t('半月刊.右上角菜单', {
              label
            })

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
