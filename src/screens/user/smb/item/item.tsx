/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-23 08:54:02
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Manage } from '@_'
import { _, uiStore, collectionStore } from '@stores'
import { cnjp } from '@utils'
import { memo } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import Title from './title'
import Bottom from './bottom'
import Cover from './cover'
import Folders from './folders'
import DevJA from './dev-ja'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    navigation,
    styles,
    subjectId,
    loaded,
    jp,
    cn,
    image,
    type,
    eps,
    air_date,
    rank,
    rating,
    collection,
    folder,
    merge
  }) => {
    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
    let action = '看'
    if (typeCn === '书籍') action = '读'
    if (typeCn === '音乐') action = '听'
    if (typeCn === '游戏') action = '玩'

    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Flex align='start'>
            <Cover
              navigation={navigation}
              loaded={loaded}
              subjectId={subjectId}
              image={image}
              typeCn={typeCn}
              jp={jp}
              cn={cn}
            />
            <Flex.Item style={styles.body}>
              {loaded ? (
                <Flex align='start'>
                  <Flex.Item>
                    <Title name={jp} nameCn={cn} />
                    <Text style={_.mt.sm} size={11} bold numberOfLines={2}>
                      {!!eps && `${eps}话 / `}
                      {air_date || '-'}
                    </Text>
                    <Bottom rank={rank} rating={rating} />
                  </Flex.Item>
                  <Manage
                    collection={collection}
                    typeCn={typeCn}
                    subjectId={subjectId}
                    onPress={() => {
                      uiStore.showManageModal(
                        {
                          subjectId,
                          title: cnjp(jp, cn),
                          desc: cnjp(cn, jp),
                          status: collection,
                          action
                        },
                        '关联系列',
                        () => {
                          collectionStore.fetchCollectionStatusQueue([subjectId])
                        }
                      )
                    }}
                  />
                </Flex>
              ) : (
                <>
                  <Text size={15} bold>
                    {folder.name}
                  </Text>
                  <DevJA folderName={folder.name} />
                </>
              )}

              {/* {!!folder.tags.length && (
                <Flex style={_.mt.sm}>
                  {folder.tags
                    .filter((item, index) => index < 5)
                    .map(item => (
                      <Text key={item} style={_.mr.sm} size={12} type='sub'>
                        {item}
                      </Text>
                    ))}
                </Flex>
              )} */}
            </Flex.Item>
          </Flex>
          <Folders subjectId={subjectId} folder={folder} merge={merge} />
        </View>
      </View>
    )
  },
  DEFAULT_PROPS
)
