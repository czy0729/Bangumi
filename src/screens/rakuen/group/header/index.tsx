/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:00:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 03:08:39
 */
import React from 'react'
import { Flex, Header as HeaderComp, Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, HTML_NEW_TOPIC } from '@constants'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header({ fixed }, { $, navigation }: Ctx) {
  const { joinUrl, byeUrl } = $.groupInfo
  const data = ['浏览器查看', '小组成员']
  if (joinUrl) data.push('加入小组')
  if (byeUrl) data.push('退出小组')

  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Topic'
      fixed={fixed}
      title={$.groupInfo.title}
      alias='小组'
      hm={[$.url, 'Group']}
      headerTitle={<HeaderTitle $={$} />}
      headerRight={() => (
        <Flex style={styles.headerRight}>
          <IconTouchable
            style={_.mr.sm}
            name='md-edit'
            size={18}
            color={_.colorTitle}
            onPress={() => {
              const url = HTML_NEW_TOPIC(String($.groupId))
              navigation.push('WebBrowser', {
                url,
                title: '添加新讨论',
                desc: '发帖组件复杂并没有重新开发实装。若你看见的不是发帖页面，请先在此页面进行登录。请务必刷新一下验证码再登录。成功后点击右上方刷新页面。',
                injectedViewport: true
              })

              t('小组.跳转', {
                to: 'WebBrowser',
                url
              })
            }}
          />
          <HeaderComp.Popover
            data={data}
            onSelect={async key => {
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

              t('小组.右上角菜单', {
                key,
                groupId: $.groupId
              })
            }}
          >
            <Heatmap id='小组.右上角菜单' />
          </HeaderComp.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
