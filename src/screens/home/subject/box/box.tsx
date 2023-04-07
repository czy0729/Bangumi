/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 19:25:44
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Touchable, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import IconFolder from '../icon/folder'
import IconClose from '../icon/close'
import FlipBtn from './flip-btn'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    styles,
    navigation,
    isLogin,
    status,
    showCount,
    showManageModel,
    toRating,
    outdate
  }) => {
    // global.rerender('Subject.Box.Main')

    const onPress = isLogin ? showManageModel : () => navigation.push('LoginV2')
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
        <Touchable style={styles.btn} animate onPress={onPress}>
          <FlipBtn />
          <Heatmap id='条目.管理收藏' />
          <Heatmap right={56} transparent id='条目.显示收藏管理' />
        </Touchable>
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
                    {!!index && ' / '}
                    {item.text}
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
