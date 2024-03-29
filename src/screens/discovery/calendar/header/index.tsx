/*
 * @Author: czy0729
 * @Date: 2022-03-11 01:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 12:31:44
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, URL_SPA } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_INFOR, TEXT_SPA } from './ds'

function Header(props, { navigation }: Ctx) {
  return (
    <CompHeader
      title='每日放送'
      hm={['calendar', 'Calendar']}
      headerRight={() => (
        <CompHeader.Popover
          data={DATA}
          onSelect={key => {
            t('每日放送.右上角菜单', {
              key
            })

            if (key === TEXT_BROWSER) {
              open(`${HOST}/calendar`)
              return
            }

            if (key === TEXT_SPA) {
              const url = `${URL_SPA}/${getSPAParams('Calendar')}`
              open(url)
              return
            }

            if (key === TEXT_INFOR) {
              navigation.push('Information', {
                title: '每日放送数据',
                message: [
                  '客户端内每日放送数据是由多方数据整合而成的。',
                  '1：官方每日放送 API 作为当季放送原始列表项。',
                  '2：从 bangumi-data 库中获取放送具体时间和站点，若该番剧并没有具体时间，会默认收起以免长期占据显示位置，需要你自行展开列表。',
                  '3：标签和动画制作数据摘取自 https://yuc.wiki。'
                ]
              })
            }
          }}
        >
          <Heatmap id='每日放送.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
