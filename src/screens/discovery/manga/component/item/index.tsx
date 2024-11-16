/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:12:41
 */
import React from 'react'
import { Flex, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Rank, Stars, Tag } from '@_'
import { _, collectionStore, otaStore, uiStore, useStore } from '@stores'
import { desc, x18 } from '@utils'
import { ob } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { IMG_DEFAULT, IMG_HEIGHT_LG, IMG_WIDTH_LG, MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ pickIndex }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const subjectId = otaStore.mangaSubjectId(pickIndex)
  const manga = otaStore.manga(subjectId)
  if (!manga?.id) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const {
    id,
    mid,
    author,
    title,
    cates,
    ep,
    image,
    score,
    rank,
    total,
    status,
    publish,
    update,
    end
  } = otaStore.manga(subjectId)
  const titleSize = title.length >= 20 ? 13 : title.length >= 14 ? 14 : 15
  const cover = image ? `https://lain.bgm.tv/pic/cover/m/${image}.jpg` : IMG_DEFAULT

  let top = ''
  let bottom = ''
  try {
    top = [
      end ? '完结' : status,
      !end && update && !update.includes('1041') && `更新 ${update}`,
      publish && publish !== '0000' && `开始 ${publish}`,
      end && `结束 ${end}`
    ]
      .filter(item => !!item)
      .join(' / ')
    bottom = [ep, author].filter(item => !!item).join(' / ')
  } catch (error) {}

  const { tags = [] } = $.state.query
  const catesValue = String(cates)
    .split(' ')
    .sort((a, b) => desc(tags.includes(a) ? 1 : 0, tags.includes(b) ? 1 : 0))

  const collection = collectionStore.collect(id)
  return (
    <Touchable
      style={styles.container}
      animate
      onPress={withT(
        () => {
          navigation.push('Subject', {
            subjectId: id,
            _cn: title,
            _image: getCoverSrc(cover, IMG_WIDTH_LG),
            _type: '书籍',
            _mid: mid
          })
        },
        'Manga.跳转',
        {
          subjectId: id
        }
      )}
    >
      <Flex style={styles.wrap} align='start'>
        <Cover src={cover} width={IMG_WIDTH_LG} height={IMG_HEIGHT_LG} radius cdn={!x18(id)} />
        <Flex.Item style={_.ml.wind}>
          <Flex align='start'>
            <Flex.Item>
              <Flex style={styles.content} direction='column' justify='between' align='start'>
                <Flex align='start'>
                  <Flex.Item>
                    <Text size={titleSize} bold numberOfLines={2}>
                      {title}
                    </Text>
                  </Flex.Item>
                  <Manage
                    subjectId={id}
                    collection={collection}
                    typeCn='书籍'
                    onPress={() => {
                      uiStore.showManageModal(
                        {
                          subjectId: id,
                          title,
                          status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection),
                          action: '读'
                        },
                        '找漫画'
                      )
                    }}
                  />
                </Flex>
                {!!top && <Text size={11}>{top}</Text>}
                {!!bottom && (
                  <Text style={_.mt.md} size={11}>
                    {bottom}
                  </Text>
                )}
              </Flex>
            </Flex.Item>
          </Flex>
          <Flex style={styles.bottom}>
            <Rank value={rank} />
            <Stars style={_.mr.xs} value={score} simple />
            {!!total && (
              <Text style={_.mr.sm} type='sub' size={11} bold>
                ({total})
              </Text>
            )}
            <Flex.Item>
              <Flex>
                {catesValue.map(item => (
                  <Tag
                    key={item}
                    style={_.mr.sm}
                    type={tags.includes(item) ? 'warning' : undefined}
                    value={item}
                  />
                ))}
              </Flex>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default ob(Item, COMPONENT)
