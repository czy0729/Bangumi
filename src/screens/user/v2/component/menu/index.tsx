/*
 * @Author: czy0729
 * @Date: 2023-12-30 14:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-23 22:27:57
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont } from '@components'
import { IconBack, IconHeader, Popover } from '@_'
import { _, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { IOS } from '@constants'
import { IS_IOS_5_6_7_8 } from '@styles'
import { handleMenuPopoverPress, handleSettingPress, handleUserTimelinePress } from './utils'
import { COMPONENT, DATA_ME, DATA_OTHER } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { MenuLabel } from './types'

function Menu() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { statusBarHeight } = useInsets()

  const header = useMemo(
    () =>
      ({
        left: {
          position: 'absolute',
          top: IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12,
          left: 4
        },
        right: {
          position: 'absolute',
          top: IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12,
          right: 8
        }
      } as const),
    [statusBarHeight]
  )

  const { userId, isMe } = $
  const { userId: paramsUserId } = $.params
  const { id, username, nickname } = $.usersInfo

  const handleSelect = useCallback(
    (key: MenuLabel) => {
      handleMenuPopoverPress(navigation, key, {
        id,
        userId,
        username
      })
    },
    [id, navigation, userId, username]
  )

  return (
    <>
      {!!paramsUserId && (
        <View style={[header.left, styles.back]}>
          <IconBack navigation={navigation} color={_.__colorPlain__} shadow />
        </View>
      )}
      <View
        style={
          paramsUserId
            ? [header.right, styles.more]
            : isMe
            ? [header.left, styles.menu]
            : [header.right, styles.more]
        }
      >
        <Popover style={styles.touch} data={isMe ? DATA_ME : DATA_OTHER} onSelect={handleSelect}>
          <Flex style={styles.icon} justify='center'>
            <Iconfont name='md-menu' color={_.__colorPlain__} shadow />
          </Flex>
          <Heatmap right={-40} id='我的.右上角菜单' />
        </Popover>
      </View>
      <View style={[header.right, styles.timeline]}>
        <IconHeader
          name='md-image-aspect-ratio'
          color={_.__colorPlain__}
          size={21}
          shadow
          onPress={() => {
            handleUserTimelinePress(navigation, {
              id,
              nickname,
              paramsUserId,
              username
            })
          }}
        />
      </View>
      {!paramsUserId && (
        <View style={[header.right, styles.setting]}>
          <IconHeader
            name='setting'
            shadow
            color={_.__colorPlain__}
            onPress={() => {
              handleSettingPress(navigation)
            }}
          />
          <Heatmap id='我的.跳转' to='Setting' alias='设置' />
        </View>
      )}
    </>
  )
}

export default observer(Menu)
