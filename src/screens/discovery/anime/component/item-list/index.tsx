/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 05:43:32
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, InView, Manage, PreventTouchPlaceholder, Rank, Stars, Tags } from '@_'
import { _, collectionStore, otaStore, uiStore, useStore } from '@stores'
import { cnjp, desc, x18 } from '@utils'
import { t } from '@utils/fetch'
import {
  HOST_BGM_STATIC,
  IMG_DEFAULT,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function ItemList({ index, pickIndex }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  // --- Data Logic ---
  const subjectId = otaStore.animeSubjectId(pickIndex)
  const anime = otaStore.anime(subjectId)

  // --- Handlers ---
  const handlePress = useCallback(() => {
    if (!anime) return

    navigation.push('Subject', {
      subjectId: anime.id,
      _cn: anime.cn,
      _image: getCoverSrc(
        anime.image ? `${HOST_BGM_STATIC}/pic/cover/m/${anime.image}.jpg` : IMG_DEFAULT,
        IMG_WIDTH_LG
      ),
      _aid: anime.ageId
    })

    t('Anime.跳转', { subjectId: anime?.id })
  }, [anime, navigation])

  const handleManage = useCallback(() => {
    if (!anime) return

    uiStore.showManageModal(
      {
        subjectId: anime.id,
        title: cnjp(anime.cn, anime.jp),
        desc: cnjp(anime.jp, anime.cn),
        status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(
          collectionStore.collect(anime.id)
        )
      },
      '找番剧'
    )
  }, [anime])

  // --- Render ---
  if (!anime?.id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const {
    id,
    image,
    cn,
    jp,
    ep,
    type,
    status,
    begin,
    tags: tagStr,
    official,
    origin,
    score,
    rank,
    total
  } = anime

  const title = cnjp(cn, jp)
  const titleLen = title.length
  const titleSize = titleLen >= 20 ? 13 : titleLen >= 14 ? 14 : 15
  const cover = image ? `${HOST_BGM_STATIC}/pic/cover/m/${image}.jpg` : IMG_DEFAULT

  const epStr = String(ep).replace(/\(完结\)|第|\[|\]/g, '')
  const tipStr = [type === 'TV' ? '' : type, epStr, status, begin]
    .concat([official, origin].map(v => (v === '暂无' ? '' : v)))
    .filter(Boolean)
    .join(' / ')

  const { tags = [] } = $.state.query
  const cates = String(tagStr)
    .split(' ')
    .filter(v => v && v !== '暂无')
    .sort((a, b) => desc(tags.includes(a) ? 1 : 0, tags.includes(b) ? 1 : 0))

  const collection = collectionStore.collect(id)

  return (
    <>
      <Touchable style={styles.container} animate onPress={handlePress}>
        <Flex style={styles.wrap} align='start'>
          <InView style={styles.inView} y={InView.y(index, IMG_HEIGHT_LG, _.window.height * 0.4)}>
            <Cover
              src={cover}
              width={IMG_WIDTH_LG}
              height={IMG_HEIGHT_LG}
              radius
              cdn={!x18(id, title)}
            />
          </InView>

          <Flex.Item style={_.ml.wind}>
            <Flex style={styles.content} direction='column' justify='between' align='start'>
              <Flex align='start'>
                <Flex.Item>
                  <Text size={titleSize} bold numberOfLines={2}>
                    {title}
                  </Text>
                </Flex.Item>
                <Manage subjectId={id} collection={collection} onPress={handleManage} />
              </Flex>

              <Text style={styles.tip} size={11} lineHeight={14}>
                {tipStr}
              </Text>

              <Flex>
                <Flex>
                  <Rank value={rank} />
                  <Stars style={_.mr.xs} value={score} simple />
                  {!!total && (
                    <Text style={_.mr.sm} type='sub' size={11} bold>
                      ({total})
                    </Text>
                  )}
                </Flex>
                <Flex.Item>
                  <Tags value={cates} active={tags} />
                </Flex.Item>
              </Flex>
            </Flex>
          </Flex.Item>
        </Flex>
      </Touchable>

      <PreventTouchPlaceholder />
    </>
  )
}

export default observer(ItemList)
