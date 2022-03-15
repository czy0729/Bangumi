/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:23:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 01:40:52
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import Sort from './sort'

function Header(props, { $ }) {
  return (
    <CompHeader
      title='好友'
      headerTitleAlign='left'
      headerTitleStyle={_.ml._md}
      hm={[$.url, 'Friends']}
      headerRight={() => (
        <Flex>
          <Sort $={$} />
          <CompHeader.Popover
            data={['浏览器查看']}
            onSelect={key => {
              if (key === '浏览器查看') {
                t('好友.右上角菜单', { key })
                open($.url)
              }
            }}
          >
            <Heatmap id='好友.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header)
