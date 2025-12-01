/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-01 21:19:54
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { colors } from '../styles'
import { Flex } from '../../flex'
import Back from '../back'
import Transition from '../transition'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

/** component-header */
function HeaderComponent({
  navigation,
  fixed,
  title,
  statusBarEventsType,
  headerTitle,
  headerLeft,
  headerRight,
  onBackPress
}: Props) {
  r(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  return useObserver(() => {
    const styles = memoStyles()
    const color = colors[statusBarEventsType] ? colors[statusBarEventsType](fixed) : undefined

    return (
      <Flex
        style={stl(styles.header, {
          height: headerHeight,
          paddingTop: statusBarHeight
        })}
      >
        <Transition fixed={fixed} title={title} headerTitle={headerTitle} />
        <Back style={styles.back} navigation={navigation} color={color} onPress={onBackPress} />
        {headerLeft}
        <Flex.Item />
        {!!headerRight && headerRight()}
      </Flex>
    )
  })
}

export default HeaderComponent
