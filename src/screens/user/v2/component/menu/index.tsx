/*
 * @Author: czy0729
 * @Date: 2023-12-30 14:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:58:29
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont } from '@components'
import { IconBack, IconHeader, Popover } from '@_'
import { _, useStore } from '@stores'
import { useInsets, useObserver } from '@utils/hooks'
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

  return useObserver(() => {
    const { userId } = $
    const { userId: paramsUserId } = $.params
    const { id, username, nickname } = $.usersInfo
    const self = !!id && $.myUserId === id

    const memoData = useMemo(() => (self ? DATA_ME : DATA_OTHER), [self])

    const handleSelect = useCallback(
      (key: MenuLabel) => {
        handleMenuPopoverPress(navigation, key, {
          id,
          userId,
          username
        })
      },
      [id, userId, username]
    )

    return (
      <>
        {!!paramsUserId && (
          <View style={[header.left, styles.back]}>
            <IconBack navigation={navigation} color={_.__colorPlain__} />
          </View>
        )}
        <View
          style={
            paramsUserId
              ? [header.right, styles.more]
              : self
              ? [header.left, styles.menu]
              : [header.right, styles.more]
          }
        >
          <Popover style={styles.touch} data={memoData} onSelect={handleSelect}>
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='md-menu' color={_.__colorPlain__} />
            </Flex>
            <Heatmap right={-40} id='我的.右上角菜单' />
          </Popover>
        </View>
        <View style={[header.right, styles.timeline]}>
          <IconHeader
            name='md-image-aspect-ratio'
            color={_.__colorPlain__}
            size={21}
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
  })
}

export default Menu
