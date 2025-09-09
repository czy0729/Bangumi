/*
 * @Author: czy0729
 * @Date: 2019-10-01 22:12:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 18:40:25
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Cover, Flex, Katakana, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { InView, Stars, Tag } from '@_'
import { _ } from '@stores'
import { cnjp, HTMLDecode, stl, x18 } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { IMG_SUBJECT_ONLY, MODEL_SUBJECT_TYPE } from '@constants'
import { MonoId, SubjectTypeCn } from '@types'
import { COMPONENT, COVER_HEIGHT, COVER_WIDTH } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function ItemRecents({
  index,
  id,
  cover,
  name,
  nameJP,
  type,
  info,
  star,
  starInfo,
  actors = []
}: Props) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const y = COVER_HEIGHT * (index + 1)
    const left = cnjp(name, nameJP)
    const right = cnjp(nameJP, name)
    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
    const numberOfLines = info?.length >= 40 ? 2 : 3

    const handlePressSubject = () => {
      navigation.push('Subject', {
        subjectId: id,
        _jp: nameJP,
        _cn: name,
        _image: getCoverSrc(cover, COVER_WIDTH),
        _type: typeCn
      })

      t('收藏的人物.跳转', {
        to: 'Subject',
        subjectId: id
      })
    }

    const handlePressActor = (actorId: MonoId) => {
      navigation.push('Mono', {
        monoId: actorId
      })

      t('收藏的人物.跳转', {
        to: 'Mono',
        monoId: actorId
      })
    }

    return (
      <Flex align='start' style={styles.container}>
        <InView style={styles.inView} y={y}>
          <Touchable animate onPress={handlePressSubject}>
            <Cover
              src={cover || IMG_SUBJECT_ONLY}
              width={COVER_WIDTH}
              height={COVER_HEIGHT}
              radius
              type={typeCn}
            />
          </Touchable>
        </InView>

        <Flex.Item style={_.ml.md}>
          <Flex style={styles.content} direction='column' justify='between' align='start'>
            <Touchable animate onPress={handlePressSubject}>
              <Flex style={_.container.block} align='start'>
                <Flex.Item>
                  <Katakana.Provider size={13} bold numberOfLines={numberOfLines}>
                    <Katakana size={13} bold>
                      {left}
                    </Katakana>
                    {!!right && right !== left && (
                      <Katakana type='sub' size={12} lineHeight={13} bold>
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
            </Touchable>

            <View>
              {!!info && (
                <Text style={_.mt.sm} size={11} lineHeight={13} numberOfLines={3}>
                  {HTMLDecode(info)}
                </Text>
              )}
              {!!star && !!starInfo && (
                <Flex style={_.mt.sm}>
                  {!!star && <Stars style={_.mr.xs} value={star} />}
                  <Text style={_.mr.sm} type='sub' size={11}>
                    {starInfo}
                  </Text>
                </Flex>
              )}
            </View>

            <InView style={_.mt.sm} y={y}>
              <Flex wrap='wrap'>
                {actors.map(item => (
                  <Flex key={item.id} style={stl(actors.length > 1 && styles.actors, _.mt.md)}>
                    <Touchable animate onPress={() => handlePressActor(item.id)}>
                      <Avatar src={item.avatar} size={32} radius />
                    </Touchable>
                    <Flex.Item style={_.ml.sm}>
                      <Text size={12} numberOfLines={1} bold>
                        {item.name}
                      </Text>
                      <Text style={_.mt.xs} size={10} type='sub' numberOfLines={1}>
                        {item.info.replace(/ {2,}/g, '　')}
                      </Text>
                    </Flex.Item>
                  </Flex>
                ))}
              </Flex>
            </InView>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  })
}

export default ItemRecents
