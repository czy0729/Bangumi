/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 15:39:13
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { STORYBOOK, URL_SPA } from '@constants'
import RecSegement from '../rec-segment'
import { Ctx } from '../types'

const TEXT_BROWSER = '浏览器查看'
const TEXT_SPA = '网页版查看'
const DATA = [TEXT_BROWSER]
if (!STORYBOOK) DATA.push(TEXT_SPA)

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='标签'
      alias='标签索引'
      hm={[$.url, 'Tags']}
      headerRight={() => (
        <>
          <RecSegement />
          <CompHeader.Popover
            data={DATA}
            onSelect={key => {
              t('标签索引.右上角菜单', {
                key
              })

              if (key === TEXT_BROWSER) {
                open($.url)
              } else if (key === TEXT_SPA) {
                const url = `${URL_SPA}/${getSPAParams('Tags')}`
                open(url)
              }
            }}
          >
            <Heatmap id='标签索引.右上角菜单' />
          </CompHeader.Popover>
        </>
      )}
    />
  )
}

export default obc(Header)
