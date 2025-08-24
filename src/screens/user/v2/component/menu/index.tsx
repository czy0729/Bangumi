/*
 * @Author: czy0729
 * @Date: 2023-12-30 14:44:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-23 16:12:31
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex, Heatmap, Iconfont } from '@components'
import { IconBack, IconHeader, Popover } from '@_'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { handleMenuPopoverPress, handleSettingPress, handleUserTimelinePress } from './utils'
import { COMPONENT, DATA_ME, DATA_OTHER } from './ds'
import { styles } from './styles'
import { MenuLabel } from './types'

function Menu() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

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
          <View style={styles.back}>
            <IconBack navigation={navigation} color={_.__colorPlain__} />
          </View>
        )}
        <View style={paramsUserId ? styles.more : self ? styles.menu : styles.more}>
          <Popover style={styles.touch} data={memoData} onSelect={handleSelect}>
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
          <View style={styles.setting}>
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
