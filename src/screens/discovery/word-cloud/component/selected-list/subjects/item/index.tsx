/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:20:21
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, getCoverSrc, Text, Touchable } from '@components'
import { InView, Stars } from '@_'
import { _, useStore } from '@stores'
import { getTimestamp, lastDate } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_SUBJECT_ONLY, MODEL_SUBJECT_TYPE, WEB } from '@constants'
import { NUM_COLUMNS } from '../../ds'
import { Ctx } from '../../../../types'
import { memoStyles } from './styles'
import { Props } from './types'

function Item({ item, index }: Props) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const width = Math.floor(_.window.contentWidth / (NUM_COLUMNS + 0.2 * NUM_COLUMNS))
  const height = $.state.subjectType === 'music' ? width : Math.floor(width * 1.4)

  const ts = getTimestamp(item.time)
  let extraTitleText = lastDate(ts)
  if (extraTitleText.includes('年')) extraTitleText = lastDate(ts, false)

  return (
    <Flex
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
            _cn: item.name,
            _jp: item.name,
            _type: MODEL_SUBJECT_TYPE.getTitle($.state.subjectType)
          })

          t('词云.跳转', {
            to: 'Subject',
            subjectId: item.id
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
              <InView
                style={{
                  width,
                  height
                }}
                y={(height + 40) * Math.floor(index / 4 + 1)}
              >
                <Cover
                  src={item.cover || IMG_SUBJECT_ONLY}
                  size={width}
                  height={height}
                  radius={0}
                  skeleton={false}
                  border={WEB ? _.select('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.16)') : 0}
                  priority={index < 4 ? 'high' : index < 8 ? 'normal' : 'low'}
                />
              </InView>
            </View>
          </Flex>
          <Text style={styles.title} size={12} bold numberOfLines={2} align='center'>
            {item.name}
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
