/*
 * @Author: czy0729
 * @Date: 2025-12-13 21:06:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 05:36:41
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Cover, Text } from '@components'
import { subjectStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { LINEAR_COLORS, LINEAR_COLORS_ACTIVE, LINEAR_COLORS_FOCUS, LINEAR_CONFIG } from './ds'
import { memoStyles } from './styles'

function Subject({ item, isFocus, isActive }) {
  return useObserver(() => {
    const styles = memoStyles()
    const src = subjectStore.cover(item.id)
    const rank = subjectStore.ratingRank(item.id)
    const score = subjectStore.ratingScore(item.id)
    const date = item.date
      ? [
          item.date,
          item.date && (rank || score) ? ' · ' : '',
          rank ? `#${rank} ` : '',
          score ? `(${score})` : ''
        ].join('')
      : ''
    const showSub = !!item.platform && item.platform !== 'TV'

    return (
      <>
        {!!src && (
          <View style={styles.cover}>
            <Cover
              width={56}
              height={88}
              src={src}
              placeholder={false}
              noDefault
              fallback={false}
              skeleton={false}
            />
            <LinearGradient
              style={styles.linear}
              pointerEvents='none'
              colors={
                isActive ? LINEAR_COLORS_ACTIVE : isFocus ? LINEAR_COLORS_FOCUS : LINEAR_COLORS
              }
              {...LINEAR_CONFIG}
            />
          </View>
        )}
        <Text
          style={styles.title}
          overrideStyle={styles.override}
          size={13}
          bold
          numberOfLines={5}
          align='center'
        >
          {item.nameCN || item.name}
          {showSub ? ' ' : ''}
          {showSub && (
            <Text
              style={styles.sub}
              overrideStyle={styles.override}
              type='sub'
              size={10}
              lineHeight={13}
            >
              {item.platform}
            </Text>
          )}
        </Text>
        {!!date && (
          <Text style={styles.date} overrideStyle={styles.override} type='sub' size={10} bold>
            {date}
          </Text>
        )}
      </>
    )
  })
}

export default Subject
