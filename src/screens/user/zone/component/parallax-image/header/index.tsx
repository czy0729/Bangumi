/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:35:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:50:36
 */
import React, { useMemo } from 'react'
import { Animated } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { Avatar } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { H_HEADER } from '../../../ds'
import { styles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Header({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  const { scrollY } = $
  const memoParallaxStyle = useMemo(
    () => ({
      opacity: scrollY.interpolate({
        inputRange: [
          -_.parallaxImageHeight,
          0,
          _.parallaxImageHeight - H_HEADER,
          _.parallaxImageHeight
        ],
        outputRange: [0, 0, 1, 1]
      })
    }),
    [scrollY]
  )

  const { avatar, nickname } = $.usersInfo

  return (
    <Animated.View style={stl(styles.parallaxWrap, style, memoParallaxStyle)}>
      <Flex style={styles.title}>
        <Avatar
          style={styles.avatar}
          size={28}
          src={$.src}
          borderWidth={0}
          fallbackSrc={avatar?.large}
        />
        <Text style={_.ml.sm} type='__plain__' align='center' bold shadow numberOfLines={1}>
          {HTMLDecode(nickname || $.params._name)}
        </Text>
      </Flex>
    </Animated.View>
  )
}

export default observer(Header)
