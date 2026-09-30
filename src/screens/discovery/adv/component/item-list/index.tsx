/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:47:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 18:48:19
 */
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, flexStyle, Heatmap, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, InView, Manage, Rank, Stars } from '@_'
import { _, collectionStore, otaStore, uiStore } from '@stores'
import { formatPlaytime, HTMLDecode, stl, x18 } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import {
  HOST_BGM_STATIC,
  IMG_DEFAULT,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_COLLECTION_STATUS
} from '@constants'
import Thumbs from './thumbs'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Props } from './types'

function Item({ index, pickIndex }: Props) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  const subjectId = otaStore.advSubjectId(pickIndex)
  const adv = otaStore.adv(subjectId)
  const { id, title, cover, date, score, rank, total, length, dev, time, cn, screens } = adv

  const handlePress = useCallback(() => {
    const { title, cover } = adv
    const image = cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT

    navigation.push('Subject', {
      subjectId: id,
      _cn: title,
      _image: getCoverSrc(image, IMG_WIDTH_LG),
      _type: '游戏'
    })

    t('ADV.跳转', { subjectId: id })
  }, [adv, id, navigation])

  const handleManagePress = useCallback(() => {
    const { title } = adv
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
  }, [adv, id])

  /**
   * itemStyle 的 useMemo 必须在 `if (!id)` 之前
   *  - 数据未就绪时 otaStore.adv() 返回的是 {}, id 为 undefined, 会走 loading 分支
   *  - 若写在提前 return 之后, 首次渲染会少调用 hook,
   *    数据回来后再渲染就会报 Rendered more hooks than during the previous render
   */
  const itemStyle = useMemo(
    () => stl(flexStyle({ align: 'start' }), styles.container, styles.wrap),
    [styles]
  )

  if (!id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const titleText = HTMLDecode(title)
  const size = titleText.length >= 20 ? 13 : titleText.length >= 14 ? 14 : 15
  const image = cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT

  const tipStr = [date, dev, formatPlaytime(time), cn ? '汉化' : '']
    .filter(item => !!item)
    .join(' / ')

  const collection = collectionStore.collect(id)
  const y = InView.y(index, IMG_HEIGHT_LG, _.window.height * 0.4)

  return (
    <Touchable style={itemStyle} onPress={handlePress}>
      <InView style={styles.inView} y={y}>
        <Cover
          src={image}
          width={IMG_WIDTH_LG}
          height={IMG_HEIGHT_LG}
          radius
          cdn={!x18(id, titleText)}
        />
      </InView>
      <Flex style={styles.content} direction='column' align='start'>
        <View style={styles.body}>
          <Flex style={_.container.block} align='start'>
            <Flex.Item>
              <Text size={size} bold numberOfLines={3}>
                {titleText}
              </Text>
              <Text style={_.mt.sm} size={11} lineHeight={14} numberOfLines={5}>
                {tipStr}
              </Text>
              <Flex style={_.mt.md} wrap='wrap'>
                <Rank value={rank} />
                <Stars style={_.mr.xs} value={score} simple />
                {!!total && (
                  <Text style={_.mr.sm} type='sub' size={11} bold>
                    ({total})
                  </Text>
                )}
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
        <Thumbs id={id} length={length} screens={screens} y={y} />
      </Flex>
      {index === 0 && <Heatmap id='ADV.跳转' />}
    </Touchable>
  )
}

export default observer(Item)
