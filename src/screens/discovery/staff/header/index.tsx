/*
 * @Author: czy0729
 * @Date: 2022-03-12 23:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 08:08:18
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { HOST, STORYBOOK, URL_SPA } from '@constants'

const TEXT_BROWSER = '浏览器查看'
const TEXT_SPA = '网页版查看'
const DATA = [TEXT_BROWSER]
if (!STORYBOOK) DATA.push(TEXT_SPA)

function Header() {
  return (
    <CompHeader
      title='新番'
      hm={['user/lilyurey/index', 'Staff']}
      headerRight={() => (
        <CompHeader.Popover
          data={DATA}
          onSelect={key => {
            t('新番档期.右上角菜单', {
              key
            })

            if (key === TEXT_BROWSER) {
              open(`${HOST}/user/lilyurey/index`)
            } else if (key === TEXT_SPA) {
              const url = `${URL_SPA}/${getSPAParams('Staff')}`
              open(url)
            }
          }}
        >
          <Heatmap id='新番档期.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default ob(Header)
