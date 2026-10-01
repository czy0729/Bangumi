/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 07:17:11
 *
 * 找游戏列表布局条目
 */
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import {
  Flex,
  Heatmap,
  HorizontalList,
  Image,
  Loading,
  Squircle,
  Text,
  Touchable
} from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Rank, Stars, Tags } from '@_'
import { _, collectionStore, otaStore, systemStore, uiStore } from '@stores'
import { HTMLDecode, isArray, showImageViewer, stl, x18 } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import {
  HOST_BGM_STATIC,
  IMG_DEFAULT,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_COLLECTION_STATUS,
  WEB
} from '@constants'
import { getThumbs, toArray } from './utils'
import { COMPONENT, THUMB_HEIGHT, THUMB_WIDTH } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Props } from '../types'

function ItemList({ index, pickIndex }: Props) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()
  const subjectId = otaStore.gameSubjectId(pickIndex)
  const game = otaStore.game(subjectId)
  const {
    id,
    t: title,
    c: image,
    en: time,
    cn: timeCn,
    sc: score,
    r: rank,
    o: total,
    l: length,
    screens,
    screensReferer
  } = game

  /**
   * 下面几个 useMemo 必须在 `if (!id)` 之前
   *  - 数据未就绪时 otaStore.game() 返回的是 {}, id 为 undefined, 会走 loading 分支
   *  - 若把它们写在提前 return 之后, 首次渲染会少调用这些 hook,
   *    数据回来后再渲染就会报 Rendered more hooks than during the previous render
   */
  /** 在线截图 (数据侧收集的截图) 优先, 缺席时用自建 CDN 截图; 部分第三方需 Referer 防盗链 */
  const headers = useMemo(
    () => (screensReferer ? { Referer: screensReferer } : undefined),
    [screensReferer]
  )
  const thumbsData = useMemo(() => {
    const thumbs = isArray(screens) && screens.length ? [...screens] : getThumbs(id, length)

    /** 仅展示部分缩略图; index 为在 thumbUrls 中的下标, 供查看器定位 */
    return thumbs.reduce<{ id: number; image: string; index: number }[]>((acc, image, index) => {
      if (!WEB) {
        if (index < 3) acc.push({ id: index, image, index })
        return acc
      }

      if (thumbs.length <= 1 || (index > 0 && index < 4)) acc.push({ id: index, image, index })
      return acc
    }, [])
  }, [id, length, screens])
  const thumbUrls = useMemo(
    () => (isArray(screens) && screens.length ? [...screens] : getThumbs(id, length, false)),
    [id, length, screens]
  )

  const handlePress = useCallback(() => {
    const _title = HTMLDecode(title)
    const cover = image ? `${HOST_BGM_STATIC}/pic/cover/m/${image}.jpg` : IMG_DEFAULT

    navigation.push('Subject', {
      subjectId: id,
      _cn: _title,
      _image: getCoverSrc(cover, IMG_WIDTH_LG),
      _type: '游戏'
    })

    t('游戏.跳转', { subjectId: id })
  }, [title, image, id, navigation])
  const handleManagePress = useCallback(() => {
    const collection = collectionStore.collect(id)

    uiStore.showManageModal(
      {
        subjectId: id,
        title,
        status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
        action: '玩'
      },
      '找游戏'
    )
  }, [title, id])

  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const _title = HTMLDecode(title)
  const size = _title.length >= 20 ? 13 : _title.length >= 14 ? 14 : 15

  const cover = image ? `${HOST_BGM_STATIC}/pic/cover/m/${image}.jpg` : IMG_DEFAULT

  /** +N 打开的起始图 (Web 首图被过滤不展示, 从 0 开始) */
  const showNums = thumbUrls.length > 3
  const moreIndex = WEB && thumbUrls.length > 1 ? 0 : thumbsData.length

  const tag = toArray(game, 'ta')
  const dev = toArray(game, 'd')
  const publish = toArray(game, 'p')
  const platform = toArray(game, 'pl')
  const _dev = dev.map(item => String(item).trim()).filter(item => !!item)
  const _publish = publish.map(item => String(item).trim()).filter(item => !!item)

  const tip: string[] = [
    platform.join('、'),
    time,
    timeCn && timeCn !== time ? `中文 ${timeCn}` : ''
  ]
  if (_dev.join('、') === _publish.join('、')) {
    tip.push(_dev.join('、'))
  } else {
    tip.push(`${_dev.join('、')} 开发`, `${_publish.join('、')} 发行`)
  }
  const tipStr = tip.filter(item => !!item).join(' / ')
  const collection = collectionStore.collect(id)

  return (
    <Touchable style={styles.container} animate onPress={handlePress}>
      <Flex style={styles.wrap} align='start'>
        <Cover
          src={cover}
          width={IMG_WIDTH_LG}
          height={IMG_HEIGHT_LG}
          radius
          cdn={!x18(id, _title)}
        />
        <Flex style={styles.content} direction='column' align='start'>
          <View style={styles.body}>
            <Flex style={_.container.block} align='start'>
              <Flex.Item>
                <Text size={size} bold numberOfLines={3}>
                  {_title}
                </Text>
                <Text style={_.mt.sm} size={11} lineHeight={14} numberOfLines={5}>
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
                  <Flex.Item style={styles.tags}>
                    <Tags value={tag} />
                  </Flex.Item>
                </Flex>
              </Flex.Item>
              <Manage
                subjectId={id}
                collection={collection}
                typeCn='游戏'
                onPress={handleManagePress}
              />
            </Flex>
          </View>
          {!!thumbsData.length && (
            <View style={styles.thumbs}>
              <HorizontalList
                data={thumbsData}
                renderItem={(item, thumbIndex) => (
                  <Squircle
                    key={item.id}
                    style={stl(
                      !!thumbIndex && _.ml.sm,

                      /** 末尾留白: 有 +N 时由 +N 的 marginRight 承担, 这里只留缩略图间距 */
                      thumbIndex === thumbsData.length - 1 && (showNums ? _.mr.sm : _.mr.md)
                    )}
                    width={THUMB_WIDTH}
                    height={THUMB_HEIGHT}
                    radius={systemStore.coverRadius}
                  >
                    <Image
                      src={item.image}
                      size={THUMB_WIDTH}
                      height={THUMB_HEIGHT}
                      radius={0}
                      headers={headers}
                      errorToHide
                      onPress={() => {
                        showImageViewer(
                          thumbUrls.map(url => ({
                            url,
                            headers
                          })),
                          item.index
                        )
                      }}
                    />
                  </Squircle>
                )}
                renderNums={
                  showNums &&
                  (() => (
                    <Touchable
                      onPress={() => {
                        showImageViewer(
                          thumbUrls.map(url => ({
                            url,
                            headers
                          })),
                          moreIndex
                        )
                      }}
                    >
                      <Flex style={styles.nums} justify='center'>
                        <Text size={15} bold>
                          + {thumbUrls.length}
                        </Text>
                      </Flex>
                    </Touchable>
                  ))
                }
              />
            </View>
          )}
        </Flex>
      </Flex>
      {index === 0 && <Heatmap id='游戏.跳转' />}
    </Touchable>
  )
}

export default observer(ItemList)
