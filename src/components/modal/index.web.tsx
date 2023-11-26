/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2023-11-06 06:27:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-26 09:25:41
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../component'
import { ScrollView } from '../scroll-view'
import { Text } from '../text'
import { Props as ModalProps } from './types'
import { styles } from './styles.web'
import './index.scss'

export { ModalProps }

export const Modal = observer(
  ({ style, visible, title, type = 'title', focus, onClose, children }: ModalProps) => {
    if (!visible) return null

    return (
      <Component id='component-modal'>
        <View
          style={styles.mask}
          // @ts-ignore
          onClick={onClose}
        />
        <View style={stl(style, styles.modal)}>
          {!!title && (
            <Text style={_.mb.md} type={type} size={16}>
              {title}
            </Text>
          )}
          <ScrollView style={styles.body}>{children}</ScrollView>
        </View>
      </Component>
    )
  }
)
