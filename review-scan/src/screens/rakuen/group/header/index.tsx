/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:00:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-08 11:06:19
 */
import React from 'react'
import { Flex, Header as HeaderComp, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST, HTML_NEW_TOPIC, TEXT_MENU_BROWSER } from '@constants'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header({ fixed }) {
  const { $, navigation } = useStore<Ctx>()
  const { joinUrl, byeUrl } = $.groupInfo
  const data = [TEXT_MENU_BROWSER, '小组成员']
  if (joinUrl) data.push('加入小组')
  if (byeUrl) data.push('退出小组')

  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Topic'
      fixed={fixed}
      title={$.groupInfo.title}
      alias='小组'
      hm={$.hm}
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
          <HeaderV2Popover
            data={data}
            onSelect={async title => {
              switch (title) {
                case TEXT_MENU_BROWSER:
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
                key: title,
                groupId: $.groupId
              })
            }}
          />
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
