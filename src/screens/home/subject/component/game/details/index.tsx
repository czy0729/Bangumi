/*
 * @Author: czy0729
 * @Date: 2024-08-13 12:23:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-22 17:41:45
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, otaStore, useStore } from '@stores'
import { formatPlaytime, open } from '@utils'
import { HOST_AC_SEARCH } from '@constants'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Details() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const isADV = $.gameInfo?.isADV

    // 公共字段
    let title = ''
    let tag: string[] = []
    let platform: string[] = []
    let time = ''
    let timeCn = ''
    let dev: string | string[] = ''
    let publish: string | string[] = ''
    let playtime = ''
    let zhCn = false

    if (isADV) {
      const adv = otaStore.adv($.subjectId)
      title = adv.title || ''
      time = adv.date || ''
      dev = adv.dev || ''
      playtime = adv.time ? formatPlaytime(adv.time) : ''
      zhCn = !!adv.cn
    } else {
      const game = otaStore.game($.subjectId)
      title = game.t || ''
      tag = game.ta || []
      platform = game.pl || []
      time = game.en || ''
      timeCn = game.cn || ''
      dev = game.d || ''
      publish = game.p || ''
    }

    const developer = ([] as string[])
      .concat(dev || [])
      .map(s => String(s).trim())
      .filter(Boolean)
    const publisher = ([] as string[])
      .concat(publish || [])
      .map(s => String(s).trim())
      .filter(Boolean)

    const renderRow = (label: string, value: string, condition: boolean = true) =>
      condition &&
      !!value && (
        <Text style={_.mb.sm} lineHeight={22} selectable>
          {label}: {value}
        </Text>
      )

    const { cn, jp } = $
    const memoData = useMemo(() => {
      const data = [cn || jp]
      if (cn && jp && jp !== cn) data.push(jp)
      return data
    }, [cn, jp])
    const handleSelect = useCallback(
      (title: string) => {
        open(
          `${HOST_AC_SEARCH}/all?keyword=${encodeURIComponent(title)}%20${
            isADV ? 'OP' : 'PV'
          }&order=totalrank&duration=1&tids_1=4`
        )
      },
      [isADV]
    )

    return (
      <View style={styles.details}>
        {renderRow('名称', title)}
        {renderRow('类型', tag.join('、'))}
        {renderRow('平台', platform.join('、'))}
        {renderRow('开发商', developer.join('、'))}
        {renderRow('发行商', publisher.join('、'), !isADV)}
        {renderRow('最早发售', time, timeCn !== time)}
        {renderRow('中文发售', timeCn)}
        {renderRow('游玩时间', playtime)}
        {renderRow('汉化', '有', zhCn)}

        <Popover data={memoData} onSelect={handleSelect}>
          <Flex>
            <Text type='sub' lineHeight={22}>
              相关视频
            </Text>
            <Iconfont style={_.ml.xs} name='md-open-in-new' size={16} />
          </Flex>
        </Popover>
      </View>
    )
  })
}

export default Details
