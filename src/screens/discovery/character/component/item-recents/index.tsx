/*
 * @Author: czy0729
 * @Date: 2019-10-01 22:12:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 人物近况条目
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar, Cover, Flex, Iconfont, Katakana, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { InView, Manage, Stars, Tag } from '@_'
import { _, collectionStore, uiStore } from '@stores'
import { cnjp, date, getAction, getTimestamp, HTMLDecode, stl, x18 } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { IMG_SUBJECT_ONLY, MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT, COVER_HEIGHT, COVER_WIDTH } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus, MonoId, SubjectTypeCn } from '@types'
import type { Props } from './types'

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
  actors = [],
  showDivider
}: Props) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  const y = COVER_HEIGHT * (index + 1)
  const left = cnjp(name, nameJP)
  const right = cnjp(nameJP, name)
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
  const collection = collectionStore.collect(id, typeCn)
  const isNSFW = x18(id, name || nameJP)
  const topActors = actors.slice(0, 4)

  const handlePressManage = () => {
    uiStore.showManageModal(
      {
        subjectId: id,
        title: left,
        desc: right,
        status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
        action: getAction(typeCn)
      },
      '人物近况'
    )
  }

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
    <>
      {!!showDivider && (
        <Flex>
          <Flex.Item style={styles.dividerLine} />
          <Iconfont name='md-access-time' color={_.colorMain} size={16} />
          <Text style={_.ml.xs} type='main' bold>
            {date('y-m-d', getTimestamp())}
          </Text>
          <Flex.Item style={styles.dividerLine} />
        </Flex>
      )}
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
            <Touchable style={styles.title} onPress={handlePressSubject}>
              <Flex.Item>
                <Katakana.Provider size={13} bold numberOfLines={2}>
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

                {(isNSFW || !!type) && (
                  <Flex style={_.mt.xs}>
                    {isNSFW && <Tag value='NSFW' />}
                    {!!type && <Tag style={isNSFW ? _.ml.sm : undefined} value={typeCn} />}
                  </Flex>
                )}
              </Flex.Item>
              <Manage
                subjectId={id}
                collection={collection}
                typeCn={typeCn}
                onPress={handlePressManage}
              />
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
                {topActors.map(item => (
                  <Flex
                    key={item.id}
                    style={stl(topActors.length > 1 && styles.actors, _.mt.md)}
                  >
                    <Touchable animate onPress={() => handlePressActor(item.id)}>
                      <Avatar src={item.avatar} size={32} radius={_.radiusXs} />
                    </Touchable>
                    <Flex.Item style={_.ml.sm}>
                      <Text size={12} numberOfLines={1} bold>
                        {item.name}
                      </Text>
                      <Text style={_.mt.xs} size={10} type='sub' numberOfLines={1}>
                        {item.info.split(/\s+/).join(' / ')}
                      </Text>
                    </Flex.Item>
                  </Flex>
                ))}
              </Flex>
            </InView>
          </Flex>
        </Flex.Item>
      </Flex>
    </>
  )
}

export default observer(ItemRecents)
