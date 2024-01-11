/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 05:28:54
 */
import React from 'react'
import { Flex, Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { URL_SPA } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_SPA } from './ds'

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

export default obc(Header, COMPONENT)
