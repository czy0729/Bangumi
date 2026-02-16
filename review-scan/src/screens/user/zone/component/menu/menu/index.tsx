/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:52:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:05:12
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../../types'
import { handleSelect } from './utils'
import {
  TEXT_BROWSER,
  TEXT_COLLECT,
  TEXT_CONNECT,
  TEXT_COPY_LINK,
  TEXT_COPY_SHARE,
  TEXT_DISCONNECT,
  TEXT_FRIEND,
  TEXT_IGNORE,
  TEXT_PM
} from './ds'
import { styles } from './styles'

function Menu() {
  const context = useStore<Ctx>()
  const { $ } = context

  const data = [TEXT_BROWSER, TEXT_COPY_LINK, TEXT_COPY_SHARE]
  if (!WEB) data.push(TEXT_PM)
  data.push(TEXT_COLLECT, TEXT_FRIEND)

  if (!WEB) {
    if ($.users.connectUrl) {
      data.push(TEXT_CONNECT)
    } else if ($.users.disconnectUrl) {
      data.push(TEXT_DISCONNECT)
    }
    data.push(TEXT_IGNORE)
  }

  return (
    <Popover
      key={$.usersInfo.id || $.usersInfo.username}
      data={data}
      onSelect={key => handleSelect(key, context)}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-more-vert' color={_.__colorPlain__} />
      </Flex>
      <Heatmap id='空间.右上角菜单' />
      <Heatmap right={62} id='空间.添加好友' transparent />
      <Heatmap right={113} id='空间.解除好友' transparent />
      <Heatmap right={170} id='空间.跳转' to='WebBrowser' alias='浏览器' transparent />
    </Popover>
  )
}

export default ob(Menu)
