/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:55:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-05 04:20:07
 */
import React, { useState, useCallback } from 'react'
import { _, systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/cn-char'
import { IOS } from '@constants'
import Back from './back'
import { colors, backgroundColors } from './styles'

const headerTransitionHeight = 56

export const updateHeader = ({
  // 必要
  navigation,
  title = '',
  headerTitleAlign,
  headerTitleStyle,
  headerRight,

  // 非必要
  mode,
  fixed = false,
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
    headerTransparent: false,
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

  /**
   * @bug
   *
   * 这个应该是react-navigation@5或者react-screens的内部问题
   * 部分vivo 华为机型有非常诡异的bug
   * headerTransparent不能为true, height不能为0, position不能为absolute, backgroundColor不能为透明
   * 只要你试图用任何手段让header看不见, 就会触发当前页面背景色丢失, 看见前一个页面内容的bug!
   * 现在通过一些hack手段, 自己模拟一个<HeaderComponent>去避免这个问题
   */
  if (mode) {
    options.headerStyle = {
      ...options.headerStyle,
      height: 0.5, // 别问为什么留0.5, 我也想知道, 不给他留一点就是会出问题
      backgroundColor: _.colorPlain
    }

    // headerLeft和headerRight因为上面的问题迁移到了<HeaderComponent>里面实现
    options.headerLeft = () => null
    options.headerRight = () => null
  }

  // platform fixed
  if (IOS) {
  } else {
    // 文字至少留一个fontFamily, 不然可能会触发文字截断bug
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
