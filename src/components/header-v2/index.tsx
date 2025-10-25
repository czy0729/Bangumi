/*
 * @Author: czy0729
 * @Date: 2024-11-22 07:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 15:41:14
 */
import React, { useEffect } from 'react'
import { useNavigation, useObserver } from '@utils/hooks'
import { Track } from '../track'
import Header from './header'
import HeaderV2Popover from './popover'
import { COMPONENT } from './ds'

import type { Props as HeaderV2Props } from './types'

export { HeaderV2Popover }

export type { HeaderV2Props }

export const HeaderV2 = ({
  transparent,
  backgroundStyle,
  title,
  domTitle,
  hm,
  alias,
  headerTitleAlign,
  headerTitleStyle,
  headerTitleSize,
  headerTitleAppend,
  headerRight
}: HeaderV2Props) => {
  const navigation = useNavigation(COMPONENT)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: false,
      headerShadowVisible: false,
      headerRight
    })
  }, [navigation, headerRight])

  return useObserver(() => (
    <>
      <Header
        style={backgroundStyle}
        transparent={transparent}
        title={title}
        headerTitleAlign={headerTitleAlign}
        headerTitleStyle={headerTitleStyle}
        headerTitleSize={headerTitleSize}
        headerTitleAppend={headerTitleAppend}
        headerRight={headerRight}
      />
      <Track title={title} domTitle={domTitle} hm={hm} alias={alias} />
    </>
  ))
}

export default HeaderV2
