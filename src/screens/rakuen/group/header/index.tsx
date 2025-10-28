/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:00:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-27 15:41:21
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Header as HeaderComp, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import {
  HOST,
  HTML_NEW_TOPIC,
  TEXT_MENU_BROWSER,
  TEXT_MENU_GROUP_JOIN,
  TEXT_MENU_GROUP_MEMBER,
  TEXT_MENU_GROUP_QUIT,
  TEXT_MENU_SPLIT,
  TEXT_MENU_SPLIT_LEFT,
  TEXT_MENU_SPLIT_RIGHT,
  TEXT_MENU_TIME_FORMAT,
  TEXT_MENU_TIME_FORMAT_LASTDATE,
  TEXT_MENU_TIME_FORMAT_REGULAR
} from '@constants'
import HeaderTitle from '../component/header-title'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'
import type { Props } from './types'

function Header({ fixed }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { groupId, url } = $
    const { showLastDate } = $.state
    const { joinUrl, byeUrl, title } = $.groupInfo

    const memoData = useMemo(() => {
      const data = [TEXT_MENU_BROWSER, TEXT_MENU_GROUP_MEMBER]
      if (joinUrl) data.push(TEXT_MENU_GROUP_JOIN)
      if (byeUrl) data.push(TEXT_MENU_GROUP_QUIT)
      data.push(
        TEXT_MENU_SPLIT,
        `${TEXT_MENU_TIME_FORMAT}${TEXT_MENU_SPLIT_LEFT}${
          showLastDate ? TEXT_MENU_TIME_FORMAT_LASTDATE : TEXT_MENU_TIME_FORMAT_REGULAR
        }${TEXT_MENU_SPLIT_RIGHT}`
      )

      return data
    }, [byeUrl, joinUrl, showLastDate])

    const handleEditPress = useCallback(() => {
      const url = HTML_NEW_TOPIC(String(groupId))
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
    }, [groupId])

    const handleSelect = useCallback(
      async (title: string) => {
        if (title === 'TEXT_MENU_SPLIT') return

        const actions = {
          [TEXT_MENU_BROWSER]: () => open(url),
          [TEXT_MENU_GROUP_MEMBER]: () => open(`${HOST}/group/${groupId}/members`),
          [TEXT_MENU_GROUP_JOIN]: () => $.doJoin(),
          [TEXT_MENU_GROUP_QUIT]: () => $.doBye()
        } as const

        if (title.startsWith(TEXT_MENU_TIME_FORMAT)) {
          $.onToggleShowLastDate()
        } else {
          await actions[title]?.()
        }

        t('小组.右上角菜单', {
          key: title,
          groupId
        })
      },
      [groupId, url]
    )

    return (
      <HeaderComp
        mode='transition'
        statusBarEventsType='Topic'
        fixed={fixed}
        title={title}
        alias='小组'
        hm={$.hm}
        headerTitle={<HeaderTitle />}
        headerRight={() => (
          <Flex style={styles.headerRight}>
            <IconTouchable
              style={_.mr.sm}
              name='md-edit'
              size={18}
              color={_.colorTitle}
              onPress={handleEditPress}
            />
            <HeaderV2Popover data={memoData} onSelect={handleSelect} />
          </Flex>
        )}
      />
    )
  })
}

export default Header
