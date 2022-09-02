/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:00:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 04:25:32
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import HeaderTitle from '../header-title'
import { Ctx } from '../types'

function Header({ fixed }, { $ }: Ctx) {
  const { joinUrl, byeUrl } = $.groupInfo
  const data = ['浏览器查看', '小组成员']
  if (joinUrl) data.push('加入小组')
  if (byeUrl) data.push('退出小组')

  return (
    <CompHeader
      mode='transition'
      statusBarEventsType='Topic'
      fixed={fixed}
      title={$.groupInfo.title}
      alias='小组'
      hm={[$.url, 'Group']}
      headerTitle={<HeaderTitle $={$} />}
      headerRight={() => (
        <CompHeader.Popover
          data={data}
          onSelect={async key => {
            t('小组.右上角菜单', {
              key,
              groupId: $.groupId
            })

            switch (key) {
              case '浏览器查看':
                open($.url)
                break

              case '小组成员':
                open(`${HOST}/group/${$.groupId}/members`)
                break

              case '加入小组':
                await $.doJoin()
                this.updatePopover()
                break

              case '退出小组':
                await $.doBye()
                this.updatePopover()
                break

              default:
                break
            }
          }}
        >
          <Heatmap id='小组.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
