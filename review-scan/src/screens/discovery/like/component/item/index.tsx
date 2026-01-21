/*
 * @Author: czy0729
 * @Date: 2022-04-20 13:52:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 16:17:22
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, InView, Manage, Rank, Rate, Stars } from '@_'
import { _, collectionStore, systemStore, uiStore, useStore } from '@stores'
import { alert, getAction } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import { CollectionStatus, SubjectType, SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { getReasonsInfo } from '../../utils'
import Sub from './sub'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Item({ item, index }: Props) {
  const { $, navigation } = useStore<Ctx>()
  const subject = $.subjects(item.id)
  if (!subject || $.state.type !== MODEL_SUBJECT_TYPE.getLabel<SubjectType>(subject.type)) {
    return null
  }

  const collection = collectionStore.collect(item.id)
  if (collection && !systemStore.setting.likeCollected) return null

  const styles = memoStyles()
  const isFromTyperank = item.image.includes('//')
  const image = isFromTyperank ? item.image : `https://lain.bgm.tv/pic/cover/m/${item.image}.jpg`
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  const action = getAction(typeCn)

  const isMusic = typeCn === '音乐'
  let { width } = styles.cover
  if (isMusic) width = Math.floor(width * 1.1)
  const height = isMusic ? width : styles.cover.height

  let size = 14
  if (item.name.length >= 30) {
    size = 10
  } else if (item.name.length >= 20) {
    size = 12
  }

  return (
    <Flex style={styles.item} align='start'>
      <InView y={height * (index + 1)}>
        <Cover
          src={image}
          width={width}
          height={height}
          radius
          type={typeCn}
          onPress={() => {
            navigation.push('Subject', {
              subjectId: item.id,
              _cn: item.name,
              _image: getCoverSrc(image, width),
              _type: typeCn
            })

            t('猜你喜欢.跳转', {
              subjectId: item.id,
              userId: $.userId
            })
          }}
        />
      </InView>
      <Flex.Item>
        <Flex
          style={[
            styles.body,
            {
              minHeight: isMusic ? height - 10 : height
            }
          ]}
          direction='column'
          justify='between'
          align='start'
        >
          <Flex direction='column' align='start'>
            <Text style={styles.title} size={size} bold numberOfLines={2}>
              {item.name}
              {!!subject.year && (
                <Text size={size} bold>
                  {' '}
                  ({subject.year})
                </Text>
              )}
            </Text>
            <View style={styles.manage}>
              <Manage
                subjectId={item.id}
                collection={collection}
                typeCn={typeCn}
                horizontal
                onPress={() => {
                  uiStore.showManageModal(
                    {
                      subjectId: item.id,
                      title: item.name,
                      action,
                      status: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(collection)
                    },
                    '猜你喜欢'
                  )
                }}
              />
            </View>
          </Flex>
          <View style={styles.extra}>
            {!!subject.total && (
              <Flex>
                <Rank value={subject.rank} />
                <Stars value={subject.score} />
                <Text style={_.ml.xs} type='sub' size={11} bold>
                  ({subject.total})
                </Text>
              </Flex>
            )}
            <Sub name={item.name} relates={item.relates} action={action} />
          </View>
        </Flex>
      </Flex.Item>
      <Rate
        value={item.rate}
        onPress={() => {
          alert(getReasonsInfo(item.reasons, isFromTyperank).join('\n'), item.name)
        }}
      />
    </Flex>
  )
}

export default ob(Item, COMPONENT)
