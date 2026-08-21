/*
 * @Author: czy0729
 * @Date: 2022-11-05 22:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 05:22:11
 */
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { feedback, stl } from '@utils'
import { syncThemeStore } from '@utils/async'
import { r } from '@utils/dev'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { ModalView } from '../modal-view'
import { Text } from '../text'
import { Touchable } from '../touchable'
import BlurView from './blur-view'
import { ModalFixed } from './fixed'
import { COMPONENT } from './ds'
import { styles } from './styles'

export { ModalFixed }

import type { LayoutChangeEvent } from 'react-native'
import type { Props as ModalProps } from './types'
export type { ModalProps }

/** 通用模态框 */
export const Modal = observer(
  ({
    style,
    visible,
    title,
    type = 'title',
    right,
    focus,
    maskClosable = true,
    onClose,
    children
  }: ModalProps) => {
    r(COMPONENT)

    const _ = syncThemeStore()

    // 右插槽实际宽度, 镜像到左侧使标题在任意插槽内容宽度下都保持水平居中
    const [rightWidth, setRightWidth] = useState(0)
    const handleRightLayout = useCallback((e: LayoutChangeEvent) => {
      const { width } = e.nativeEvent.layout
      setRightWidth(prev => (prev === width ? prev : width))
    }, [])

    useEffect(() => {
      if (visible) feedback(true)
    }, [visible])

    return (
      <ModalView
        visible={visible}
        focus={focus}
        animationType='fade'
        maskClosable={maskClosable}
        onClose={onClose}
      >
        <BlurView style={style}>
          <View style={styles.body}>
            <Flex style={styles.head}>
              <View style={stl(styles.side, rightWidth > 36 && { width: rightWidth })}>
                {!!onClose && (
                  <Touchable onPress={onClose}>
                    <Flex style={styles.btn} justify='center'>
                      <Iconfont name='md-close' color={_.colorIcon} size={23} />
                    </Flex>
                  </Touchable>
                )}
              </View>
              <Flex.Item>
                {!!title && (
                  <Text type={type} size={16} align='center' numberOfLines={2}>
                    {title}
                  </Text>
                )}
              </Flex.Item>
              <View style={styles.side} onLayout={!!right ? handleRightLayout : undefined}>
                {right}
              </View>
            </Flex>
            <Suspense>{children}</Suspense>
          </View>
        </BlurView>
      </ModalView>
    )
  }
)

export default Modal
