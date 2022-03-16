/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 18:04:22
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import Extra from './extra'

function Header(props, { $ }) {
  return (
    <CompHeader
      title='索引'
      hm={[$.url, 'Browser']}
      headerRight={() => (
        <Flex>
          <Extra $={$} />
          <CompHeader.Popover
            data={['浏览器查看']}
            onSelect={key => {
              if (key === '浏览器查看') {
                t('索引.右上角菜单', { key })
                open($.url)
              }
            }}
          >
            <Heatmap id='索引.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header)
