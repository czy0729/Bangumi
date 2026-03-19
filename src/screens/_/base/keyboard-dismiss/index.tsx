/*
 * @Author: czy0729
 * @Date: 2025-08-17 05:29:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:04:35
 */
import React, { useCallback } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { COMPONENT } from './ds'

/** 触摸后隐藏键盘 */
export const KeyboardDismiss = observer(({ children }) => {
  r(COMPONENT)

  const handlePressIn = useCallback(() => {
    Keyboard.dismiss()
  }, [])

  if (!IOS) return children

  return (
    <Component id='base-keyboard-dismiss'>
      <TouchableWithoutFeedback onPressIn={handlePressIn}>{children}</TouchableWithoutFeedback>
    </Component>
  )
})

export default KeyboardDismiss
