/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-22 02:28:55
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Manage, Tag } from '@_'
import { _, uiStore, collectionStore } from '@stores'
import { cnjp } from '@utils'
import { memo } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import Title from './title'
import Bottom from './bottom'
import Cover from './cover'
import Folder from './folder'
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
    smb,
    url
  }) => {
    const [showFolder, setShowFolder] = useState(false)

    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
    let action = '看'
    if (typeCn === '书籍') action = '读'
    if (typeCn === '音乐') action = '听'
    if (typeCn === '游戏') action = '玩'

    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <Flex align={loaded ? 'start' : 'center'}>
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
                    </Flex.Item>
                    <Manage
                      collection={collection}
                      typeCn={typeCn}
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
                  <Text size={15} bold>
                    {folder.name}
                  </Text>
                )}

                {!!folder.tags.length && (
                  <Flex style={_.mt.sm} wrap='wrap'>
                    {folder.tags.map(item => (
                      <Tag key={item} style={styles.tag} value={item} />
                    ))}
                  </Flex>
                )}

                {!showFolder && (
                  <Folder
                    showFolder={false}
                    setShowFolder={setShowFolder}
                    subjectId={subjectId}
                    folder={folder}
                    smb={smb}
                    url={url}
                  />
                )}
              </View>
            </Flex.Item>
          </Flex>

          {showFolder && (
            <Folder
              showFolder
              setShowFolder={setShowFolder}
              subjectId={subjectId}
              folder={folder}
              smb={smb}
              url={url}
            />
          )}
        </View>
      </View>
    )
  },
  DEFAULT_PROPS
)
