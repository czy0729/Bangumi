/*
 * @Author: czy0729
 * @Date: 2024-08-13 12:23:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:40:01
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, otaStore, useStore } from '@stores'
import { formatPlaytime, open } from '@utils'
import { ob } from '@utils/decorators'
import { HOST_AC_SEARCH } from '@constants'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Details() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const isADV = $.gameInfo?.isADV
  let title = ''
  let tag = []
  let platform = []
  let time = ''
  let timeCn = ''
  let dev: string | string[] = ''
  let publish: string | string[] = ''
  let playtime = ''
  let cn = false

  if (isADV) {
    const adv = otaStore.adv($.subjectId)
    if (adv.title) title = adv.title || ''
    if (adv.date) time = adv.date || ''
    if (adv.dev) dev = adv.dev || ''
    if (adv.time) playtime = formatPlaytime(adv.time) || ''
    if (adv.cn) cn = true
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

  const developer = (typeof dev === 'object' ? dev : [dev])
    .map(item => String(item).trim())
    .filter(item => !!item)
  const publisher = (typeof publish === 'object' ? publish : [publish])
    .map(item => String(item).trim())
    .filter(item => !!item)

  return (
    <View style={styles.details}>
      {!!title && (
        <Text lineHeight={22} selectable>
          名称∶{title}
        </Text>
      )}
      {!!tag?.length && (
        <Text lineHeight={22} selectable>
          类型∶{tag.join('、')}
        </Text>
      )}
      {!!platform?.length && (
        <Text lineHeight={22} selectable>
          平台∶{platform.join('、')}
        </Text>
      )}
      {!!developer.length && (
        <Text lineHeight={22} selectable>
          开发商∶{developer.join('、')}
        </Text>
      )}
      {!!publisher.length && !isADV && (
        <Text lineHeight={22} selectable>
          发行商∶{publisher.join('、')}
        </Text>
      )}
      {!!time && timeCn !== time && (
        <Text lineHeight={22} selectable>
          最早发售∶{time}
        </Text>
      )}
      {!!timeCn && (
        <Text lineHeight={22} selectable>
          中文发售∶{timeCn}
        </Text>
      )}
      {!!playtime && (
        <Text lineHeight={22} selectable>
          游玩时间∶{playtime}
        </Text>
      )}
      {!!cn && (
        <Text lineHeight={22} selectable>
          汉化∶有
        </Text>
      )}
      <Touchable
        onPress={() =>
          open(
            `${HOST_AC_SEARCH}/all?keyword=${encodeURIComponent($.jp || $.cn)}%20${
              isADV ? 'OP' : 'PV'
            }&order=totalrank&duration=1&tids_1=4`
          )
        }
      >
        <Flex>
          <Text type='sub' lineHeight={22}>
            相关视频
          </Text>
          <Iconfont style={_.ml.xs} name='md-open-in-new' size={16} />
        </Flex>
      </Touchable>
    </View>
  )
}

export default ob(Details, COMPONENT)
