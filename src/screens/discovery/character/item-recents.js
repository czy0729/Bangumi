/*
 * @Author: czy0729
 * @Date: 2019-10-01 22:12:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 14:05:20
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Katakana, Text, Heatmap } from '@components'
import { Tag, Stars, Cover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { x18 } from '@utils/app'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function ItemRecents(
  { index, id, cover, name, nameJP, type, info, star, starInfo, actors = [] },
  { navigation }
) {
  const styles = memoStyles()
  const isFirst = index === 0
  const onPress = () => {
    t('收藏的人物.跳转', {
      to: 'Subject',
      subjectId: id
    })
    navigation.push('Subject', {
      subjectId: id,
      _jp: nameJP,
      _cn: name,
      _image: cover
    })
  }
  const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
  return (
    <View style={styles.container}>
      <Flex
        align='start'
        style={[styles.wrap, !isFirst && !_.flat && styles.border]}
      >
        <View style={styles.imgContainer}>
          {!!cover && (
            <Cover
              style={styles.image}
              src={cover}
              width={IMG_WIDTH}
              height={IMG_HEIGHT}
              radius
              shadow
              type={typeCn}
              onPress={onPress}
            />
          )}
        </View>
        <Flex.Item>
          <Touchable onPress={onPress}>
            <Flex direction='column' justify='between' align='start'>
              <View>
                <Flex align='start' style={{ width: '100%' }}>
                  <Flex.Item>
                    <Katakana.Provider size={15} numberOfLines={2}>
                      <Katakana size={15} bold>
                        {HTMLDecode(name || nameJP)}
                      </Katakana>
                      {!!nameJP && (
                        <Katakana type='sub' size={11} lineHeight={15}>
                          {' '}
                          {HTMLDecode(nameJP)}
                        </Katakana>
                      )}
                    </Katakana.Provider>
                  </Flex.Item>
                  <Flex style={_.mt.xxs}>
                    {x18(id, name || nameJP) && (
                      <Tag style={_.ml.sm} value='H' />
                    )}
                    {!!type && <Tag style={_.ml.sm} value={typeCn} />}
                  </Flex>
                </Flex>
                {!!info && (
                  <Text
                    style={_.mt.sm}
                    size={12}
                    lineHeight={14}
                    numberOfLines={4}
                  >
                    {HTMLDecode(info)}
                  </Text>
                )}
              </View>
              {!!star && !!starInfo && (
                <Flex style={_.mt.sm}>
                  {!!star && (
                    <Stars style={_.mr.xs} value={star} color='warning' />
                  )}
                  <Text style={_.mr.sm} type='sub' size={12}>
                    {starInfo}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Touchable>
          <Flex style={_.mt.sm} wrap='wrap'>
            {actors.map(item => (
              <Flex key={item.id} style={[styles.actors, _.mt.md]}>
                <Cover
                  src={item.avatar}
                  size={36}
                  radius
                  shadow
                  onPress={() => {
                    t('收藏的人物.跳转', {
                      to: 'Mono',
                      monoId: item.id
                    })

                    navigation.push('Mono', {
                      monoId: item.id
                    })
                  }}
                />
                <Flex.Item style={_.ml.sm}>
                  <Text size={12} numberOfLines={1} bold>
                    {item.name}
                  </Text>
                  <Text size={10} lineHeight={12} type='sub' numberOfLines={1}>
                    {item.info}
                  </Text>
                </Flex.Item>
              </Flex>
            ))}
          </Flex>
        </Flex.Item>
      </Flex>
      {!index && <Heatmap id='收藏的人物.跳转' />}
    </View>
  )
}

export default obc(ItemRecents)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  imgContainer: {
    width: IMG_WIDTH,
    marginRight: _.md + 4
  },
  wrap: {
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  actors: {
    width: '50%'
  }
}))
