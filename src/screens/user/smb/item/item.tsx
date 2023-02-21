/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-21 20:48:20
 */
import React, { useState } from 'react'
import { View, Linking } from 'react-native'
import { Flex, Image, Text, Touchable, Iconfont } from '@components'
import { Cover, Manage, Rank, Stars, Tag } from '@_'
import { _, uiStore, collectionStore } from '@stores'
import { cnjp, copy, desc } from '@utils'
import { memo } from '@utils/decorators'
import { IMG_DEFAULT, IMG_WIDTH, IMG_HEIGHT, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import Title from './title'
import { ICONS } from '../ds'
import { DEFAULT_PROPS, SORT_ORDER } from './ds'

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
    const path = []
    if (showFolder) {
      path.push(smb.port ? `${smb.ip}:${smb.port}` : smb.ip, smb.sharedFolder)
    }
    if (folder.path) path.push(folder.path)
    if (subjectId || showFolder) path.push(folder.name)

    let action = '看'
    if (typeCn === '书籍') action = '读'
    if (typeCn === '音乐') action = '听'
    if (typeCn === '游戏') action = '玩'

    return (
      <View style={[_.container.plain, styles.container]}>
        <View style={styles.wrap}>
          {/* subject */}
          <Flex align={loaded ? 'start' : 'center'}>
            {loaded ? (
              <Cover
                src={image || IMG_DEFAULT}
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                radius
                shadow
                type={typeCn}
                onPress={() => {
                  navigation.push('Subject', {
                    subjectId,
                    _jp: jp,
                    _cn: cn,
                    _image: image,
                    _type: typeCn
                  })
                }}
              />
            ) : (
              <Image
                src={ICONS.folder}
                size={IMG_WIDTH}
                placeholder={false}
                resizeMode='contain'
              />
            )}

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
                      <Flex style={styles.rating}>
                        {!!rank && <Rank style={_.mr.sm} value={rank} />}
                        {!!rating?.score && (
                          <Stars style={_.mr.sm} value={rating.score} />
                        )}
                        {!!rating.total && (
                          <Text size={10} type='sub'>
                            ({rating.total}人评分)
                          </Text>
                        )}
                      </Flex>
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
                  <Touchable onPress={() => setShowFolder(!showFolder)}>
                    <Flex style={styles.folder}>
                      <Flex.Item>
                        <Text size={12} bold numberOfLines={2}>
                          {path.join('/') || '/'}
                        </Text>
                      </Flex.Item>
                      <Iconfont style={_.ml.xs} name='md-navigate-next' />
                    </Flex>
                  </Touchable>
                )}
              </View>
            </Flex.Item>
          </Flex>

          {/* folder */}
          {showFolder && (
            <View style={[styles.folder, styles.folderList]}>
              <Touchable
                onPress={() => setShowFolder(!showFolder)}
                onLongPress={() => copy(path.join('/'), '已复制smb地址')}
              >
                <Flex align='start'>
                  <Image
                    style={_.mr.sm}
                    src={ICONS.open}
                    size={16}
                    placeholder={false}
                    resizeMode='contain'
                  />
                  <Flex.Item>
                    <Text size={12} bold>
                      {path.join('/') || '/'}
                    </Text>
                  </Flex.Item>
                  <Iconfont style={styles.up} name='md-keyboard-arrow-up' />
                </Flex>
              </Touchable>
              <View style={styles.path}>
                {folder.list.length ? (
                  folder.list
                    .sort((a, b) =>
                      desc(SORT_ORDER[a.type] || 0, SORT_ORDER[b.type] || 0)
                    )
                    .map(item => (
                      <Touchable
                        key={item.name}
                        style={styles.item}
                        onPress={() =>
                          copy(
                            url(smb.sharedFolder, folder.path, folder.name, item.name),
                            '已复制smb地址'
                          )
                        }
                        onLongPress={async () => {
                          const link = url(
                            smb.sharedFolder,
                            folder.path,
                            folder.name,
                            item.name
                          )
                          Linking.openURL(link)
                        }}
                      >
                        <Flex align='start'>
                          <Image
                            src={ICONS[item.type]}
                            size={16}
                            placeholder={false}
                            resizeMode='contain'
                          />
                          <Flex.Item style={_.ml.sm}>
                            <Text size={12}>{item.name}</Text>
                          </Flex.Item>
                        </Flex>
                      </Touchable>
                    ))
                ) : (
                  <Text size={10}>(空)</Text>
                )}

                {!!folder.list.length && (
                  <Text style={_.mt.sm} size={10} type='sub' align='right'>
                    点击复制地址，长按跳转
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    )
  },
  DEFAULT_PROPS
)
