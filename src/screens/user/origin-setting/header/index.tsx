/*
 * @Author: czy0729
 * @Date: 2022-05-11 04:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:01:36
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'

function Header() {
  const navigation = useNavigation()
  return (
    <HeaderComp
      title='自定义源头'
      hm={['origin-setting', 'OriginSetting']}
      headerRight={() => (
        <HeaderComp.Popover
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
        </HeaderComp.Popover>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
