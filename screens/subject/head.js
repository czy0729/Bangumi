/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-20 03:03:30
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { ScoreTag } from '@screens/_'
import { HTMLDecode } from '@utils/html'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'

const imageWidth = 120

const Head = ({ style }, { $ }) => {
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
  const image = images.large || _image

  // bangumiInfo只有动画的数据
  let label = MODEL_SUBJECT_TYPE.getTitle(type)
  if (label === '动画') {
    label = String($.state.bangumiInfo.type).toUpperCase()
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.image}>
        <Image
          src={image}
          size={imageWidth}
          height={160}
          radius
          border
          shadow
        />
      </View>
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
            {rating.score === '' ? '-' : rating.score.toFixed(1)}
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 48
  },
  image: {
    position: 'absolute',
    zIndex: 1,
    top: _.wind,
    left: _.wind
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
})
