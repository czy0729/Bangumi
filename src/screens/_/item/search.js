/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 02:28:59
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Katakana, Text, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate, x18 } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { EVENT, IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Tag from '../base/tag'
import Cover from '../base/cover'
import Stars from '../base/stars'

function ItemSearch({
  style,
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
      style={[styles.container, style, collected && styles.containerActive]}
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
      <Flex
        align='start'
        style={[styles.wrap, !isFirst && !_.flat && styles.border]}
      >
        <View style={styles.imgContainer}>
          <Cover
            style={styles.image}
            src={cover}
            resizeMode={isMono ? 'contain' : undefined}
            placeholder={!isMono}
            width={IMG_WIDTH}
            height={IMG_HEIGHT}
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
                    <Katakana.Provider size={15} numberOfLines={2}>
                      <Katakana size={15} bold>
                        {HTMLDecode(nameCn || name)}
                      </Katakana>
                      {!!comments && (
                        <Text type='main' lineHeight={15}>
                          {' '}
                          {comments}
                        </Text>
                      )}
                      {!!name && name !== nameCn && (
                        <Katakana
                          type='sub'
                          size={11}
                          lineHeight={15}
                          numberOfLines={1}
                        >
                          {' '}
                          {HTMLDecode(name)}
                        </Katakana>
                      )}
                    </Katakana.Provider>
                  )}
                </Flex.Item>
                <Flex style={_.mt.xxs}>
                  {x18(id, nameCn) && <Tag style={_.ml.sm} value='H' />}
                  {!!type && (
                    <Tag
                      style={_.ml.sm}
                      value={MODEL_SUBJECT_TYPE.getTitle(type)}
                    />
                  )}
                </Flex>
              </Flex>
              {!!tip && (
                <Text style={_.mt.md} size={11} numberOfLines={2}>
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
            <Flex
              style={{
                marginTop: _.md + 4
              }}
            >
              <Stars style={_.mr.xs} value={score} color='warning' />
              <Text style={_.mr.sm} type='sub' size={12}>
                {total}
              </Text>
              {!!rank && (
                <Text type='primary' size={12} bold>
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
    paddingLeft: _.wind
  },
  containerActive: {
    backgroundColor: _.colorMainLight
  },
  imgContainer: {
    width: IMG_WIDTH
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
    minHeight: IMG_HEIGHT - 12
  }
}))
