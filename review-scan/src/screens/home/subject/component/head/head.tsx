/*
 * @Author: czy0729
 * @Date: 2022-07-16 11:46:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:46:42
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Katakana, Text } from '@components'
import { ScoreTag, Tag } from '@_'
import { _ } from '@stores'
import { cnjp, copy, getTimestamp, toFixed } from '@utils'
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
    nsfw = false,
    hasSeries = false,
    isMusic = false
  }) => {
    const top = cnjp(jp, cn)
    const bottom = cnjp(cn, jp)

    // 是否未上映
    let showRelease: boolean = false
    const y = release.includes('年')
    const m = release.includes('月')
    const d = release.includes('日')
    if (y && m && d) {
      const str = `${release.replace(/年|月|日/g, '/')}`
      const ts = getTimestamp(str?.slice(0, str.length - 1))
      const now = getTimestamp()
      showRelease = ts > now
    } else if ((y && m && !d) || (y && !m && !d)) {
      showRelease = true
    }

    // 主标题大小
    const hasRelation = !!(subjectPrev || subjectAfter || subjectSeries)
    let size =
      (cn.length > 32 ? 11 : cn.length > 24 ? 12 : cn.length > 16 ? 12 : 15) + (PAD === 2 ? 4 : 2)
    if (showRelation && hasRelation) size = Math.max(11, size - 2)
    if (isMusic) size -= 1

    // 副标题大小
    const maxLen = 28
    const tops: string[] = []
    let topsString = ''
    let topSize = 12
    if (top !== bottom) {
      tops.push(`${String(top).slice(0, maxLen)}${String(top).length >= maxLen ? '...' : ''}`)
    }

    if (titleLabel) tops.push(titleLabel)
    topsString = tops.join(' · ')

    if (topsString.length >= 32) {
      topSize = 10
    } else if (topsString.length >= 22) {
      topSize = 11
    }

    const left = imageWidth + _.wind + _.device(12, 20)
    return (
      <View style={styles.container}>
        {showRelease && (
          <Text
            style={[
              styles.release,
              {
                left
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
              paddingLeft: left
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
                <Text type='main' size={_.device(20, 24)}>
                  {rating.score === '' ? '-' : toFixed(rating.score, 1)}{' '}
                </Text>
                {rating.score !== '' && <ScoreTag style={_.ml.sm} value={Number(rating.score)} />}
                {nsfw && <Tag style={_.ml.sm} size={13} value='NSFW' />}
              </>
            )}
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
