/*
 * @Author: czy0729
 * @Date: 2022-11-05 22:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 07:36:29
 */
import React, { Suspense, useEffect } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { feedback } from '@utils'
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
              <View style={styles.side}>
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
              <View style={styles.side}>{right}</View>
            </Flex>
            <Suspense>{children}</Suspense>
          </View>
        </BlurView>
      </ModalView>
    )
  }
)

export default Modal
