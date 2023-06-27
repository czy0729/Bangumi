/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:56:33
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { URL_SPA } from '@constants'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='索引'
      hm={[$.url, 'Browser']}
      headerRight={() => (
        <Flex>
          <CompHeader.Popover
            data={['浏览器查看', '网页版查看']}
            onSelect={key => {
              t('索引.右上角菜单', {
                key
              })

              if (key === '浏览器查看') {
                open($.url)
              } else if (key === '网页版查看') {
                const url = `${URL_SPA}/${getSPAParams('Browser')}`
                open(url)
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
