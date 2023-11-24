/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2023-11-06 06:27:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 17:18:28
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../component'
import { Text } from '../text'
import { Props as ModalProps } from './types'
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
            <Text type={type} size={16}>
              {title}
            </Text>
          )}
          <View>{children}</View>
        </View>
      </Component>
    )
  }
)

const styles = _.create({
  mask: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.64)'
  },
  modal: {
    position: 'absolute',
    zIndex: 1001,
    top: '50%',
    left: '50%',
    maxWidth: '94%',
    maxHeight: '94%',
    paddingTop: _.md,
    paddingRight: _.md,
    paddingBottom: _.md,
    paddingLeft: _.md,
    marginTop: -16,
    transform: [
      {
        // @ts-ignore
        translateX: '-50%'
      },
      {
        // @ts-ignore
        translateY: '-50%'
      }
    ]
  }
})
