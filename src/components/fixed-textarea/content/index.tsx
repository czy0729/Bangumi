/*
 * @Author: czy0729
 * @Date: 2023-08-01 06:12:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 11:57:17
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { desc } from '@utils'
import { IOS, SCROLL_VIEW_RESET_PROPS, WSA } from '@constants'
import { Bgm } from '../../bgm'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
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
  onSelectBgm
}) {
  // 安卓 eject 后, 键盘表现跟 IOS 不一致, 特殊处理
  if (!IOS && !showBgm) return null
  if (!showTextarea || (!WSA && !keyboardHeight)) return null

  const styles = memoStyles()
  return (
    <ScrollView
      style={{
        height: (WSA ? 280 : keyboardHeight) + 1
      }}
      contentContainerStyle={styles.contentContainerStyle}
      {...SCROLL_VIEW_RESET_PROPS}
    >
      {showReplyHistory ? (
        <>
          {(replyHistory as string[])
            .slice()
            .sort((a, b) => desc(lockHistory === a ? 1 : 0, lockHistory === b ? 1 : 0))
            .map((item, index) => (
              <Flex key={index} style={styles.replys}>
                <Flex.Item>
                  <Touchable style={styles.reply} onPress={() => onChange(item)}>
                    <Text lineHeight={18}>{item}</Text>
                  </Touchable>
                </Flex.Item>
                <Touchable style={styles.lock} onPress={() => lockHistory(item)}>
                  <Iconfont
                    name='md-vertical-align-top'
                    color={lockHistory === item ? _.colorMain : _.colorSub}
                    size={18}
                  />
                </Touchable>
              </Flex>
            ))}
        </>
      ) : (
        <>
          <Text style={_.container.wind} size={12} type='sub'>
            常用
          </Text>
          <Flex style={styles.bgms} wrap='wrap'>
            {(history as string[]).map((item, index) => (
              <View key={index} style={styles.bgm}>
                <Touchable onPress={() => onSelectBgm(item, false)}>
                  <Flex justify='center'>
                    <Bgm index={item} size={22} />
                  </Flex>
                </Touchable>
              </View>
            ))}
          </Flex>
          <Text style={[_.container.wind, _.mt.sm]} size={12} type='sub'>
            全部
          </Text>
          <Flex style={styles.bgms} wrap='wrap'>
            {Array.from(new Array(100)).map((item, index) => (
              <View key={index + 1} style={styles.bgm}>
                <Touchable onPress={() => onSelectBgm(index + 1)}>
                  <Flex justify='center'>
                    <Bgm index={index + 1} size={22} />
                  </Flex>
                </Touchable>
              </View>
            ))}
          </Flex>
        </>
      )}
    </ScrollView>
  )
}

export default observer(Content)
