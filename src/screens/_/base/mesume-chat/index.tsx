/*
 * @Author: czy0729
 * @Date: 2025-02-02 17:26:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-04 07:38:26
 */
import React from 'react'
import { View } from 'react-native'
import { Accordion, Avatar, Flex, Mask, Text } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { memoStyles } from './styles'

export const MesumeChat = ({ show, value, onClose }) => {
  return useObserver(() => {
    const styles = memoStyles()
    const text = value ? value.trim() : 'Bangumi娘思考中...'
    return (
      <>
        {show && <Mask linear onPress={onClose} />}
        <View style={styles.container}>
          <Accordion expand={show}>
            <Flex style={styles.item} align='start'>
              <Flex style={styles.avatar} direction='column'>
                <Avatar
                  src={GROUP_THUMB_MAP.mesume_icon}
                  size={52}
                  borderWidth={2}
                  borderColor={_.select(_.colorBorder, 'rgba(255, 255, 255, 0.88)')}
                  radius={_.radiusSm}
                />
                <Text style={_.mt.sm} size={12} bold align='center'>
                  Bangumi娘
                </Text>
              </Flex>
              <Flex.Item style={styles.content}>
                <Text type='__plain__' lineHeight={16} bold shadow>
                  {text}
                </Text>
              </Flex.Item>
            </Flex>
          </Accordion>
        </View>
      </>
    )
  })
}
