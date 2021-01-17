/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 19:30:39
 */
import React from 'react'
import { View, Clipboard } from 'react-native'
import { Flex, Text, Katakana, Heatmap } from '@components'
import { ScoreTag, Tag } from '@screens/_'
import { _, systemStore } from '@stores'
import { toFixed, getTimestamp } from '@utils'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { x18 } from '@utils/app'
import { imageWidth, imageHeight } from './store'
import Cover from './cover'
import Series from './series'

function Head({ style }, { $ }) {
  const styles = memoStyles()
  const { showRelation } = systemStore.setting
  const { images = {} } = $.subject
  const hasRelation = !!($.subjectPrev || $.subjectAfter || $.subjectSeries)

  // 主标题大小
  let size = $.cn.length > 24 ? 11 : $.cn.length > 16 ? 13 : 16
  if (showRelation && hasRelation) size = Math.max(11, size - 2)

  // 是否未上映
  let showRelease
  const y = $.release.includes('年')
  const m = $.release.includes('月')
  const d = $.release.includes('日')
  if (y && m && d) {
    const str = `${$.release.replace(/年|月|日/g, '/')}`
    const ts = getTimestamp(str.slice(0, str.length - 1))
    const now = getTimestamp()
    showRelease = ts > now
  } else if ((y && m && !d) || (y && !m && !d)) {
    showRelease = true
  }

  return (
    <View style={[styles.container, style]}>
      <Cover image={images.common} placeholder={$.coverPlaceholder} />
      {showRelease && (
        <Text style={styles.release} type='__plain__' size={10} bold>
          {$.release}上映
        </Text>
      )}
      <View style={styles.content}>
        <View style={styles.title}>
          <View>
            {!!$.jp && (
              <Katakana.Provider
                size={$.jp.length > 12 ? 11 : 13}
                itemStyle={styles.katakana}
                numberOfLines={hasRelation ? 1 : 2}
              >
                <Katakana
                  type='sub'
                  size={$.jp.length > 12 ? 11 : 13}
                  numberOfLines={hasRelation ? 1 : 2}
                  onLongPress={() => {
                    Clipboard.setString($.jp)
                    info(`已复制 ${$.jp}`)
                  }}
                >
                  {!!$.titleLabel && `${$.titleLabel} · `}
                  {$.jp}
                </Katakana>
              </Katakana.Provider>
            )}
            {!$.subjectSeries && (
              <Text
                style={!!$.cn && _.mt.xs}
                size={size}
                bold
                onLongPress={() => {
                  Clipboard.setString($.cn)
                  info(`已复制 ${$.cn}`)
                }}
              >
                {$.cn}
              </Text>
            )}
            <Heatmap id='条目.复制标题' />
          </View>
          <Series size={size} />
        </View>
        <Flex>
          {!$.hideScore && (
            <>
              <Text type='main' size={20}>
                {$.rating.score === '' ? '-' : toFixed($.rating.score, 1)}{' '}
              </Text>
              {$.rating.score !== '' && (
                <ScoreTag style={_.ml.sm} value={$.rating.score} />
              )}
              {x18($.subjectId, $.cn || $.jp) && (
                <Tag style={_.ml.sm} size={13} value='H' />
              )}
            </>
          )}
        </Flex>
      </View>
    </View>
  )
}

export default obc(Head)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingTop: 48
  },
  content: {
    minHeight: imageHeight - 20,
    paddingTop: 12,
    paddingLeft: imageWidth + _.wind + 12,
    paddingRight: _.wind,
    backgroundColor: _.colorPlain,
    borderTopLeftRadius: _.radiusLg,
    borderTopRightRadius: _.radiusLg
  },
  title: {
    minHeight: 90
  },
  katakana: {
    marginTop: -11
  },
  series: {
    width: 168,
    paddingRight: _.sm,
    marginTop: _.sm
  },
  release: {
    position: 'absolute',
    zIndex: 1,
    top: 28,
    left: imageWidth + _.wind + 12,
    opacity: 0.6
  }
}))
