/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:26:40
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, FROZEN_FN, SHARE_MODE } from '@constants'
import { TITLE_BOX } from '../../ds'
import IconClose from '../icon/close'
import IconFolder from '../icon/folder'
import IconWordCloud from '../icon/word-cloud'
import Comment from './comment'
import Extra from './extra'
import FlipBtn from './flip-btn'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Box = memo(
  ({
    styles,
    navigation,
    isLogin = false,
    status = FROZEN_ARRAY,
    url = '',
    showCount = true,
    showManageModel = FROZEN_FN,
    toRating = FROZEN_FN,
    outdate = false
  }) => {
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
              <IconWordCloud />
              <IconFolder />
              <IconClose />
            </>
          }
          splitStyles
        >
          {TITLE_BOX}
        </SectionTitle>
        <Flex style={styles.btn}>
          <Flex.Item>
            <FlipBtn onPress={onPress} />
            <Heatmap id='条目.管理收藏' />
            <Heatmap right={56} transparent id='条目.显示收藏管理' />
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
            <Touchable
              style={_.mt.md}
              onPress={() => {
                navigation.push('LoginV2')
              }}
            >
              <Text size={statusSize} type='sub' bold>
                检测到授权信息过期，点击重新登录，再进行收藏管理
              </Text>
            </Touchable>
          )}
          <Comment />
        </View>
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Box
