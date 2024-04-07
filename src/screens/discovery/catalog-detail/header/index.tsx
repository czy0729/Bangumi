/*
 * @Author: czy0729
 * @Date: 2022-03-11 23:02:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 22:44:35
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { userStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, URL_SPA } from '@constants'
import IconCopy from '../component/icon-copy'
import IconFavor from '../component/icon-favor'
import { Ctx } from '../types'
import { COMPONENT, DATA, TEXT_BROWSER, TEXT_SPA } from './ds'

function Header({ fixed }, { $, navigation }: Ctx) {
  const catalogDetail = $.catalogDetail.title ? $.catalogDetail : $.catalogDetailFromOSS
  return (
    <HeaderComp
      mode='float'
      fixed={fixed}
      title={catalogDetail.title}
      alias='目录详情'
      hm={[`index/${$.catalogId}`, 'CatalogDetail']}
      headerRight={() => (
        <Flex>
          {userStore.isLogin && <IconCopy $={$} navigation={navigation} />}
          {!!(catalogDetail.joinUrl || catalogDetail.byeUrl) && <IconFavor $={$} />}
          <HeaderComp.Popover
            data={DATA}
            onSelect={key => {
              t('目录详情.右上角菜单', {
                key
              })

              if (key === TEXT_BROWSER) {
                open(`${HOST}/index/${$.catalogId}`)
              } else if (key === TEXT_SPA) {
                const url = `${URL_SPA}/${getSPAParams('CatalogDetail', {
                  catalogId: $.catalogId
                })}`
                open(url)
              }
            }}
          >
            <Heatmap id='目录详情.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
