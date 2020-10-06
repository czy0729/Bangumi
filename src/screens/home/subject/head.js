/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-06 19:09:18
 */
import React from 'react'
import { View, Clipboard } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Katakana, Touchable } from '@components'
import { ScoreTag, Tag, Cover as CompCover } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { info } from '@utils/ui'
import { x18 } from '@utils/app'
import { t } from '@utils/fetch'
import { imageWidth, imageHeight } from './store'
import Cover from './cover'

function Head({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { images = {} } = $.subject
  const isSeries = $.relations?.[0]?.desc === '系列'
  let size
  if ($.cn.length > 24) {
    size = 11
  } else if ($.cn.length > 16) {
    size = 13
  } else {
    size = 17
  }
  return (
    <View style={[styles.container, style]}>
      <Cover image={images.common} placeholder={$.coverPlaceholder} />
      <View style={styles.content}>
        <View style={styles.title}>
          {!!$.jp && (
            <Katakana.Provider
              size={$.jp.length > 12 ? 11 : 13}
              itemStyle={styles.katakana}
              numberOfLines={2}
            >
              <Katakana
                type='sub'
                size={$.jp.length > 12 ? 11 : 13}
                numberOfLines={2}
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
          {isSeries ? (
            <Touchable
              style={styles.series}
              onPress={() => {
                t('条目.跳转', {
                  to: 'Subject',
                  from: '系列',
                  subjectId: $.subjectId
                })
                navigation.push('Subject', {
                  subjectId: $.relations[0].id,
                  _jp: $.relations[0].name,
                  _image: $.relations[0].image
                })
              }}
            >
              <Flex>
                <Text size={13}>⤷</Text>
                <CompCover
                  style={_.ml.sm}
                  src={$.relations[0].image}
                  size={24}
                  height={24 * 1.33}
                  radius
                  placeholder={false}
                  fadeDuration={0}
                  noDefault
                />
                <Text style={_.ml.sm} size={size} bold>
                  {$.relations[0].name}
                </Text>
              </Flex>
            </Touchable>
          ) : (
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

Head.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Head)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingTop: 48
  },
  content: {
    minHeight: imageHeight - _.space,
    paddingVertical: _.space,
    paddingLeft: imageWidth + _.wind + 12,
    paddingRight: _.wind,
    backgroundColor: _.colorPlain,
    borderTopLeftRadius: _.radiusLg,
    borderTopRightRadius: _.radiusLg
  },
  title: {
    minHeight: 84
  },
  katakana: {
    marginTop: -11
  },
  series: {
    width: 168,
    paddingRight: _.sm,
    marginTop: _.sm
  }
}))
