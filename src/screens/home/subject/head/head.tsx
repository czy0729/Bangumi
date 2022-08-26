/*
 * @Author: czy0729
 * @Date: 2022-07-16 11:46:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 13:08:48
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Katakana, Heatmap } from '@components'
import { ScoreTag, Tag } from '@_'
import { _ } from '@stores'
import { toFixed, cnjp, getTimestamp, copy } from '@utils'
import { memo } from '@utils/decorators'
import { PAD } from '@constants'
import Cover from '../cover'
import Series from '../series'
import { DEFAULT_PROPS } from './ds'
import { t } from '@utils/fetch'

export default memo(
  ({
    styles,
    showRelation,
    subject,
    subjectPrev,
    subjectAfter,
    subjectSeries,
    cn,
    jp,
    release,
    year,
    coverPlaceholder,
    imageWidth,
    imageHeight,
    titleLabel,
    hideScore,
    rating,
    x18
  }) => {
    global.rerender('Subject.Head.Main')

    const top = cnjp(jp, cn)
    const bottom = cnjp(cn, jp)

    const { id, images = {} } = subject

    // 是否未上映
    let showRelease: boolean
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

    const maxLen = 28
    let tops: any = [
      `${String(top).slice(0, maxLen)}${String(top).length >= maxLen ? '...' : ''}`
    ]

    if (titleLabel) tops.push(titleLabel)
    tops = tops.join(' · ')

    let topSize = 13
    if (tops.length >= 32) {
      topSize = 11
    } else if (tops.length >= 22) {
      topSize = 12
    }

    const hasRelation = !!(subjectPrev || subjectAfter || subjectSeries)

    // 主标题大小
    let size =
      (cn.length > 32 ? 12 : cn.length > 24 ? 13 : cn.length > 16 ? 13 : 16) +
      (PAD === 2 ? 4 : 2)

    if (showRelation && hasRelation) size = Math.max(11, size - 2)

    const left = imageWidth + _.wind + _.device(12, 20)
    return (
      <View style={styles.container}>
        <Cover image={images.common} placeholder={coverPlaceholder} />
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
              minHeight: imageHeight - 20,
              paddingLeft: left
            }
          ]}
        >
          <View
            style={{
              minHeight: imageHeight - _.device(68, 120)
            }}
          >
            <View>
              {!subjectSeries && (
                <Katakana.Provider size={size} lineHeight={size + 1} bold>
                  <Katakana
                    size={size}
                    lineHeight={size + 1}
                    bold
                    onLongPress={() => {
                      t('条目.复制标题', {
                        subjectId: id
                      })

                      copy(bottom)
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
              )}
              {!!top && top !== bottom && (
                <Katakana.Provider
                  style={!!bottom && _.mt.xs}
                  itemStyle={styles.katakana}
                  type='sub'
                  size={topSize}
                  numberOfLines={2}
                >
                  <Katakana
                    type='sub'
                    size={topSize}
                    numberOfLines={2}
                    onLongPress={() => {
                      t('条目.复制标题', {
                        subjectId: id
                      })

                      copy(top)
                    }}
                  >
                    {tops}
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
                {rating.score !== '' && (
                  <ScoreTag style={_.ml.sm} value={Number(rating.score)} />
                )}
                {x18 && <Tag style={_.ml.sm} size={13} value='H' />}
              </>
            )}
          </Flex>
        </View>
      </View>
    )
  },
  DEFAULT_PROPS
)
