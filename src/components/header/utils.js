/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:55:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-17 15:22:46
 */
import React, { useState, useCallback } from 'react'
import { _, systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/cn-char'
import { IOS } from '@constants'
import Back from './back'
import Transition, { headerTransitionHeight } from './transition'

const colors = {
  Subject: fixed => (_.isDark || !fixed ? '#fff' : '#000'),
  Tinygrail: () => _.colorTinygrailPlain
}
const backgroundColors = {
  Tinygrail: () => _.colorTinygrailContainer
}

export const updateHeader = ({
  // 必要
  navigation,
  title = '',
  headerTitleAlign,
  headerTitleStyle,
  headerRight,

  // 非必要
  mode,
  y = 0,
  fixed = false,
  headerTitle,
  statusBarEventsType
}) => {
  if (!navigation) return

  const _title = systemStore.setting.s2t ? s2t(title) : title
  const color = colors[statusBarEventsType]
    ? colors[statusBarEventsType](fixed)
    : undefined
  const backgroundColor = backgroundColors[statusBarEventsType]
    ? backgroundColors[statusBarEventsType](fixed)
    : undefined
  const options = {
    // header
    headerTransparent: !!mode,
    headerShown: true,
    headerStyle: {
      backgroundColor: backgroundColor || (mode ? 'transparent' : _.colorPlain),
      borderBottomWidth: 0,
      elevation: 0
    },

    // headerTitle
    headerTitle: mode ? '' : _title,
    headerTitleAlign: headerTitleAlign || (mode ? 'left' : 'center'),
    headerTitleStyle: {
      fontSize: 15,
      fontWeight: 'normal',
      ...headerTitleStyle
    },
    headerTintColor: color || _.colorTitle,

    // headerBack
    headerBackTitleVisible: false,
    headerLeftContainerStyle: {
      paddingLeft: 5
    },
    headerLeft: () => <Back navigation={navigation} color={color} />
  }

  if (headerRight) {
    options.headerRightContainerStyle = {
      paddingRight: 6
    }
    options.headerRight = headerRight
  }

  if (mode) {
    options.headerBackground = () => (
      <Transition y={y} fixed={fixed} title={_title} headerTitle={headerTitle} />
    )
  }

  // platform fixed
  if (IOS) {
  } else {
    options.headerTitleStyle.fontFamily = ''
  }

  navigation.setOptions(options)
}

export const useOnScroll = () => {
  const [y, setY] = useState(0)
  const [fixed, setFixed] = useState(false)
  const onScroll = useCallback(
    ({ nativeEvent }) => {
      const { y } = nativeEvent.contentOffset
      if (y <= headerTransitionHeight) {
        setY(y)
      }

      const offset = headerTransitionHeight
      if ((fixed && y > offset) || (!fixed && y <= offset)) return
      setY(headerTransitionHeight)
      setFixed(y > offset)
    },
    [fixed]
  )

  return {
    y,
    fixed,
    onScroll
  }
}
