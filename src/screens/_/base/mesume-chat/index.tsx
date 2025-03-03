/*
 * @Author: czy0729
 * @Date: 2025-02-02 17:26:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 13:41:10
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Accordion, Avatar, Flex, Loading, Mask, Text, Touchable } from '@components'
import { IconTouchable } from '@_/icon'
import { _, systemStore } from '@stores'
import { copy, feedback, info, lastDate } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { GROUP_THUMB_MAP } from '@assets/images'
import { MUSUME_CONFIG, MUSUME_DATA } from './ds'
import { memoStyles } from './styles'
import { Props as MesumeChatProps } from './types'

export { MesumeChatProps }

/** Bangumi 娘锐评框 */
export const MesumeChat = ({
  show,
  value,
  time,
  placeholder = '思考中...',
  loading,
  onBefore,
  onNext,
  onRefresh,
  onClose
}: MesumeChatProps) => {
  const [lastRefreshTime, setLastRefreshTime] = useState<number | null>(null)
  const [showPannel, setShowPannel] = useState(false)
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
    const { musumePrompt } = systemStore.setting

    let size = 14
    const text = value ? value.trim() : `${MUSUME_CONFIG[musumePrompt].name}${placeholder}`
    if (text.length >= 300) {
      size -= 2
    } else if (text.length >= 200) {
      size -= 1
    }

    const avatarProps = {
      size: 52,
      borderWidth: 2,
      borderColor: _.select(_.colorBorder, 'rgba(255, 255, 255, 0.88)'),
      radius: _.radiusSm,
      skeleton: false
    } as const
    const nameProps = {
      style: _.mt.sm,
      type: '__plain__',
      size: 12,
      bold: true,
      shadow: true,
      align: 'center'
    } as const
    const handleCopy = () => {
      copy(text, '已复制')
    }

    return (
      <>
        {show && <Mask style={styles.mask} linear onPress={onClose} />}
        <View style={styles.container} pointerEvents='box-none'>
          <Accordion expand={show}>
            {showPannel && (
              <Flex>
                {MUSUME_DATA.filter(item => item !== musumePrompt).map(item => {
                  const config = MUSUME_CONFIG[item]
                  return (
                    <Touchable
                      key={item}
                      onPress={() => {
                        systemStore.setSetting('musumePrompt', item)
                        setShowPannel(!showPannel)
                        setTimeout(() => {
                          feedback(true)
                          handleRefresh()

                          t('其他.切换人格', {
                            value: item
                          })
                        }, 0)
                      }}
                    >
                      <Flex style={styles.avatar} direction='column'>
                        <Avatar {...avatarProps} src={GROUP_THUMB_MAP[config.icon]} />
                        <Text {...nameProps}>{config.name}</Text>
                      </Flex>
                    </Touchable>
                  )
                })}
              </Flex>
            )}
            <Flex style={styles.item} align='start'>
              <Flex style={styles.avatar} direction='column'>
                <Touchable onPress={() => setShowPannel(!showPannel)}>
                  <Avatar
                    key={musumePrompt}
                    {...avatarProps}
                    src={GROUP_THUMB_MAP[MUSUME_CONFIG[musumePrompt].icon]}
                  />
                </Touchable>
                <Text {...nameProps}>{MUSUME_CONFIG[musumePrompt].name}</Text>
              </Flex>
              <Flex.Item
                style={[
                  styles.content,
                  {
                    backgroundColor: MUSUME_CONFIG[musumePrompt].color
                  }
                ]}
              >
                {text.split(`\n\n`).map((item, index) => (
                  <Text
                    key={index}
                    style={!!index && (text.length >= 200 ? _.mt.sm : _.mt.md)}
                    type='__plain__'
                    size={size}
                    lineHeight={size + 1}
                    bold
                    shadow
                    onLongPress={handleCopy}
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
