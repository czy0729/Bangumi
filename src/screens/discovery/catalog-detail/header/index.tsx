/*
 * @Author: czy0729
 * @Date: 2022-03-11 23:02:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 15:34:56
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { HOST, URL_SPA } from '@constants'
import IconCopy from '../icon-copy'
import IconFavor from '../icon-favor'
import { Ctx } from '../types'

function Header({ fixed }, { $, navigation }: Ctx) {
  const { title, joinUrl, byeUrl } = $.catalogDetail
  return (
    <CompHeader
      mode='float'
      fixed={fixed}
      title={title}
      alias='目录详情'
      hm={[`index/${$.catalogId}`, 'CatalogDetail']}
      headerRight={() => (
        <Flex>
          <IconCopy $={$} navigation={navigation} />
          {!!(joinUrl || byeUrl) && <IconFavor $={$} />}
          <CompHeader.Popover
            data={['浏览器查看', '网页版查看']}
            onSelect={key => {
              t('目录详情.右上角菜单', {
                key
              })

              if (key === '浏览器查看') {
                open(`${HOST}/index/${$.catalogId}`)
              } else if (key === '网页版查看') {
                const url = `${URL_SPA}/${getSPAParams('CatalogDetail', {
                  catalogId: $.catalogId
                })}`
                open(url)
              }
            }}
          >
            <Heatmap id='目录详情.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header)
