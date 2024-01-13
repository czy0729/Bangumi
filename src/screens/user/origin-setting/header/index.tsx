/*
 * @Author: czy0729
 * @Date: 2022-05-11 04:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 16:29:07
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { navigation }: Ctx) {
  return (
    <CompHeader
      title='自定义源头'
      hm={['origin-setting', 'OriginSetting']}
      headerRight={() => (
        <CompHeader.Popover
          data={['说明']}
          onSelect={key => {
            t('自定义源头.右上角菜单', {
              key
            })

            if (key === '说明') {
              navigation.push('Tips', {
                key: 'qcgrso5g70d6gusf'
              })
            }
          }}
        >
          <Heatmap id='自定义源头.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
