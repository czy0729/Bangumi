/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 05:32:12
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { URL_SPA } from '@constants'
import RecSegement from '../component/rec-segment'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_SPA } from './ds'

function Header(_props, { $ }: Ctx) {
  return (
    <HeaderComp
      title='标签'
      alias='标签索引'
      hm={[$.url, 'Tags']}
      headerTitleAlign='left'
      headerRight={() => (
        <Flex>
          {!!$.state._loaded && <RecSegement value={$.state.rec} onValueChange={$.onValueChange} />}
          <HeaderComp.Popover
            data={DATA}
            onSelect={key => {
              t('标签索引.右上角菜单', {
                key
              })

              if (key === TEXT_BROWSER) {
                open($.url)
                return
              }

              if (key === TEXT_SPA) {
                const url = `${URL_SPA}/${getSPAParams('Tags')}`
                open(url)
                return
              }
            }}
          >
            <Heatmap id='标签索引.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
