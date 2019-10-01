/*
 * @Author: czy0729
 * @Date: 2019-10-01 22:12:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-02 00:29:56
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import { Tag, Stars } from '@screens/_'
import { getCoverMedium } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { IMG_DEFAULT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'

const imgWidth = 96
const imgHeight = 1.28 * imgWidth

function Item(
  { index, id, cover, name, nameJP, type, info, star, starInfo, actors = [] },
  { navigation }
) {
  const isFirst = index === 0
  const onPress = () =>
    navigation.push('Subject', {
      subjectId: id
    })
  return (
    <Flex
      align='start'
      style={[styles.container, styles.wrap, !isFirst && styles.border]}
    >
      <View style={styles.imgContainer}>
        {!!cover && (
          <Image
            style={styles.image}
            src={getCoverMedium(cover)}
            width={imgWidth}
            height={imgHeight}
            resizeMode='contain'
            placeholder={false}
            radius
            shadow
            onPress={onPress}
          />
        )}
      </View>
      <Flex.Item style={[styles.item, _.ml.wind]}>
        <Touchable onPress={onPress}>
          <Flex direction='column' justify='between' align='start'>
            <View>
              <Flex align='start' style={{ width: '100%' }}>
                <Flex.Item>
                  {!!name && (
                    <Text size={15} numberOfLines={2}>
                      {HTMLDecode(name)}
                    </Text>
                  )}
                  {!!nameJP && (
                    <Text
                      style={_.mt.xs}
                      type='sub'
                      size={12}
                      numberOfLines={1}
                    >
                      {HTMLDecode(nameJP)}
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
              {!!info && (
                <Text style={_.mt.md} size={12}>
                  {HTMLDecode(info)}
                </Text>
              )}
            </View>
            <Flex style={_.mt.md}>
              {!!star && <Stars style={_.mr.xs} value={star} color='warning' />}
              <Text style={_.mr.sm} type='sub' size={12}>
                {starInfo}
              </Text>
            </Flex>
          </Flex>
        </Touchable>
        <Flex wrap='wrap'>
          {actors.map(item => (
            <Flex key={item.id} style={[styles.actors, _.mt.md]}>
              <Image
                src={item.avatar || IMG_DEFAULT}
                size={40}
                border
                radius
                onPress={() =>
                  navigation.push('Mono', {
                    monoId: item.id
                  })
                }
              />
              <Flex.Item style={_.ml.sm}>
                <Text size={12} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={_.mt.xs} size={12} type='sub' numberOfLines={1}>
                  {item.info}
                </Text>
              </Flex.Item>
            </Flex>
          ))}
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  imgContainer: {
    width: imgWidth
  },
  wrap: {
    paddingVertical: _.wind,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  actors: {
    width: '50%'
  }
})
