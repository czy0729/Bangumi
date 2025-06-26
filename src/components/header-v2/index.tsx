/*
 * @Author: czy0729
 * @Date: 2024-11-22 07:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 15:31:51
 */
import React, { useEffect } from 'react'
import { r } from '@utils/dev'
import { useNavigation, useObserver } from '@utils/hooks'
import { Track } from '../track'
import Header from './header'
import HeaderV2Popover from './popover'
import { COMPONENT } from './ds'
import { Props as HeaderV2Props } from './types'

export { HeaderV2Props, HeaderV2Popover }

export const HeaderV2 = ({
  transparent,
  backgroundStyle,
  title,
  domTitle,
  hm,
  alias,
  headerTitleAlign,
  headerTitleStyle,
  headerTitleAppend,
  headerRight
}: HeaderV2Props) => {
  r(COMPONENT)

  const navigation = useNavigation()
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
        headerTitleAppend={headerTitleAppend}
        headerRight={headerRight}
      />
      <Track title={title} domTitle={domTitle} hm={hm} alias={alias} />
    </>
  ))
}

export default HeaderV2
