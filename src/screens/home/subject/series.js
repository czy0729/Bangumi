/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-26 23:06:58
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { Cover as CompCover, IconTouchable } from '@screens/_'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'

function Series({ prev, after, series, size }, { $, navigation }) {
  if (!(prev || after || series)) {
    return null
  }

  const styles = memoStyles()
  const { showRelation } = systemStore.setting
  if (prev || after) {
    return (
      <Flex style={showRelation && styles.relation}>
        <Flex.Item>
          {showRelation && (
            <Flex>
              <Text size={13}>⤷</Text>
              {!!prev && (
                <Touchable
                  style={_.ml.sm}
                  onPress={() => {
                    t('条目.跳转', {
                      to: 'Subject',
                      from: '系列前传',
                      subjectId: $.subjectId
                    })
                    navigation.push('Subject', {
                      subjectId: prev.id,
                      _jp: prev.title,
                      _image: prev.image
                    })
                  }}
                >
                  <Flex>
                    <CompCover
                      style={styles.cover}
                      src={prev.image}
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
              {!!after && (
                <Touchable
                  style={_.ml.sm}
                  onPress={() => {
                    t('条目.跳转', {
                      to: 'Subject',
                      from: '系列续集',
                      subjectId: $.subjectId
                    })
                    navigation.push('Subject', {
                      subjectId: after.id,
                      _jp: after.title,
                      _image: after.image
                    })
                  }}
                >
                  <Flex>
                    <CompCover
                      style={styles.cover}
                      src={after.image}
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
          subjectId: series.id,
          _jp: series.title,
          _image: series.image
        })
      }}
    >
      <Flex>
        <Text size={13}>⤷</Text>
        <CompCover
          style={[styles.cover, _.ml.sm]}
          src={series.image}
          size={24}
          height={24 * 1.33}
          radius
          placeholder={false}
          fadeDuration={0}
          noDefault
        />
        <Text style={_.ml.sm} size={size} bold>
          {series.title}
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

Series.defaultProps = {
  size: 14
}

Series.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Series)

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
