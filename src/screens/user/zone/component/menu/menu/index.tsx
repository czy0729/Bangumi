/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:52:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-30 05:32:02
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import {
  TEXT_MENU_CONNECT,
  TEXT_MENU_DISCONNECT,
  TEXT_MENU_IGNORE,
  TEXT_MENU_REPORT,
  WEB
} from '@constants'
import { MENU_ACTIONS, MENU_DS } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Menu() {
  const context = useStore<Ctx>()
  const { $ } = context

  return useObserver(() => {
    const { connectUrl, disconnectUrl } = $.users
    const userId = $.usersInfo.id || $.usersInfo.username

    const memoData = useMemo(() => {
      const data = [...MENU_DS]
      if (!WEB) {
        if (connectUrl) {
          data.push(TEXT_MENU_CONNECT)
        } else if (disconnectUrl) {
          data.push(TEXT_MENU_DISCONNECT)
        }
        data.push(TEXT_MENU_IGNORE, TEXT_MENU_REPORT)
      }
      return data
    }, [connectUrl, disconnectUrl])

    const handleSelect = useCallback(
      (key: string) => {
        if (key in MENU_ACTIONS) MENU_ACTIONS[key](context)

        t('空间.右上角菜单', {
          key,
          userId
        })
      },
      [userId]
    )

    return (
      <Popover key={userId} data={memoData} onSelect={handleSelect}>
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-more-vert' color={_.__colorPlain__} />
        </Flex>
        <Heatmap id='空间.右上角菜单' />
        <Heatmap right={62} id='空间.添加好友' transparent />
        <Heatmap right={113} id='空间.解除好友' transparent />
        <Heatmap right={170} id='空间.跳转' to='WebBrowser' alias='浏览器' transparent />
      </Popover>
    )
  })
}

export default Menu
