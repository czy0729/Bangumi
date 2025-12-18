/*
 * @Author: czy0729
 * @Date: 2022-07-16 11:46:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-22 17:59:48
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Katakana, Text } from '@components'
import { ScoreTag, Tag } from '@_'
import { _ } from '@stores'
import { cnjp, copy, getTimestamp, getVisualLength, sliceByVisualLength, toFixed } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { PAD } from '@constants'
import Cover from '../cover'
import Series from '../series'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Head = memo(
  ({
    styles,
    showRelation = false,
    subjectId = 0,
    subjectPrev,
    subjectAfter,
    subjectSeries,
    cn = '',
    jp = '',
    release = '',
    year = '',
    imageWidth = 0,
    imageHeight = 0,
    titleLabel = '',
    hideScore = false,
    rating = {},
    duration = '',
    nsfw = false,
    hasSeries = false,
    isMusic = false
  }) => {
    const top = cnjp(jp, cn)
    const bottom = cnjp(cn, jp)

    // 是否未上映
    let showRelease = false
    const hasYear = release.includes('年')
    const hasMonth = release.includes('月')
    const hasDay = release.includes('日')

    // 年月日齐全
    if (hasYear && hasMonth && hasDay) {
      const dateStr = release.replace(/年|月|日/g, '/')
      const ts = getTimestamp(dateStr.slice(0, -1))
      showRelease = ts > getTimestamp()

      // 只有年 / 年月：一定未上映
    } else if (hasYear && !hasDay) {
      showRelease = true
    }

    // 主标题大小
    const hasRelation = !!(subjectPrev || subjectAfter || subjectSeries)
    const cnLen = getVisualLength(cn)

    let size =
      (cnLen > 44 ? 10 : cnLen > 32 ? 11 : cnLen > 24 ? 12 : cnLen > 16 ? 12 : 15) +
      (PAD === 2 ? 4 : 2)
    if (showRelation && hasRelation) size = Math.max(11, size - 2)
    if (isMusic) size -= 1

    // 副标题大小
    const maxLen = 28
    const tops: string[] = []
    let topsString = ''
    let topSize = 12

    if (top !== bottom) {
      tops.push(sliceByVisualLength(String(top), maxLen, '...'))
    }
    if (titleLabel) tops.push(titleLabel)
    topsString = tops.join(' · ')

    const topsLen = getVisualLength(topsString)
    if (topsLen >= 32) {
      topSize = 10
    } else if (topsLen >= 22) {
      topSize = 11
    }

    // 距离左侧容器的边距
    const leftOffset = imageWidth + _.wind + _.device(12, 20)

    return (
      <View style={styles.container}>
        {showRelease && (
          <Text
            style={[
              styles.release,
              {
                left: leftOffset
              }
            ]}
            type='__plain__'
            size={10}
            bold
          >
            {release} 上映
          </Text>
        )}
        <View
          style={[
            styles.content,
            {
              minHeight: imageHeight - _.r(20),
              paddingLeft: leftOffset
            }
          ]}
        >
          <View
            style={{
              minHeight: imageHeight - _.r(68)
            }}
          >
            <View>
              <Katakana.Provider size={size} lineHeight={size + 1} bold>
                <Katakana
                  size={size}
                  lineHeight={size + 1}
                  bold
                  onLongPress={() => {
                    copy(bottom)

                    t('条目.复制标题', {
                      subjectId
                    })
                  }}
                >
                  {bottom}
                  {!!year && (
                    <Text size={size - 3} lineHeight={size + 1}>
                      {' '}
                      ({year})
                    </Text>
                  )}
                </Katakana>
              </Katakana.Provider>
              {(!subjectSeries || (!!top && top !== bottom)) && (
                <Katakana.Provider
                  style={!!bottom && _.mt.xs}
                  itemStyle={styles.katakana}
                  type='sub'
                  size={topSize}
                  numberOfLines={hasSeries ? 2 : 4}
                >
                  <Katakana
                    type='sub'
                    size={topSize}
                    numberOfLines={hasSeries ? 2 : 4}
                    onLongPress={() => {
                      copy(top)

                      t('条目.复制标题', {
                        subjectId
                      })
                    }}
                  >
                    {topsString}
                  </Katakana>
                </Katakana.Provider>
              )}
              <Heatmap id='条目.复制标题' />
            </View>
            <Series size={size} />
          </View>
          <Flex style={_.mt.xs}>
            {!hideScore && (
              <>
                <Text style={_.mr.sm} type='main' size={_.device(20, 24)}>
                  {rating.score === '' ? '-' : toFixed(rating.score, 1)}{' '}
                </Text>
                {rating.score !== '' && <ScoreTag style={_.mr.sm} value={Number(rating.score)} />}
              </>
            )}
            {!!duration && <Tag style={styles.duration} type='sub' size={12} value={duration} />}
            {nsfw && <Tag type='sub' size={12} value='NSFW' />}
          </Flex>
        </View>
        <Cover />
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Head
