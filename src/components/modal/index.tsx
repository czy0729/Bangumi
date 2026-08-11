/*
 * @Author: czy0729
 * @Date: 2022-11-05 22:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 05:32:05
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
            <View style={styles.title}>
              {!!title && (
                <Text type={type} size={16} align='center' numberOfLines={2}>
                  {title}
                </Text>
              )}
            </View>
            <Suspense>{children}</Suspense>
          </View>
        </BlurView>
        {!!onClose && (
          <View style={styles.close}>
            <Touchable style={styles.touch} onPress={onClose}>
              <Flex style={styles.btn} justify='center'>
                <Iconfont name='md-close' color={_.colorIcon} size={24} />
              </Flex>
            </Touchable>
          </View>
        )}
      </ModalView>
    )
  }
)

export default Modal
