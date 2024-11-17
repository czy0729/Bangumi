/*
 * @Author: czy0729
 * @Date: 2019-10-01 22:12:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:32:33
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Cover, Flex, Heatmap, Katakana, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Stars, Tag } from '@_'
import { _ } from '@stores'
import { cnjp, HTMLDecode, stl, x18 } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { IMG_HEIGHT_LG, IMG_WIDTH_LG, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemRecents({ index, id, cover, name, nameJP, type, info, star, starInfo, actors = [] }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
  const onPress = () => {
    t('收藏的人物.跳转', {
      to: 'Subject',
      subjectId: id
    })

    navigation.push('Subject', {
      subjectId: id,
      _jp: nameJP,
      _cn: name,
      _image: getCoverSrc(cover, IMG_WIDTH_LG),
      _type: typeCn
    })
  }
  const left = cnjp(name, nameJP)
  const right = cnjp(nameJP, name)
  return (
    <View style={styles.container}>
      <Flex align='start' style={styles.wrap}>
        <View style={styles.imgContainer}>
          {!!cover && (
            <Touchable animate onPress={onPress}>
              <Cover
                src={cover}
                width={IMG_WIDTH_LG}
                height={IMG_HEIGHT_LG}
                radius
                shadow
                type={typeCn}
              />
            </Touchable>
          )}
        </View>
        <Flex.Item>
          <Touchable animate onPress={onPress}>
            <Flex direction='column' justify='between' align='start'>
              <View>
                <Flex style={_.container.block} align='start'>
                  <Flex.Item>
                    <Katakana.Provider numberOfLines={3}>
                      <Katakana bold>{left}</Katakana>
                      {!!right && right !== left && (
                        <Katakana type='sub' size={11} lineHeight={14}>
                          {' '}
                          {right}
                        </Katakana>
                      )}
                    </Katakana.Provider>
                  </Flex.Item>
                  <Flex>
                    {x18(id, name || nameJP) && <Tag style={_.ml.sm} value='NSFW' />}
                    {!!type && <Tag style={_.ml.sm} value={typeCn} />}
                  </Flex>
                </Flex>
                {!!info && (
                  <Text style={_.mt.sm} size={12} lineHeight={14} numberOfLines={4}>
                    {HTMLDecode(info)}
                  </Text>
                )}
              </View>
              {!!star && !!starInfo && (
                <Flex style={_.mt.sm}>
                  {!!star && <Stars style={_.mr.xs} value={star} />}
                  <Text style={_.mr.sm} type='sub' size={11}>
                    {starInfo}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Touchable>
          <Flex style={_.mt.sm} wrap='wrap'>
            {actors.map(item => (
              <Flex key={item.id} style={stl(actors.length > 1 && styles.actors, _.mt.md)}>
                <Touchable
                  animate
                  onPress={() => {
                    t('收藏的人物.跳转', {
                      to: 'Mono',
                      monoId: item.id
                    })

                    navigation.push('Mono', {
                      monoId: item.id
                    })
                  }}
                >
                  <Avatar src={item.avatar} size={32} radius />
                </Touchable>
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

export default ob(ItemRecents, COMPONENT)
