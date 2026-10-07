/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-06 07:37:24
 *
 * 找漫画列表布局条目
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, flexStyle, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, getTitleSize, Manage, Rank, Stars } from '@_'
import { _, collectionStore, otaStore, uiStore, userStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import {
  HOST_BGM_STATIC,
  IMG_DEFAULT,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_COLLECTION_STATUS,
  TEXT_ONLY
} from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Props } from '../types'

function ItemList({ pickIndex }: Props) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  const subjectId = otaStore.mangaSubjectId(pickIndex)
  const manga = otaStore.manga(subjectId)
  const {
    id,
    title,
    cover,
    score,
    total,
    rank,
    info,
    date,
    update,
    pub,
    vol,
    ch,
    pages,
    tags: tagStr
  } = manga

  const handlePress = useCallback(() => {
    const image = cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT

    navigation.push('Subject', {
      subjectId: id,
      _cn: title,
      _image: getCoverSrc(image, IMG_WIDTH_LG)
    })
    t('Manga.跳转', { subjectId: id })
  }, [cover, title, id, navigation])
  const handleManage = useCallback(() => {
    const collection = collectionStore.collect(id)

    uiStore.showManageModal(
      {
        subjectId: id,
        title,
        status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
      },
      '找漫画'
    )
  }, [title, id])

  /**
   * 必须放在 `if (!manga?.id)` 之前
   *  - 数据未就绪时首次渲染会走 loading 分支, 若把 hook 写在提前 return 之后,
   *    后续渲染就会报 Rendered more hooks than during the previous render
   * */

  /** 稳定 style 引用, 避免每次渲染生成新数组击穿子组件 memo */
  const itemStyle = useMemo(
    () => stl(flexStyle({ align: 'start' }), styles.container, styles.wrap),
    [styles]
  )

  if (!manga?.id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const titleSize = getTitleSize(title)
  const image = cover ? `${HOST_BGM_STATIC}/pic/cover/m/${cover}.jpg` : IMG_DEFAULT

  /** 日期: 更新日期 (系列内最晚单卷发售日) 优先, 回落发售日期 */
  const showDate = update || date

  /** 仿网页版 tip: 话数(卷数) / 日期 / 作者 / 出版社 / 页数 / 标签, 各段斜杠分割, 标签顿号连接 */
  const author = String(info || '').split(' / ')[0] || ''
  const cates = String(tagStr || '')
    .split(' ')
    .filter(Boolean)
  const tip = [
    vol > 1 ? `${vol}卷` : ch ? `${ch}话` : '',
    showDate,
    author,
    pub,
    pages ? `${pages}页` : '',
    cates.join('、')
  ]
    .filter(Boolean)
    .join(' / ')

  const collection = collectionStore.collect(id)
  const textOnly = TEXT_ONLY || !userStore.isLogin

  return (
    <Touchable style={itemStyle} onPress={handlePress}>
      <Cover
        src={image}
        width={IMG_WIDTH_LG}
        height={IMG_HEIGHT_LG}
        radius
        cdn={false}
        textOnly={textOnly}
      />
      <Flex.Item style={_.ml.wind}>
        <Flex style={styles.content} direction='column' justify='between' align='start'>
          <Flex align='start'>
            <Flex.Item>
              <Text size={titleSize} bold numberOfLines={2}>
                {title}
              </Text>
            </Flex.Item>
            <Manage subjectId={id} collection={collection} typeCn='书籍' onPress={handleManage} />
          </Flex>
          <Text style={styles.tip} size={11} lineHeight={14} numberOfLines={3}>
            {tip}
          </Text>
          <Flex style={_.mt.md} wrap='wrap'>
            <Rank value={rank} />
            <Stars style={_.mr.xs} value={score} simple />
            {!!total && (
              <Text type='sub' size={11} bold>
                ({total})
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex.Item>
    </Touchable>
  )
}

export default observer(ItemList)
