/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:55:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 22:19:10
 */
import React, { useState, useCallback } from 'react'
import { _, systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/cn-char'
import { IOS } from '@constants'
import Back from './back'
import Transition from './transition'

export const updateHeader = ({
  navigation,
  mode,
  fixed = false,
  title = '',
  headerRight
}) => {
  if (!navigation) return

  const _title = systemStore.setting.s2t ? s2t(title) : title
  const options = {
    // header
    headerTransparent: !!mode,
    headerShown: true,
    headerStyle: {
      backgroundColor: mode ? 'transparent' : _.colorPlain,
      borderBottomWidth: 0,
      elevation: 0
    },

    // headerTitle
    headerTitle: mode ? '' : _title,
    headerTitleAlign: mode ? 'left' : 'center',
    headerTitleStyle: {
      fontSize: 15,
      fontWeight: 'normal'
    },
    headerTintColor: _.colorTitle,

    // headerBack
    headerBackTitleVisible: false,
    headerLeftContainerStyle: {
      paddingLeft: 5
    },
    headerLeft: () => <Back navigation={navigation} />
  }

  if (headerRight) {
    options.headerRightContainerStyle = {
      paddingRight: 6
    }
    options.headerRight = headerRight
  }

  if (mode) {
    options.headerBackground = () => <Transition fixed={fixed} title={_title} />
  }

  // platform fixed
  if (IOS) {
  } else {
    options.headerTitleStyle.fontFamily = ''
  }

  navigation.setOptions(options)
}

export const useOnScroll = (headerTransitionHeight = 48) => {
  const [fixed, setFixed] = useState(false)
  const onScroll = useCallback(
    ({ nativeEvent }) => {
      const { y } = nativeEvent.contentOffset
      const offset = headerTransitionHeight
      if ((fixed && y > offset) || (!fixed && y <= offset)) return
      setFixed(y > offset)
    },
    [fixed, headerTransitionHeight]
  )

  return {
    fixed,
    onScroll
  }
}
