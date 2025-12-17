/*
 * @Author: czy0729
 * @Date: 2025-12-13 21:06:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 23:13:00
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Cover, Text } from '@components'
import { InView } from '@_'
import { _, subjectStore, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import {
  LINEAR_COLORS,
  LINEAR_COLORS_ACTIVE,
  LINEAR_COLORS_ACTIVE_LIGHT,
  LINEAR_COLORS_FOCUS,
  LINEAR_COLORS_FOCUS_LIGHT,
  LINEAR_COLORS_LIGHT,
  LINEAR_CONFIG
} from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Subject({ item, y, isFocus, isActive }: Props) {
  return useObserver(() => {
    const styles = memoStyles()
    const { subjectLinkCover, subjectLinkRating, subjectLinkCustomFontFamily } = systemStore.setting

    const src = subjectStore.cover(item.id)
    const rank = subjectStore.ratingRank(item.id)
    const score = subjectStore.ratingScore(item.id)
    const eps = subjectStore.eps(item.id)

    let desc = ''
    if (item.date) {
      desc = item.date

      const extraParts: string[] = []
      if (eps && eps != 1) {
        extraParts.push(`${eps}话`)
      }

      if (subjectLinkRating && (rank || score)) {
        const ratingPart: string[] = []
        if (rank) ratingPart.push(`#${rank}`)
        if (score) ratingPart.push(`(${Number(score).toFixed(1)})`)
        extraParts.push(ratingPart.join(' '))
      }

      if (extraParts.length > 0) {
        desc += ` · ${extraParts.join(' · ')}`
      }
    }

    const title = item.nameCN || item.name
    const titleSize = title.length >= 40 ? 12 : 13

    let platform = item.platform || MODEL_SUBJECT_TYPE.getTitle(item.type) || ''
    if (platform === 'TV') platform = ''

    return (
      <>
        {subjectLinkCover && !!src && (
          <View style={styles.cover}>
            {!!y && (
              <InView y={y}>
                <Cover
                  width={56}
                  height={title.length >= 32 ? 108 : 88}
                  src={src}
                  placeholder={false}
                  noDefault
                  fallback={false}
                  skeleton={false}
                  cdn={!item.nsfw}
                />
              </InView>
            )}
            <LinearGradient
              style={styles.linear}
              pointerEvents='none'
              colors={
                isActive
                  ? _.select(LINEAR_COLORS_ACTIVE_LIGHT, LINEAR_COLORS_ACTIVE)
                  : isFocus
                  ? _.select(LINEAR_COLORS_FOCUS_LIGHT, LINEAR_COLORS_FOCUS)
                  : _.select(LINEAR_COLORS_LIGHT, LINEAR_COLORS)
              }
              {...LINEAR_CONFIG}
            />
          </View>
        )}
        <Text
          style={styles.title}
          overrideStyle={subjectLinkCustomFontFamily && styles.override}
          size={titleSize}
          bold
          numberOfLines={5}
          align='center'
        >
          {item.nameCN || item.name}
          {!!platform && (
            <Text
              style={styles.sub}
              overrideStyle={subjectLinkCustomFontFamily && styles.override}
              type='sub'
              size={10}
              lineHeight={titleSize}
            >
              {' '}
              {platform}
            </Text>
          )}
        </Text>
        {!!desc && (
          <Text
            style={styles.desc}
            overrideStyle={subjectLinkCustomFontFamily && styles.override}
            type='sub'
            size={10}
            bold
          >
            {desc}
          </Text>
        )}
      </>
    )
  })
}

export default Subject
