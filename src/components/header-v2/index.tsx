/*
 * @Author: czy0729
 * @Date: 2024-11-22 07:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 02:16:45
 */
import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { useNavigation } from '@utils/hooks'
import { Track } from '../track'
import Header from './header'
import HeaderV2Popover from './popover'
import { COMPONENT } from './ds'

export { HeaderV2Popover }

import type { Props as HeaderV2Props } from './types'
export type { HeaderV2Props }

export const HeaderV2 = observer(
  ({
    transparent,
    backgroundStyle,
    title,
    domTitle,
    hm,
    alias,
    color,
    headerTitleAlign,
    headerTitleStyle,
    headerTitleSize,
    headerTitleAppend,
    headerTitleTextStyle,
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

    return (
      <>
        <Header
          style={backgroundStyle}
          transparent={transparent}
          title={title}
          color={color}
          headerTitleAlign={_.device(headerTitleAlign, 'center')}
          headerTitleStyle={_.device(
            headerTitleStyle,
            _.flatten([
              headerTitleStyle,
              {
                paddingRight: 0
              }
            ])
          )}
          headerTitleSize={headerTitleSize}
          headerTitleAppend={headerTitleAppend}
          headerTitleTextStyle={headerTitleTextStyle}
          headerRight={headerRight}
        />
        <Track title={title} domTitle={domTitle} hm={hm} alias={alias} />
      </>
    )
  }
)

export default HeaderV2
