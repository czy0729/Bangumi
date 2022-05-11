/*
 * @Author: czy0729
 * @Date: 2022-05-11 04:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-11 04:32:32
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'

function Header() {
  return (
    <CompHeader
      title='自定义源头'
      hm={['origin-setting', 'OriginSetting']}
      headerRight={() => (
        <CompHeader.Popover
          data={['说明文档']}
          onSelect={key => {
            if (key === '说明文档') {
              t('自定义源头.右上角菜单', { key })
              open('https://www.yuque.com/chenzhenyu-k0epm/znygb4/brbd33')
            }
          }}
        >
          <Heatmap id='自定义源头.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default ob(Header)
