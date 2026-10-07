/*
 * @Author: czy0729
 * @Date: 2019-05-15 16:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-06 05:33:29
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, flexStyle, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, getTitleSize, InView, Manage, PreventTouchPlaceholder, Rank, Stars } from '@_'
import { _, collectionStore, otaStore, uiStore, useStore } from '@stores'
import { cnjp, desc, isArray, stl, x18 } from '@utils'
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

  const subjectId = otaStore.animeSubjectId(pickIndex)
  const anime = otaStore.anime(subjectId)

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

  /** 稳定 style 引用, 避免每次渲染生成新数组击穿子组件 memo */
  const itemStyle = useMemo(
    () => stl(flexStyle({ align: 'start' }), styles.container, styles.wrap),
    [styles]
  )

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
    meta,
    tags: tagStr,
    official,
    origin,
    director,
    author,
    charaDesign,
    score,
    rank,
    total
  } = anime

  const title = cnjp(cn, jp)
  const titleSize = getTitleSize(title)
  const cover = image ? `${HOST_BGM_STATIC}/pic/cover/m/${image}.jpg` : IMG_DEFAULT

  const epStr = ep ? `${String(ep).replace(/\(完结\)|第|\[|\]/g, '')}话` : ''
  const metas = String(meta || '')
    .split(' ')
    .filter(Boolean)
  /** 类型 (meta) 已涵盖形式 (type) 与改编来源 (origin), 有 meta 时不再单独显示 */
  const head = metas.length
    ? [epStr, status, begin, director, author, charaDesign, official]
    : [type === 'TV' ? '' : type, epStr, status, begin, official, origin]
  const tipStr = head
    .map(v => (v === '暂无' ? '' : v))
    .filter(Boolean)
    .join(' / ')

  /** 当前筛选命中的标签置前 (历史缓存可能是非数组形态, 先归一) */
  const queryTags = $.state.query.tags
  const tags: string[] = isArray(queryTags) ? queryTags : []
  /** 标签剔除与类型 (meta) 重复的题材词 */
  const cates = String(tagStr)
    .split(' ')
    .filter(v => v && v !== '暂无' && !metas.includes(v))
    .sort((a, b) => desc(tags.includes(a) ? 1 : 0, tags.includes(b) ? 1 : 0))

  /** 顺序: 信息 / 类型 / 标签, 各段斜杠分割, 段内顿号连接 */
  const tip = [tipStr, metas.join('、'), cates.join('、')].filter(Boolean).join(' / ')

  const collection = collectionStore.collect(id)

  return (
    <>
      <Touchable style={itemStyle} onPress={handlePress}>
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

            <Text style={styles.tip} size={11} lineHeight={14} numberOfLines={3}>
              {tip}
            </Text>

            <Flex>
              <Rank value={rank} />
              <Stars style={_.mr.xs} value={score} simple />
              {!!total && (
                <Text style={_.mr.sm} type='sub' size={11} bold>
                  ({total})
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex.Item>
      </Touchable>

      <PreventTouchPlaceholder />
    </>
  )
}

export default observer(ItemList)
