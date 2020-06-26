/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 01:22:17
 */
import React from 'react'
import { View, Clipboard } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Katakana } from '@components'
import { ScoreTag, Tag } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { info } from '@utils/ui'
import { x18 } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { imageWidth, imageHeight } from './store'
import Cover from './cover'

function Head({ style }, { $ }) {
  const styles = memoStyles()
  const { images = {} } = $.subject

  // bangumiInfo只有动画的数据
  let label = MODEL_SUBJECT_TYPE.getTitle($.subjectType)
  if (label === '动画') {
    const { bangumiInfo } = $.state
    label = String(bangumiInfo.type).toUpperCase()
  }
  return (
    <View style={[styles.container, style]}>
      <Cover image={images.common} placeholder={$.coverPlaceholder} />
      <View style={styles.content}>
        <View style={styles.title}>
          {!!$.jp && (
            <Katakana.Provider size={$.jp.length > 12 ? 11 : 13}>
              <Katakana
                type='sub'
                size={$.jp.length > 12 ? 11 : 13}
                onLongPress={() => {
                  Clipboard.setString($.jp)
                  info(`已复制 ${$.jp}`)
                }}
              >
                {$.jp}
                {!!label && ` · ${label}`}
              </Katakana>
            </Katakana.Provider>
          )}
          <Text
            style={!!$.cn && _.mt.xs}
            size={$.cn.length > 16 ? 15 : 18}
            bold
            onLongPress={() => {
              Clipboard.setString($.cn)
              info(`已复制 ${$.cn}`)
            }}
          >
            {$.cn}
          </Text>
        </View>
        <Flex>
          {!$.hideScore && (
            <>
              <Text type='main' size={20}>
                {$.rating.score === '' ? '-' : toFixed($.rating.score, 1)}
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
  $: PropTypes.object
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
  }
}))
