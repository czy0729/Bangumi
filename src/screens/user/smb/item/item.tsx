/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-21 13:48:54
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Manage, Tag } from '@_'
import { _, uiStore, collectionStore } from '@stores'
import { cnjp } from '@utils'
import { memo } from '@utils/decorators'
import {
  cleaned,
  cleaned2,
  cleaned3,
  cleaned4,
  cleaned5,
  findJA
} from '@utils/thirdParty/ja'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import Title from './title'
import Bottom from './bottom'
import Cover from './cover'
import Folder from './folder'
import { DEFAULT_PROPS } from './ds'
import { extractAnimeName } from '../utils/directory'

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
    isExpanded,
    smb
  }) => {
    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
    let action = '看'
    if (typeCn === '书籍') action = '读'
    if (typeCn === '音乐') action = '听'
    if (typeCn === '游戏') action = '玩'

    const ja = extractAnimeName(folder.name)
    const elDev = (
      <>
        <Text type='main'>{ja}</Text>
        <Text type='warning'>- {cleaned(ja)}</Text>
        <Text type='warning'>- {cleaned2(ja)}</Text>
        <Text type='warning'>- {cleaned3(ja)}</Text>
        <Text type='warning'>- {cleaned4(ja)}</Text>
        <Text type='warning'>- {cleaned5(ja)}</Text>
        <Text type='primary'>{findJA(ja)}</Text>
      </>
    )

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
              <View>
                {loaded ? (
                  <Flex align='start'>
                    <Flex.Item>
                      <Title name={jp} nameCn={cn} />
                      <Text style={_.mt.sm} size={11} bold numberOfLines={2}>
                        {!!eps && `${eps}话 / `}
                        {air_date || '-'}
                      </Text>
                      <Bottom rank={rank} rating={rating} />
                      {elDev}
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
                    {elDev}
                  </>
                )}

                {!!folder.tags.length && (
                  <Flex style={_.mt.md}>
                    {folder.tags
                      .filter((item, index) => index < 5)
                      .map(item => (
                        <Tag key={item} style={styles.tag} value={item} />
                      ))}
                  </Flex>
                )}

                {!isExpanded && (
                  <Folder
                    showFolder={false}
                    subjectId={subjectId}
                    folder={folder}
                    smb={smb}
                  />
                )}
              </View>
            </Flex.Item>
          </Flex>

          {isExpanded && (
            <Folder showFolder subjectId={subjectId} folder={folder} smb={smb} />
          )}
        </View>
      </View>
    )
  },
  DEFAULT_PROPS
)
