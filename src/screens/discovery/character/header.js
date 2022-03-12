/*
 * @Author: czy0729
 * @Date: 2022-03-12 22:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 22:48:19
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { HOST } from '@constants'

function Header(props, { $ }) {
  return (
    <CompHeader
      title='用户人物'
      hm={['character', 'Character']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('收藏的人物.右上角菜单', { key })
              open(`${HOST}/user/${$?.params?.userName}/mono`)
            }
          }}
        >
          <Heatmap id='收藏的人物.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
