/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 02:35:07
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { collectionStore, uiStore, _ } from '@stores'
import { Tag, Cover, Stars, Rank, Manage } from '@_'
import { x18 } from '@utils'
import { obc } from '@utils/decorators'
import { pick } from '@utils/subject/anime'
import { t } from '@utils/fetch'
import {
  IMG_WIDTH_LG,
  IMG_HEIGHT_LG,
  IMG_DEFAULT,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Item({ index, pickIndex }, { $, navigation }: Ctx) {
  const {
    id,
    ageId,
    image,
    cn,
    ep,
    type,
    status,
    begin,
    tags,
    official,
    score,
    rank,
    total
  } = pick(pickIndex)
  if (!id) return null

  const styles = memoStyles()
  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const _tags = String(tags)
    .split(' ')
    .filter(item => !!item && item !== '暂无')
  const tip = [
    type === 'TV' ? '' : type,
    String(ep).replace(/\(完结\)|第/g, ''),
    status,
    begin,
    official
  ]
    .filter(item => !!item)
    .join(' / ')
  const collection = $.userCollectionsMap[id]
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        navigation.push('Subject', {
          subjectId: id,
          _cn: cn,
          _image: cover,
          _aid: ageId
        })

        t('Anime.跳转', {
          subjectId: id
        })
      }}
    >
      <Flex align='start' style={styles.wrap}>
        <View style={styles.imgContainer}>
          <Cover
            src={cover}
            width={IMG_WIDTH_LG}
            height={IMG_HEIGHT_LG}
            radius
            shadow
          />
        </View>
        <Flex.Item style={_.ml.wind}>
          <Flex
            style={styles.content}
            direction='column'
            justify='between'
            align='start'
          >
            <Flex align='start' style={styles.body}>
              <Flex.Item>
                <Text size={15} numberOfLines={2}>
                  <Text size={15} bold>
                    {cn}
                  </Text>
                </Text>
              </Flex.Item>
              {x18(id) && <Tag style={_.ml.sm} value='NSFW' />}
              <Manage
                collection={collectionStore.collectionStatus(id) || collection || ''}
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: id,
                      title: cn,
                      status:
                        MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
                    },
                    '找番剧',
                    () => {
                      collectionStore.fetchCollectionStatusQueue([id])
                    }
                  )
                }}
              />
            </Flex>
            <Text size={11} lineHeight={14}>
              {tip}
            </Text>
            <Flex style={_.mt.md} wrap='wrap'>
              <Rank value={rank} />
              <Stars style={_.mr.xs} value={score} simple />
              {!!total && (
                <Text style={_.mr.sm} type='sub' size={11} bold>
                  ({total})
                </Text>
              )}
              <Flex.Item>
                <Flex>
                  {_tags.map(item => (
                    <Tag key={item} style={_.mr.sm} value={item} />
                  ))}
                </Flex>
              </Flex.Item>
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='Anime.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
