/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-25 17:40:55
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { EVENT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Tag from '../base/tag'
import Cover from '../base/cover'
import Stars from '../base/stars'

const imgWidth = 80
const imgHeight = 1.28 * imgWidth

function ItemSearch({
  navigation,
  index,
  id,
  cover,
  name,
  nameCn,
  tip,
  score,
  total,
  rank,
  type,
  collected,
  comments,
  position = [],
  event
}) {
  const styles = memoStyles()

  // 人物高清图不是正方形的图, 所以要特殊处理
  const isMono = !id.includes('/subject/')
  const isFirst = index === 0
  return (
    <Touchable
      style={[styles.container, collected && styles.containerActive]}
      highlight
      onPress={() => {
        appNavigate(
          id,
          navigation,
          {
            _jp: name,
            _cn: nameCn,
            _image: cover
          },
          event
        )
      }}
    >
      <Flex align='start' style={[styles.wrap, !isFirst && styles.border]}>
        <View style={styles.imgContainer}>
          <Cover
            style={styles.image}
            src={cover}
            resizeMode={isMono ? 'contain' : undefined}
            placeholder={!isMono}
            width={imgWidth}
            height={imgHeight}
            radius
            shadow
          />
        </View>
        <Flex.Item style={[styles.item, _.ml.wind]}>
          <Flex
            style={styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <View>
              <Flex align='start' style={{ width: '100%' }}>
                <Flex.Item>
                  {!!(nameCn || name) && (
                    <Text size={15} numberOfLines={1} bold>
                      {HTMLDecode(nameCn || name)}
                      {!!comments && (
                        <Text type='main' lineHeight={15}>
                          {' '}
                          {comments}
                        </Text>
                      )}
                    </Text>
                  )}
                  {!!name && name !== nameCn && (
                    <Text
                      style={_.mt.xs}
                      type='sub'
                      size={12}
                      numberOfLines={1}
                    >
                      {HTMLDecode(name)}
                    </Text>
                  )}
                </Flex.Item>
                {!!type && (
                  <Tag
                    style={_.ml.sm}
                    value={MODEL_SUBJECT_TYPE.getTitle(type)}
                  />
                )}
              </Flex>
              {!!tip && (
                <Text style={_.mt.sm} size={12} numberOfLines={2}>
                  {HTMLDecode(tip)}
                </Text>
              )}
            </View>
            {!!position.length && (
              <Flex style={_.mt.md} wrap='wrap'>
                {position.map(item => (
                  <Tag key={item} style={_.mr.sm} value={item} />
                ))}
              </Flex>
            )}
            <Flex style={_.mt.md}>
              <Stars style={_.mr.xs} value={score} color='warning' />
              <Text style={_.mr.sm} type='sub' size={13}>
                {total}
              </Text>
              {!!rank && (
                <Text type='primary' size={13}>
                  #{rank}
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

ItemSearch.defaultProps = {
  event: EVENT
}

export default observer(ItemSearch)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  containerActive: {
    backgroundColor: _.colorMainLight
  },
  imgContainer: {
    width: imgWidth
  },
  wrap: {
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  content: {
    minHeight: imgHeight
  }
}))
