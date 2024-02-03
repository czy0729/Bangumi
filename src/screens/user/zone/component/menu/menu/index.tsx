/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:52:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-03 15:48:40
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
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

function Menu(props, context: Ctx) {
  const { $ } = context

  const data = [TEXT_BROWSER, TEXT_COPY_LINK, TEXT_COPY_SHARE]
  if (!STORYBOOK) data.push(TEXT_PM)
  data.push(TEXT_COLLECT, TEXT_FRIEND)

  if (!STORYBOOK) {
    if ($.users.connectUrl) {
      data.push(TEXT_CONNECT)
    } else if ($.users.disconnectUrl) {
      data.push(TEXT_DISCONNECT)
    }

    // data.push(TEXT_BLOCK)
    data.push(TEXT_IGNORE)
  }

  return (
    <View style={styles.touch}>
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
    </View>
  )
}

export default obc(Menu)
