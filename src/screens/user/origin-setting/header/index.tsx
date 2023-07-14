/*
 * @Author: czy0729
 * @Date: 2022-05-11 04:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-13 07:40:31
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'

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

export default obc(Header)
