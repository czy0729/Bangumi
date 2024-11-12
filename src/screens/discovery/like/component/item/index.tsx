/*
 * @Author: czy0729
 * @Date: 2022-04-20 13:52:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 07:22:37
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, Manage, Rank, Rate, Stars } from '@_'
import { _, collectionStore, systemStore, uiStore } from '@stores'
import { alert, getAction } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import { CollectionStatus, SubjectType, SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { getReasonsInfo } from '../../utils'
import Sub from './sub'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Item({ item }: Props, { $, navigation }: Ctx) {
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

  const { width } = styles.cover
  const height = typeCn === '音乐' ? width : styles.cover.height

  let size = 14
  if (item.name.length >= 36) {
    size = 10
  } else if (item.name.length >= 24) {
    size = 12
  }

  return (
    <Flex style={styles.item} align='start'>
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
      <Flex.Item>
        <Flex
          style={[
            styles.body,
            {
              height: typeCn === '音乐' ? 'auto' : height
            }
          ]}
          direction='column'
          justify='between'
          align='start'
        >
          <Flex direction='column' align='start'>
            <Text
              style={styles.title}
              size={size}
              bold
              numberOfLines={2}
              // underline={isFromTyperank}
            >
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
          <View style={_.container.block}>
            {!!subject.total && (
              <Flex>
                <Rank value={subject.rank} />
                <Stars value={subject.score} />
                <Text style={_.ml.xs} type='sub' size={11} bold>
                  ({subject.total})
                </Text>
              </Flex>
            )}
            <Divider style={styles.divider} />
            <Sub name={item.name} relates={item.relates} action={action} />
          </View>
        </Flex>
      </Flex.Item>
      <Rate
        value={item.rate}
        onPress={() => {
          alert(getReasonsInfo(item.reasons).join('\n'), item.name)
        }}
      />
    </Flex>
  )
}

export default obc(Item, COMPONENT)
