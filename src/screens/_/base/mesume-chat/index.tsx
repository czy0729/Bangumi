/*
 * @Author: czy0729
 * @Date: 2025-02-02 17:26:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-14 12:12:19
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Accordion, Avatar, Flex, Loading, Mask, Text } from '@components'
import { IconTouchable } from '@_/icon'
import { _, systemStore } from '@stores'
import { info, lastDate } from '@utils'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { memoStyles } from './styles'
import { Props as MesumeChatProps } from './types'

export { MesumeChatProps }

/** Bangumi 娘锐评框 */
export const MesumeChat = ({
  show,
  value,
  time,
  placeholder = 'Bangumi娘思考中...',
  loading,
  onBefore,
  onNext,
  onRefresh,
  onClose
}: MesumeChatProps) => {
  const [lastRefreshTime, setLastRefreshTime] = useState<number | null>(null)
  const handleRefresh = useCallback(() => {
    if (!systemStore.advance) {
      const now = Date.now()
      if (lastRefreshTime && now - lastRefreshTime < 30000) {
        info('普通用户有 30 秒刷新间隔')
        return
      }

      setLastRefreshTime(now)
    }
    onRefresh?.()
  }, [lastRefreshTime, onRefresh])

  return useObserver(() => {
    const styles = memoStyles()

    let size = 14
    const text = value ? value.trim() : placeholder
    if (text.length >= 300) {
      size -= 2
    } else if (text.length >= 200) {
      size -= 1
    }

    return (
      <>
        {show && <Mask style={styles.mask} linear onPress={onClose} />}
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
                <Text style={_.mt.sm} type='__plain__' size={12} bold shadow align='center'>
                  Bangumi娘
                </Text>
              </Flex>
              <Flex.Item style={styles.content}>
                {text.split(`\n\n`).map((item, index) => (
                  <Text
                    key={index}
                    style={!!index && (text.length >= 200 ? _.mt.sm : _.mt.md)}
                    type='__plain__'
                    size={size}
                    lineHeight={size + 1}
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
                  {!!time && typeof time === 'number' && (
                    <Text style={styles.time} type='__plain__' size={12} bold shadow align='right'>
                      {lastDate(time)}
                    </Text>
                  )}
                  {loading ? (
                    <View style={_.mh.sm}>
                      <Loading.Medium color='rgba(255, 255, 255, 0.8)' />
                    </View>
                  ) : (
                    <IconTouchable
                      name='md-refresh'
                      size={20}
                      color='rgba(255, 255, 255, 0.64)'
                      onPress={handleRefresh}
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
