/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-12 12:50:21
 */
import React from 'react'
import { View, Clipboard } from 'react-native'
import { Flex, Text, Katakana, Heatmap } from '@components'
import { ScoreTag, Tag } from '@screens/_'
import { _, systemStore } from '@stores'
import { toFixed, getTimestamp } from '@utils'
import { obc, memo } from '@utils/decorators'
import { info } from '@utils/ui'
import { PAD } from '@constants'
import Cover from './cover'
import Series from './series'

const defaultProps = {
  styles: {},
  showRelation: false,
  subject: {},
  subjectPrev: undefined,
  subjectAfter: undefined,
  subjectSeries: undefined,
  cn: '',
  jp: '',
  release: '',
  coverPlaceholder: '',
  imageWidth: 0,
  imageHeight: 0,
  titleLabel: '',
  hideScore: false,
  rating: {},
  x18: false
}

const Head = memo(
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
    coverPlaceholder,
    imageWidth,
    imageHeight,
    titleLabel,
    hideScore,
    rating,
    x18
  }) => {
    rerender('Subject.Head.Main')

    const { images = {} } = subject
    const hasRelation = !!(subjectPrev || subjectAfter || subjectSeries)

    // 主标题大小
    let size =
      (cn.length > 32 ? 10 : cn.length > 24 ? 11 : cn.length > 16 ? 13 : 16) +
      (PAD === 2 ? 4 : 2)

    if (showRelation && hasRelation) size = Math.max(11, size - 2)

    // 是否未上映
    let showRelease
    const y = release.includes('年')
    const m = release.includes('月')
    const d = release.includes('日')
    if (y && m && d) {
      const str = `${release.replace(/年|月|日/g, '/')}`
      const ts = getTimestamp(str.slice(0, str.length - 1))
      const now = getTimestamp()
      showRelease = ts > now
    } else if ((y && m && !d) || (y && !m && !d)) {
      showRelease = true
    }

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
            {release}上映
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
              {!!jp && (
                <Katakana.Provider
                  size={jp.length > 12 ? 11 : 13}
                  itemStyle={styles.katakana}
                  numberOfLines={hasRelation ? 1 : 2}
                >
                  <Katakana
                    type='sub'
                    size={jp.length > 12 ? 11 : 13}
                    numberOfLines={hasRelation ? 1 : 2}
                    onLongPress={() => {
                      Clipboard.setString(jp)
                      info(`已复制 ${jp}`)
                    }}
                  >
                    {jp}
                    {!!titleLabel && ` · ${titleLabel}`}
                  </Katakana>
                </Katakana.Provider>
              )}
              {!subjectSeries && (
                <Text
                  style={!!cn && _.mt.xs}
                  size={size}
                  bold
                  onLongPress={() => {
                    Clipboard.setString(cn)
                    info(`已复制 ${cn}`)
                  }}
                >
                  {cn}
                </Text>
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
                  <ScoreTag style={_.ml.sm} value={rating.score} />
                )}
                {x18 && <Tag style={_.ml.sm} size={13} value='H' />}
              </>
            )}
          </Flex>
        </View>
      </View>
    )
  },
  defaultProps
)

export default obc((props, { $ }) => {
  rerender('Subject.Head')
  return (
    <Head
      styles={memoStyles()}
      showRelation={systemStore.setting.showRelation}
      subject={$.subject}
      subjectPrev={$.subjectPrev}
      subjectAfter={$.subjectAfter}
      subjectSeries={$.subjectSeries}
      cn={$.cn}
      jp={$.jp}
      release={$.release}
      coverPlaceholder={$.coverPlaceholder}
      imageWidth={$.imageWidth}
      imageHeight={$.imageHeight}
      titleLabel={$.titleLabel}
      hideScore={$.hideScore}
      rating={$.rating}
      x18={$.x18}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: 48 * _.ratio
  },
  content: {
    paddingTop: 12 * _.ratio,
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
    top: 28 * _.ratio,
    opacity: 0.6
  }
}))
