/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 08:05:00
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { STORYBOOK, URL_SPA } from '@constants'
import { Ctx } from '../types'

const TEXT_BROWSER = '浏览器查看'
const TEXT_SPA = '网页版查看'
const DATA = [TEXT_BROWSER]
if (!STORYBOOK) DATA.push(TEXT_SPA)

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='索引'
      hm={[$.url, 'Browser']}
      headerRight={() => (
        <Flex>
          <CompHeader.Popover
            data={DATA}
            onSelect={key => {
              t('索引.右上角菜单', {
                key
              })

              if (key === TEXT_BROWSER) {
                open($.url)
              } else if (key === TEXT_SPA) {
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
