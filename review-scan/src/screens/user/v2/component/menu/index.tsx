/*
 * @Author: czy0729
 * @Date: 2023-12-30 14:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 21:05:54
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont } from '@components'
import { IconBack, IconHeader, Popover } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { handleMenuPopoverPress, handleSettingPress, handleUserTimelinePress } from './utils'
import { COMPONENT, DATA_ME, DATA_OTHER } from './ds'
import { styles } from './styles'

function Menu() {
  const { $, navigation } = useStore<Ctx>()
  const { userId: paramsUserId } = $.params
  const { id, username, nickname } = $.usersInfo
  const isMe = !!id && $.myUserId === id
  return (
    <>
      {!!paramsUserId && (
        <View style={styles.back}>
          <IconBack navigation={navigation} color={_.__colorPlain__} />
        </View>
      )}
      <View style={paramsUserId ? styles.more : isMe ? styles.menu : styles.more}>
        <Popover
          style={styles.touch}
          data={isMe ? DATA_ME : DATA_OTHER}
          onSelect={key =>
            handleMenuPopoverPress(navigation, key, {
              id,
              userId: $.userId,
              username
            })
          }
        >
          <Flex style={styles.icon} justify='center'>
            <Iconfont name='md-menu' color={_.__colorPlain__} />
          </Flex>
          <Heatmap right={-40} id='我的.右上角菜单' />
        </Popover>
      </View>
      <View style={styles.timeline}>
        <IconHeader
          name='md-image-aspect-ratio'
          color={_.__colorPlain__}
          size={21}
          onPress={() =>
            handleUserTimelinePress(navigation, {
              id,
              nickname,
              paramsUserId,
              username
            })
          }
        />
      </View>
      {!paramsUserId && (
        <View style={styles.setting}>
          <IconHeader
            name='setting'
            color={_.__colorPlain__}
            onPress={() => handleSettingPress(navigation)}
          />
          <Heatmap id='我的.跳转' to='Setting' alias='设置' />
        </View>
      )}
    </>
  )
}

export default ob(Menu, COMPONENT)
