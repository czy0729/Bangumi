/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:37:47
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import Filter from '../filter'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title={$.params?.name || '用户评分'}
      headerTitleAlign='left'
      headerTitleStyle={_.ml._md}
      alias='用户评分'
      hm={[$.url, 'Rating']}
      headerRight={() => (
        <Flex>
          <Filter $={$} />
          <CompHeader.Popover
            data={['浏览器查看']}
            onSelect={key => {
              if (key === '浏览器查看') {
                t('用户评分.右上角菜单', { key })
                open($.url)
              }
            }}
          >
            <Heatmap id='用户评分.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header)
