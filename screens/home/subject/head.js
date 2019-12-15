/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-15 13:42:08
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { ScoreTag } from '@screens/_'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { HTMLDecode } from '@utils/html'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Cover from './cover'

const imageWidth = 120

function Head({ style }, { $ }) {
  const styles = memoStyles()
  const {
    images = {},
    name = '',
    name_cn: nameCn = '',
    rating = {
      count: {},
      score: '',
      total: ''
    },
    type
  } = $.subject

  // 跨页面传递的参数
  const { _jp, _cn, _image } = $.params
  const jp = HTMLDecode(name || _jp || '')
  const cn = HTMLDecode(nameCn || name || _cn || '')

  // bangumiInfo只有动画的数据
  let label = MODEL_SUBJECT_TYPE.getTitle(type)
  if (label === '动画') {
    label = String($.state.bangumiInfo.type).toUpperCase()
  }

  return (
    <View style={[styles.container, style]}>
      <Cover image={images.large} placeholder={_image} />
      <Flex
        style={styles.content}
        direction='column'
        justify='between'
        align='start'
      >
        <View>
          {!!jp && (
            <Text type='sub' size={jp.length > 16 ? 11 : 13}>
              {jp} · {label}
            </Text>
          )}
          <Text style={!!cn && _.mt.xs} size={cn.length > 16 ? 16 : 20}>
            {cn}
          </Text>
        </View>
        <Flex>
          <Text type='main' size={22} lineHeight={1}>
            {rating.score === '' ? '-' : toFixed(rating.score, 1)}
          </Text>
          {rating.score !== '' && (
            <ScoreTag style={_.ml.sm} value={rating.score} />
          )}
        </Flex>
      </Flex>
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
    height: 144,
    paddingVertical: _.wind,
    paddingLeft: imageWidth + _.wind + 12,
    paddingRight: _.wind,
    backgroundColor: _.colorPlain,
    borderTopLeftRadius: _.radiusLg,
    borderTopRightRadius: _.radiusLg
  }
}))
