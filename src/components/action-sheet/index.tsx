/*
 * @Author: czy0729
 * @Date: 2021-12-25 03:23:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 00:00:00
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { Mask } from '../mask'
import { Portal } from '../portal'
import { Text } from '../text'
import BtnClose from './btn-close'
import { useActionSheet } from './hooks'
import Scroll from './scroll'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export { ActionSheetStatic } from './api'

import type { Props as ActionSheetProps } from './types'
export type { ActionSheetProps }
export type { ActionSheetConfig, ActionSheetConfigOptions } from './api'

/** 动作面板 */
export const ActionSheet = observer(
  ({
    forwardRef,
    contentContainerStyle,
    show = false,
    height = 480,
    title = '',
    titleLeft,
    scrollEnabled = true,
    usePortal = true,
    onTitlePress,
    onClose,
    onScroll,
    children
  }: ActionSheetProps) => {
    r(COMPONENT)

    const { showValue, handleClose, calcHeight, contentStyle, maskStyle } = useActionSheet(
      show,
      onClose,
      height
    )

    if (!showValue) return null

    let elTitle =
      typeof title === 'string'
        ? !!title && (
            <Text size={12} bold type='sub' align='center' onPress={onTitlePress}>
              {title}
            </Text>
          )
        : title

    if (titleLeft) {
      elTitle = (
        <Flex justify='center'>
          {titleLeft}
          {elTitle}
        </Flex>
      )
    }

    const elContent = (
      <View
        style={{
          minHeight: height - _.bottom
        }}
      >
        {!!elTitle && (
          <Flex style={_.mb.sm} justify='center'>
            {elTitle}
            {!!onTitlePress && <Iconfont name='md-navigate-next' size={18} />}
          </Flex>
        )}
        {children}
      </View>
    )

    const styles = memoStyles()

    const elBody = (
      <Suspense>
        <Component id='component-action-sheet' style={styles.actionSheet}>
          <Mask style={maskStyle} onPress={handleClose} />

          <Animated.View style={[styles.content, { height: calcHeight }, contentStyle]}>
            <Scroll
              forwardRef={forwardRef}
              contentContainerStyle={contentContainerStyle}
              height={calcHeight}
              scrollEnabled={scrollEnabled}
              onScroll={onScroll}
              onClose={handleClose}
            >
              {elContent}
            </Scroll>

            <BtnClose onClose={handleClose} />
          </Animated.View>
        </Component>
      </Suspense>
    )

    return usePortal ? <Portal>{elBody}</Portal> : elBody
  }
)

export default ActionSheet
