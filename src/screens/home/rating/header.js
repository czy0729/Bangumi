/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 17:59:02
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { HOST } from '@constants'
import Filter from './filter'

function Header(props, { $ }) {
  return (
    <CompHeader
      title={$.params?.name || '用户评分'}
      headerTitleAlign='left'
      headerTitleStyle={_.ml._md}
      alias='用户评分'
      hm={[`${HOST}/subject/${$.subjectId}/collections`, 'Rating']}
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
