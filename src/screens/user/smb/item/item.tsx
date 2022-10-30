/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:21:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-30 20:25:14
 */
import React, { useState } from 'react'
import { View, Linking } from 'react-native'
import { Flex, Image, Text, Touchable, Iconfont } from '@components'
import { Cover, Rank, Stars, Tag } from '@_'
import { _ } from '@stores'
import { copy, desc, HTMLDecode, alert } from '@utils'
import { memo } from '@utils/decorators'
import { IMG_DEFAULT, IMG_WIDTH, IMG_HEIGHT, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { ICONS } from '../ds'
import { DEFAULT_PROPS, SORT_ORDER } from './ds'

export default memo(
  ({
    navigation,
    styles,
    subjectId,
    loaded,
    name,
    name_cn,
    images,
    type,
    eps_count,
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

    return (
      <View style={[_.container.plain, styles.container]}>
        <View style={styles.wrap}>
          {/* subject */}
          <Flex align={loaded ? 'start' : 'center'}>
            {loaded ? (
              <Cover
                src={images?.medium || IMG_DEFAULT}
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                radius
                shadow
                type={typeCn}
                onPress={() => {
                  navigation.push('Subject', {
                    subjectId,
                    _name: name,
                    _name_cn: name_cn,
                    _image: images?.medium,
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
                  <>
                    <Text size={15} numberOfLines={2}>
                      {collection ? '　　 ' : ''}
                      <Text size={15} bold>
                        {HTMLDecode(name_cn || name)}
                      </Text>
                      {!!name && name !== name_cn && (
                        <Text type='sub' size={11} lineHeight={15} bold>
                          {'  '}
                          {HTMLDecode(name)}
                        </Text>
                      )}
                    </Text>

                    <Text style={styles.desc} size={11} numberOfLines={2}>
                      {!!eps_count && `${eps_count}话 / `}
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
                  </>
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
                  <Flex style={styles.folderRoot}>
                    <Touchable onPress={() => setShowFolder(!showFolder)}>
                      <View style={styles.folder}>
                        <Flex>
                          <Text size={12} bold numberOfLines={1}>
                            {path.join('/') || '/'}
                          </Text>
                          <Iconfont style={_.ml.xs} name='md-navigate-next' />
                        </Flex>
                      </View>
                    </Touchable>
                  </Flex>
                )}
              </View>
              {!!collection && <Tag style={styles.collection} value={collection} />}
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
                          if (!(await Linking.canOpenURL(link))) {
                            alert(link, '本机不支持打开此链接')
                            return
                          }
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
