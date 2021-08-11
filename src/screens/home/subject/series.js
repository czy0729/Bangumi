/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-12 00:45:32
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { Cover as CompCover, IconTouchable } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_DEFAULT } from '@constants'

const coverWidth = _.device(24, 32) * _.ratio
const coverHeight = coverWidth * 1.4

function Series({ size }, { $, navigation }) {
  rerender('Subject.Series')

  if (!($.subjectPrev || $.subjectAfter || $.subjectSeries || $.subjectAnime)) {
    return null
  }

  const styles = memoStyles()
  const { showRelation } = systemStore.setting
  if ($.subjectPrev || $.subjectAfter || $.subjectAnime) {
    return (
      <Flex style={showRelation && styles.relation}>
        <Flex.Item>
          {showRelation && (
            <Flex>
              <Iconfont name='md-subdirectory-arrow-right' size={16} />
              {!!$.subjectPrev && (
                <Touchable
                  style={styles.touch}
                  onPress={() => {
                    t('条目.跳转', {
                      to: 'Subject',
                      from: '系列前传',
                      subjectId: $.subjectId
                    })
                    navigation.push('Subject', {
                      subjectId: $.subjectPrev.id,
                      _jp: $.subjectPrev.title,
                      _image: $.subjectPrev.image
                    })
                  }}
                >
                  <Flex>
                    <CompCover
                      style={styles.cover}
                      src={$.subjectPrev.image || IMG_DEFAULT}
                      size={coverWidth}
                      height={coverHeight}
                      radius
                      placeholder={false}
                      fadeDuration={0}
                      noDefault
                    />
                    <Text style={_.ml.sm} size={11}>
                      前传
                    </Text>
                  </Flex>
                  <Heatmap
                    id='条目.跳转'
                    data={{
                      from: '系列前传'
                    }}
                  />
                </Touchable>
              )}
              {!!$.subjectAfter && (
                <Touchable
                  style={styles.touch}
                  onPress={() => {
                    t('条目.跳转', {
                      to: 'Subject',
                      from: '系列续集',
                      subjectId: $.subjectId
                    })
                    navigation.push('Subject', {
                      subjectId: $.subjectAfter.id,
                      _jp: $.subjectAfter.title,
                      _image: $.subjectAfter.image
                    })
                  }}
                >
                  <Flex>
                    <CompCover
                      style={styles.cover}
                      src={$.subjectAfter.image || IMG_DEFAULT}
                      size={coverWidth}
                      height={coverHeight}
                      radius
                      placeholder={false}
                      fadeDuration={0}
                      noDefault
                    />
                    <Text style={_.ml.sm} size={11}>
                      续集
                    </Text>
                  </Flex>
                  <Heatmap
                    right={-19}
                    id='条目.跳转'
                    data={{
                      from: '系列续集'
                    }}
                  />
                </Touchable>
              )}
              {!!$.subjectAnime && (
                <Touchable
                  style={styles.touch}
                  onPress={() => {
                    t('条目.跳转', {
                      to: 'Subject',
                      from: '动画化',
                      subjectId: $.subjectId
                    })
                    navigation.push('Subject', {
                      subjectId: $.subjectAnime.id,
                      _jp: $.subjectAnime.title,
                      _image: $.subjectAnime.image
                    })
                  }}
                >
                  <Flex>
                    <CompCover
                      style={styles.cover}
                      src={$.subjectAnime.image || IMG_DEFAULT}
                      size={coverWidth}
                      height={coverHeight}
                      radius
                      placeholder={false}
                      fadeDuration={0}
                      noDefault
                    />
                    <Text style={_.ml.sm} size={11}>
                      动画
                    </Text>
                  </Flex>
                  <Heatmap
                    right={-19}
                    id='条目.跳转'
                    data={{
                      from: '动画化'
                    }}
                  />
                </Touchable>
              )}
            </Flex>
          )}
        </Flex.Item>
        <IconTouchable
          style={styles.icon}
          name={showRelation ? 'md-keyboard-arrow-up' : 'md-navigate-next'}
          size={24}
          onPress={() => systemStore.switchSetting('showRelation')}
        />
      </Flex>
    )
  }

  return (
    <Touchable
      style={styles.series}
      onPress={() => {
        t('条目.跳转', {
          to: 'Subject',
          from: '系列',
          subjectId: $.subjectId
        })
        navigation.push('Subject', {
          subjectId: $.subjectSeries.id,
          _jp: $.subjectSeries.title,
          _image: $.subjectSeries.image
        })
      }}
    >
      <Flex>
        <Text size={13}>⤷</Text>
        <CompCover
          style={[styles.cover, _.ml.sm]}
          src={$.subjectSeries.image}
          size={coverWidth}
          height={coverHeight}
          radius
          placeholder={false}
          fadeDuration={0}
          noDefault
        />
        <Text style={_.ml.sm} size={size} bold>
          {$.subjectSeries.title}
        </Text>
      </Flex>
      <Heatmap
        id='条目.跳转'
        data={{
          from: '系列'
        }}
      />
    </Touchable>
  )
}

export default obc(Series, {
  size: 14
})

const memoStyles = _.memoStyles(_ => ({
  cover: {
    backgroundColor: _.select(_.colorBg, _.colorPlain)
  },
  relation: {
    paddingLeft: 2,
    marginTop: _.sm,
    marginBottom: _.sm + 4
  },
  series: {
    width: 180 * _.ratio,
    paddingLeft: 2,
    paddingRight: _.sm,
    marginVertical: _.sm + 2,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  icon: {
    marginRight: -_.sm
  },
  touch: {
    paddingRight: _.sm,
    marginLeft: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
