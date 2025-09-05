/*
 * @Author: czy0729
 * @Date: 2023-08-01 06:12:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-05 10:01:13
 */
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { _ } from '@stores'
import { desc } from '@utils'
import { useObserver } from '@utils/hooks'
import { IOS, SCROLL_VIEW_RESET_PROPS, WSA } from '@constants'
import { BgmText } from '../../bgm-text'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { BGM_EMOJIS_DATA } from './ds'
import { memoStyles } from './styles'

function Content({
  keyboardHeight,
  history,
  replyHistory,
  lockHistory,
  showTextarea,
  showBgm,
  showReplyHistory,
  onChange,
  onSelectBgm,
  onLockHistory
}) {
  // 安卓 eject 后, 键盘表现跟 IOS 不一致, 特殊处理
  if (!IOS && !showBgm) return null
  if (!showTextarea || (!WSA && !keyboardHeight)) return null

  const sortedReplyHistory = useMemo(() => {
    if (!replyHistory) return []

    return (replyHistory as string[])
      .slice()
      .sort((a, b) => desc(lockHistory === a ? 1 : 0, lockHistory === b ? 1 : 0))
  }, [replyHistory, lockHistory])

  return useObserver(() => {
    const styles = memoStyles()

    const renderReplyHistory = () =>
      sortedReplyHistory.map((item, index) => (
        <Flex key={index} style={styles.replys}>
          <Flex.Item>
            <Touchable style={styles.reply} onPress={() => onChange(item)}>
              <Text lineHeight={18}>{item}</Text>
            </Touchable>
          </Flex.Item>
          <Touchable style={styles.lock} onPress={() => onLockHistory(item)}>
            <Iconfont
              name='md-vertical-align-top'
              color={lockHistory === item ? _.colorMain : _.colorSub}
              size={18}
            />
          </Touchable>
        </Flex>
      ))

    const renderEmojis = () => (
      <>
        <Text style={_.container.wind} type='sub' size={12}>
          常用
        </Text>
        <Flex style={styles.bgms} wrap='wrap'>
          {(history as string[]).map((item, index) => (
            <Touchable key={index} style={styles.bgm} onPress={() => onSelectBgm(item, false)}>
              <Flex justify='center'>
                <BgmText index={item} size={18} />
              </Flex>
            </Touchable>
          ))}
        </Flex>
        {BGM_EMOJIS_DATA.map(item => (
          <View key={item.title} style={_.mt.sm}>
            <Text style={_.container.wind} type='sub' size={12}>
              by {item.title}
            </Text>
            <Flex style={styles.bgms} wrap='wrap'>
              {Object.keys(item.data).map(i => (
                <Touchable key={i} style={styles.bgm} onPress={() => onSelectBgm(i)}>
                  <Flex justify='center'>
                    <BgmText index={i} size={18} />
                  </Flex>
                </Touchable>
              ))}
            </Flex>
          </View>
        ))}
      </>
    )

    return (
      <ScrollView
        style={{ height: (WSA ? 280 : keyboardHeight) + 1 }}
        contentContainerStyle={styles.contentContainerStyle}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {showReplyHistory ? renderReplyHistory() : renderEmojis()}
      </ScrollView>
    )
  })
}

export default Content
