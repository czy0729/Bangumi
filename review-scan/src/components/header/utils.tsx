/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:55:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-13 17:42:13
 */
import React, { useCallback, useRef, useState } from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { IOS } from '@constants'
import { IOS_IPA } from '@src/config'
import Back from './back'
import { backgroundColors, colors, styles } from './styles'
import { UpdateHeaderProps } from './types'

export const HEADER_TRANSITION_HEIGHT = 32

/** 动态更新头参数 */
export const updateHeader = ({
  // 必要
  navigation,
  title = '',
  headerTitleAlign,
  headerTitleStyle,
  headerLeft,
  headerRight,

  // 非必要
  mode,
  fixed = false,
  statusBarEventsType,
  onBackPress
}: UpdateHeaderProps) => {
  if (!navigation) return

  const titleText = systemStore.setting.s2t ? s2t(title) : title
  const tintColor = colors[statusBarEventsType] ? colors[statusBarEventsType](fixed) : undefined
  const backgroundColor = backgroundColors[statusBarEventsType]
    ? backgroundColors[statusBarEventsType](fixed)
    : undefined
  const headerTitleStyles = [
    {
      fontSize: 15,
      fontWeight: 'normal'
    },
    IOS &&
      !!titleText &&
      headerTitleAlign === 'left' && {
        marginLeft: -18
      },
    headerTitleStyle
  ]
  if (!IOS) headerTitleStyles.push(_.fontStyle)

  const options = {
    /** ==================== header ==================== */
    headerShown: true,
    headerTransparent: false,
    headerShadowVisible: false,
    headerStyle: {
      height: undefined,
      paddingHorizontal: 0,
      backgroundColor: backgroundColor || (mode ? 'transparent' : _.colorPlain),
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0
    },

    /** ==================== headerBack ==================== */
    headerBackTitleVisible: false,
    headerLeftContainerStyle: {
      paddingLeft: 5
    },
    headerLeft: () => (
      <>
        <View style={styles.headerLeftContainerStyle}>
          <Back navigation={navigation} color={tintColor} onPress={onBackPress} />
        </View>
        {headerLeft}
      </>
    ),

    /** ==================== headerTitle ==================== */
    headerTitle: mode ? '' : titleText,
    headerTitleAlign: headerTitleAlign || (mode ? 'left' : 'center'),
    headerTitleStyle: headerTitleStyles,
    headerTintColor: tintColor || _.colorTitle,

    /** ==================== headerRight ==================== */
    headerRightContainerStyle: {},
    headerRight: undefined
  }

  if (headerRight) {
    options.headerRightContainerStyle = {
      paddingRight: 6
    }
    options.headerRight = () => (
      <View style={styles.headerRightContainerStyle}>{headerRight()}</View>
    )
  }

  if (mode) {
    options.headerShown = false

    /** headerLeft 和 headerRight 因为上面的问题迁移到了 HeaderComponent 里面实现 */
    options.headerLeft = () => null
    options.headerRight = () => null
    options.headerStyle = {
      ...options.headerStyle,
      backgroundColor: '#000000'
    }

    if (!IOS) {
      /**
       * @hack
       * 这个应该是 react-navigation@5 或者 react-screens 的内部问题
       * 部分 vivo 华为机型有非常诡异的 bug
       * headerTransparent 不能为 true, height 不能为 0, position 不能为 absolute, backgroundColor 不能为透明
       * 只要你试图用任何手段让 header 看不见, 就会触发当前页面背景色丢失, 看见前一个页面内容的 bug!
       * 现在通过一些 hack 手段, 自己模拟一个 HeaderComponent 去避免这个问题
       *
       * 别问为什么留 0.5 我也想知道,
       * 不给他留一点就是会出现页面重叠问题
       */
      options.headerStyle.height = 0.5
    } else {
      options.headerTransparent = true
    }
  }

  /*** @fixed 文字至少留一个 fontFamily, 不然可能会触发文字截断 bug */
  options.headerTitleStyle = [
    ...options.headerTitleStyle,
    {
      fontFamily: _.fontFamily
    }
  ]

  /*** @fixed iOS IPA 上有诡异 bug, headerRight 需要延迟渲染, 否则可能会渲染错位 */
  const isDelayRender = !!(IOS_IPA && options?.headerRight)
  let delayRenderHeaderRight: any
  if (isDelayRender) {
    delayRenderHeaderRight = options.headerRight
    options.headerRight = () => null
  }

  navigation.setOptions(options)
  if (isDelayRender) {
    setTimeout(() => {
      navigation.setOptions({
        headerRight: delayRenderHeaderRight
      })
    }, 0)
  }
}

/** @deprecated 有性能问题, 请使用 mobx 写法替代 */
export const useOnScroll = () => {
  const yRef = useRef(0)
  const [fixed, setFixed] = useState(false)
  const onScroll = useCallback(
    ({ nativeEvent }) => {
      const { y } = nativeEvent.contentOffset
      yRef.current = y

      const offset = HEADER_TRANSITION_HEIGHT
      if ((fixed && y > offset) || (!fixed && y <= offset)) return

      setFixed(y > offset)
    },
    [fixed]
  )

  return {
    /** y 轴引用 */
    yRef,

    /** 头部是否固定 */
    fixed,

    /** 滑动回调 */
    onScroll
  }
}
