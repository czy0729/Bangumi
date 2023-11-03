/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-28 10:53:47
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Touchable, Heatmap, Flex } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { memo } from '@utils/decorators'
import { SHARE_MODE } from '@constants'
import IconFolder from '../icon/folder'
import IconClose from '../icon/close'
import FlipBtn from './flip-btn'
import Extra from './extra'
import { DEFAULT_PROPS } from './ds'

const HIT_SLOP = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
} as const

export default memo(
  ({
    styles,
    navigation,
    isLogin,
    status,
    url,
    showCount,
    showManageModel,
    toRating,
    outdate
  }) => {
    // global.rerender('Subject.Box.Main')

    const onPress = isLogin
      ? showManageModel
      : () => {
          if (SHARE_MODE) {
            appNavigate(url)
            return
          }
          navigation.push('LoginV2')
        }
    const statusSize = status[status.length - 1]?.text.length >= 6 ? 11 : 12

    return (
      <View style={styles.container}>
        <SectionTitle
          style={styles.sectionTitle}
          right={
            <>
              <IconFolder />
              <IconClose />
            </>
          }
        >
          收藏
        </SectionTitle>
        <Flex style={styles.btn}>
          <Flex.Item>
            <Touchable hitSlop={HIT_SLOP} animate onPress={onPress}>
              <FlipBtn />
              <Heatmap id='条目.管理收藏' />
              <Heatmap right={56} transparent id='条目.显示收藏管理' />
            </Touchable>
          </Flex.Item>
          <Extra />
        </Flex>
        <View style={styles.bottom}>
          {showCount && !!status.length && (
            <View style={_.mt.md}>
              <Text size={statusSize} type='sub'>
                {status.map((item, index) => (
                  <Text
                    key={item.status}
                    size={statusSize}
                    type='sub'
                    onPress={() => toRating(navigation, '收藏', item.status)}
                  >
                    {`${index ? ' / ' : ''}${item.text}`}
                  </Text>
                ))}
              </Text>
              <Heatmap id='条目.跳转' from='收藏' />
            </View>
          )}
          {outdate && (
            <Text style={_.mt.md} size={statusSize} type='sub' bold>
              检测到授权信息过期，请重新登录再进行收藏管理
            </Text>
          )}
        </View>
      </View>
    )
  },
  DEFAULT_PROPS
)
