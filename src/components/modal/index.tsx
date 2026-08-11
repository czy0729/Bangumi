/*
 * @Author: czy0729
 * @Date: 2022-11-05 22:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React, { Suspense, useEffect } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import BlurView from './blur-view'
import { Iconfont } from '../iconfont'
import { ModalView } from '../modal-view'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { Flex } from '../flex'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { syncThemeStore } from '@utils/async'
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
        style={style}
        visible={visible}
        focus={focus}
        animationType='fade'
        maskClosable={maskClosable}
        onClose={onClose}
      >
        <View style={styles.maxHeight}>
          <View style={styles.title}>
            {!!title && (
              <Text type={type} size={16} numberOfLines={5}>
                {title}
              </Text>
            )}
          </View>
          <BlurView>
            <View style={styles.body}>
              <Suspense>{children}</Suspense>
            </View>
          </BlurView>
          {!!onClose && (
            <View style={styles.closeWrap}>
              <Touchable style={styles.touch} onPress={onClose}>
                <Flex style={styles.btn} justify='center'>
                  <Iconfont name='md-close' color={_.colorIcon} size={14} />
                </Flex>
              </Touchable>
            </View>
          )}
        </View>
      </ModalView>
    )
  }
)

export default Modal
