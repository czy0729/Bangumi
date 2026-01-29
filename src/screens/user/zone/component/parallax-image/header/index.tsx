/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:35:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:14:18
 */
import React, { useMemo } from 'react'
import { Animated } from 'react-native'
import { Flex, Text } from '@components'
import { Avatar } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { H_HEADER } from '../../../store'
import { styles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Header({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
          <Text
            style={_.ml.sm}
            type={_.select('plain', 'title')}
            align='center'
            bold
            shadow
            numberOfLines={1}
          >
            {HTMLDecode(nickname || $.params._name)}
          </Text>
        </Flex>
      </Animated.View>
    )
  })
}

export default Header
