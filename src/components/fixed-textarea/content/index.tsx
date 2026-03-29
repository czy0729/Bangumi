/*
 * @Author: czy0729
 * @Date: 2023-08-01 06:12:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-30 07:24:03
 */
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { desc } from '@utils'
import { IOS, SCROLL_VIEW_RESET_PROPS, WSA } from '@constants'
import { BGM_EMOJIS_GROUP_DATA } from '../ds'
import { BgmText } from '../../bgm-text'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { SegmentedControl } from '../../segmented-control'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { BGM_EMOJIS_MAP } from './ds'
import { memoStyles } from './styles'

function Content({
  keyboardHeight,
  history,
  replyHistory,
  lockHistory,
  showTextarea,
  showBgm,
  showReplyHistory,
  emojisGroupSelectedIndex,
  onChange,
  onSelectBgm,
  onLockHistory,
  onEmojisGroupChange
}) {
  const sortedReplyHistory = useMemo(() => {
    if (!replyHistory) return []

    return (replyHistory as string[])
      .slice()
      .sort((a, b) => desc(lockHistory === a ? 1 : 0, lockHistory === b ? 1 : 0))
  }, [replyHistory, lockHistory])

  if (!IOS && !showBgm) return null
  if (!showTextarea || (!WSA && !keyboardHeight)) return null

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

  const renderEmojis = () => {
    const emojisGroupName = BGM_EMOJIS_GROUP_DATA[emojisGroupSelectedIndex]
    const emojisData = BGM_EMOJIS_MAP[emojisGroupName]

    return (
      <>
        <Flex style={_.container.wind}>
          <Flex.Item>
            <Text type='sub' size={12}>
              常用
            </Text>
          </Flex.Item>
          <SegmentedControl
            style={styles.segmented}
            size={9}
            selectedIndex={emojisGroupSelectedIndex}
            values={BGM_EMOJIS_GROUP_DATA}
            onValueChange={onEmojisGroupChange}
          />
        </Flex>

        <Flex style={styles.bgms} wrap='wrap'>
          {(history as string[]).map(id => {
            const numId = Number(id)

            return (
              <Touchable key={id} style={styles.bgm} onPress={() => onSelectBgm(id, false)}>
                <Flex justify='center'>
                  <BgmText index={id} size={numId >= 600 ? 36 : 18} animated />
                </Flex>
              </Touchable>
            )
          })}
        </Flex>

        {emojisData.map(({ title, data, desc }) => (
          <View key={title} style={_.mt.sm}>
            <Text style={_.container.wind} type='sub' size={12}>
              by {title}
            </Text>
            <Flex style={styles.bgms} wrap='wrap'>
              {Object.keys(data).map(id => {
                const numId = Number(id)

                // 统一逻辑：600 以上用大图，且计算描述文字
                const isSpecial = numId >= 600
                const descText = desc ? (numId >= 700 ? desc[numId - 700] : desc[numId - 600]) : ''

                return (
                  <Touchable key={id} style={styles.bgm} onPress={() => onSelectBgm(id)}>
                    <Flex direction='column'>
                      <BgmText index={numId} size={isSpecial ? 36 : 18} />
                      {!!descText && (
                        <Text type='icon' size={8} align='center'>
                          {descText}
                        </Text>
                      )}
                    </Flex>
                  </Touchable>
                )
              })}
            </Flex>
          </View>
        ))}
      </>
    )
  }

  return (
    <ScrollView
      style={{ height: (WSA ? 280 : keyboardHeight) + _.xs }}
      contentContainerStyle={styles.contentContainerStyle}
      {...SCROLL_VIEW_RESET_PROPS}
    >
      {showReplyHistory ? renderReplyHistory() : renderEmojis()}
    </ScrollView>
  )
}

export default observer(Content)
