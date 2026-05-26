/*
 * @Author: czy0729
 * @Date: 2024-08-13 12:23:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-27 07:23:32
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { DigitClock } from '@_'
import { _, systemStore, useStore } from '@stores'
import { feedback, info } from '@utils'
import { getDevelopers, getGameInfo, getPublishers } from '../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function Details() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const isADV = $.gameInfo?.isADV
  const { title, tag, platform, time, timeCn, dev, publish, playtime, zhCn } = getGameInfo(
    $.subjectId,
    isADV
  )
  const developer = getDevelopers(dev)
  const publisher = getPublishers(publish)

  const { mainStory, mainExtra, completionist, vndb } = $.state.gameDuration
  const hasGameDuration = mainStory || mainExtra || completionist || vndb

  const { pinnedGameDuration } = systemStore.setting
  const handlePinGameDuration = useCallback(
    (key: typeof pinnedGameDuration) => {
      const value = pinnedGameDuration === key ? '' : key
      systemStore.setSetting('pinnedGameDuration', value)
      if (value) {
        info('置顶显示在顶部评分旁')
        feedback(true)
      }
    },
    [pinnedGameDuration]
  )

  const renderRow = (label: string, value: string, condition: boolean = true) =>
    condition &&
    !!value && (
      <Text lineHeight={22} selectable>
        {label}：{value}
      </Text>
    )

  return (
    <View style={styles.details}>
      {hasGameDuration && (
        <View style={_.mb.xs}>
          {vndb ? (
            <DigitClock label='VNDB 平均' value={vndb} />
          ) : (
            (
              [
                ['主线剧情', 'mainStory', mainStory],
                ['主线额外', 'mainExtra', mainExtra],
                ['完美通关', 'completionist', completionist]
              ] as const
            ).map(
              ([label, key, value], i) =>
                !!value && (
                  <Flex key={key} style={i === 0 ? _.mt._xs : _.mt.xs}>
                    <Flex.Item>
                      <DigitClock label={label} value={value} />
                    </Flex.Item>
                    <Touchable style={styles.pinBtn} onPress={() => handlePinGameDuration(key)}>
                      <Iconfont
                        name='md-vertical-align-top'
                        color={pinnedGameDuration === key ? _.colorDesc : _.colorIcon}
                        size={18}
                      />
                    </Touchable>
                  </Flex>
                )
            )
          )}
        </View>
      )}

      {(
        [
          ['名称', title],
          ['类型', tag.join('、')],
          ['平台', platform.join('、')],
          ['开发商', developer.join('、')],
          ['发行商', publisher.join('、'), !isADV],
          ['最早发售', time, timeCn !== time],
          ['中文发售', timeCn],
          ['游玩时间', playtime],
          ['汉化', '有', zhCn]
        ] as const
      ).map(([label, value, condition = true]) => renderRow(label, value, condition))}
    </View>
  )
}

export default observer(Details)
