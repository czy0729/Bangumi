/*
 * @Author: czy0729
 * @Date: 2025-02-02 17:26:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-06 07:36:15
 */
import React from 'react'
import { View } from 'react-native'
import { Accordion, Avatar, Flex, Loading, Mask, Text } from '@components'
import { IconTouchable } from '@_/icon'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { memoStyles } from './styles'
import { Props as MesumeChatProps } from './types'

export { MesumeChatProps }

/** Bangumi 娘锐评框 */
export const MesumeChat = ({
  show,
  value,
  placeholder = 'Bangumi娘思考中...',
  loading,
  onBefore,
  onNext,
  onRefresh,
  onClose
}: MesumeChatProps) => {
  return useObserver(() => {
    const styles = memoStyles()
    const text = value ? value.trim() : placeholder
    return (
      <>
        {show && <Mask linear onPress={onClose} />}
        <View style={styles.container} pointerEvents='box-none'>
          <Accordion expand={show}>
            <Flex style={styles.item} align='start'>
              <Flex style={styles.avatar} direction='column'>
                <Avatar
                  src={GROUP_THUMB_MAP.mesume_icon}
                  size={52}
                  borderWidth={2}
                  borderColor={_.select(_.colorBorder, 'rgba(255, 255, 255, 0.88)')}
                  radius={_.radiusSm}
                  skeleton={false}
                />
                <Text style={_.mt.sm} size={12} bold align='center'>
                  Bangumi娘
                </Text>
              </Flex>
              <Flex.Item style={styles.content}>
                {text.split(`\n\n`).map((item, index) => (
                  <Text
                    key={index}
                    style={!!index && _.mt.md}
                    type='__plain__'
                    lineHeight={15}
                    bold
                    shadow
                  >
                    {item}
                  </Text>
                ))}
                <Flex style={styles.toolBar}>
                  <Flex.Item>
                    <Flex>
                      <IconTouchable
                        name='md-navigate-before'
                        size={24}
                        color='rgba(255, 255, 255, 0.64)'
                        onPress={onBefore}
                      />
                      <IconTouchable
                        style={_.ml.sm}
                        name='md-navigate-next'
                        size={24}
                        color='rgba(255, 255, 255, 0.64)'
                        onPress={onNext}
                      />
                    </Flex>
                  </Flex.Item>
                  {loading ? (
                    <View style={_.mr.sm}>
                      <Loading.Medium color='rgba(255, 255, 255, 0.8)' />
                    </View>
                  ) : (
                    <IconTouchable
                      name='md-refresh'
                      size={20}
                      color='rgba(255, 255, 255, 0.64)'
                      onPress={onRefresh}
                    />
                  )}
                </Flex>
              </Flex.Item>
            </Flex>
          </Accordion>
        </View>
      </>
    )
  })
}
