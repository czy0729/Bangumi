/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 06:36:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, getCoverSrc, Image, Text, Touchable } from '@components'
import { Stars } from '@_'
import { _ } from '@stores'
import { cnjp, getTimestamp, HTMLDecode, lastDate } from '@utils'
import { ob } from '@utils/decorators'
import { IMG_SUBJECT_ONLY, MODEL_SUBJECT_TYPE } from '@constants'
import { memoStyles } from './styles'

const NUM_COLUMNS = _.isPad ? 5 : 4

function Item({ $, navigation, item, index }) {
  const styles = memoStyles()
  const width = Math.floor(_.window.contentWidth / (NUM_COLUMNS + 0.2 * NUM_COLUMNS))
  const ts = getTimestamp(item.time)
  let extraTitleText = lastDate(ts)
  if (extraTitleText.includes('年')) extraTitleText = lastDate(ts, false)
  return (
    <Flex
      key={item.id}
      style={{
        width: `${Math.floor(100 / NUM_COLUMNS)}%`
      }}
      justify='center'
      align='start'
    >
      <Touchable
        onPress={() => {
          navigation.push('Subject', {
            subjectId: item.id,
            _image: getCoverSrc(item.cover, width),
            _cn: item.nameCn,
            _jp: item.name,
            _type: MODEL_SUBJECT_TYPE.getTitle($.state.subjectType)
          })
        }}
      >
        <Flex
          style={[
            styles.item,
            {
              width
            }
          ]}
          direction='column'
        >
          <Flex
            style={{
              width
            }}
            justify='center'
          >
            <View style={styles.image}>
              <Image
                src={
                  item.cover === '/img/no_icon_subject.png'
                    ? IMG_SUBJECT_ONLY
                    : getCoverSrc(item.cover, width, false, true)
                }
                autoSize={width}
                radius={0}
                skeleton={false}
                placeholder={false}
                border={_.select('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.16)')}
                priority={index < 10 ? 'high' : index < 24 ? 'normal' : 'low'}
              />
            </View>
          </Flex>
          <Text style={styles.title} size={12} bold numberOfLines={2} align='center'>
            {HTMLDecode(cnjp(item.nameCn || item.name, item.name || item.nameCn))}
          </Text>
          <Text style={styles.sub} type='sub' size={12} bold align='center'>
            {extraTitleText}
          </Text>
          {!!item.score && <Stars style={styles.stars} value={item.score} simple />}
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default ob(Item)
