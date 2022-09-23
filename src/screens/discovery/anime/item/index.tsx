/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-23 11:44:45
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap, Loading } from '@components'
import { _, otaStore, collectionStore, uiStore } from '@stores'
import { Tag, Tags, Cover, Stars, Rank, Manage } from '@_'
import { cnjp, x18 } from '@utils'
import { obc } from '@utils/decorators'
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
  const styles = memoStyles()
  const subjectId = otaStore.animeSubjectId(pickIndex)
  const {
    id,
    ageId,
    image,
    cn,
    jp,
    ep,
    type,
    status,
    begin,
    tags,
    official,
    score,
    rank,
    total
  } = otaStore.anime(subjectId)
  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const cover = image ? `//lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT
  const _tags = String(tags)
    .split(' ')
    .filter(item => !!item && item !== '暂无')
  const tipStr = [
    type === 'TV' ? '' : type,
    String(ep).replace(/\(完结\)|第|\[|\]/g, ''),
    status,
    begin,
    official === '暂无' ? '' : official
  ]
    .filter(item => !!item)
    .join(' / ')
  const collection =
    collectionStore.collectionStatus(id) || $.userCollectionsMap[id] || ''
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
                <Text size={15} bold numberOfLines={2}>
                  {cnjp(cn, jp)}
                </Text>
              </Flex.Item>
              {x18(id) && <Tag style={_.ml.sm} value='NSFW' />}
              <Manage
                collection={collection}
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: id,
                      title: cnjp(cn, jp),
                      desc: cnjp(jp, cn),
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
            <Text style={styles.tip} size={11} lineHeight={14}>
              {tipStr}
            </Text>
            <Flex style={_.mt.md}>
              <Rank value={rank} />
              <Stars style={_.mr.xs} value={score} simple />
              {!!total && (
                <Text style={_.mr.sm} type='sub' size={11} bold>
                  ({total})
                </Text>
              )}
              <Tags value={_tags} />
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
      {index === 0 && <Heatmap id='Anime.跳转' />}
    </Touchable>
  )
}

export default obc(Item)
