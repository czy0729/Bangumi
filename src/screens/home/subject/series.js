/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 13:59:29
 */
import React from 'react'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { Cover as CompCover, IconTouchable } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_DEFAULT } from '@constants'

function Series({ size }, { $, navigation }) {
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
              <Text size={13}>⤷</Text>
              {!!$.subjectPrev && (
                <Touchable
                  style={_.ml.sm}
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
                      size={24}
                      height={24 * 1.33}
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
                  style={_.ml.sm}
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
                      size={24}
                      height={24 * 1.33}
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
                  style={_.ml.sm}
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
                      size={24}
                      height={24 * 1.33}
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
          name={showRelation ? 'down' : 'right'}
          size={16}
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
          size={24}
          height={24 * 1.33}
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
    width: 180,
    paddingLeft: 2,
    paddingRight: _.sm,
    marginVertical: _.sm + 2
  },
  icon: {
    marginRight: -_.sm
  }
}))
