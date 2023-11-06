/*
 * @Author: czy0729
 * @Date: 2023-02-22 01:43:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 11:42:14
 */
import React from 'react'
import { View, Linking } from 'react-native'
import { Flex, Image, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { copy, desc } from '@utils'
import { useObserver } from '@utils/hooks'
import { ASSETS_ICONS } from '@constants'
import { SORT_ORDER } from '../ds'
import { memoStyles } from './styles'

const textProps = {
  size: 11,
  lineHeight: 12
}

function Folder({ showFolder, setShowFolder, subjectId, folder, smb, url }) {
  const path = []
  if (showFolder) {
    path.push(smb.port ? `${smb.ip}:${smb.port}` : smb.ip, smb.sharedFolder)
  }
  if (folder.path) path.push(folder.path)
  if (subjectId || showFolder) path.push(folder.name)

  return useObserver(() => {
    const styles = memoStyles()
    if (!showFolder) {
      return (
        <Touchable onPress={() => setShowFolder(!showFolder)}>
          <Flex style={styles.folder}>
            <Flex.Item>
              <Text {...textProps} bold numberOfLines={1}>
                {path.join('/') || '/'}
              </Text>
            </Flex.Item>
            <Iconfont style={_.ml.xs} name='md-navigate-next' />
          </Flex>
        </Touchable>
      )
    }

    return (
      <View style={[styles.folder, styles.folderList]}>
        <Touchable
          onPress={() => setShowFolder(!showFolder)}
          onLongPress={() => copy(path.join('/'), '已复制smb地址')}
        >
          <Flex align='start'>
            <Image
              style={_.mr.sm}
              src={ASSETS_ICONS.open}
              size={16}
              placeholder={false}
              resizeMode='contain'
            />
            <Flex.Item>
              <Text {...textProps} bold>
                {path.join('/') || '/'}
              </Text>
            </Flex.Item>
            <Iconfont style={styles.up} name='md-keyboard-arrow-up' />
          </Flex>
        </Touchable>
        <View style={styles.path}>
          {folder.list.length ? (
            folder.list
              .slice()
              .sort((a, b) => {
                const typeA = SORT_ORDER[a.type] || 0
                const typeB = SORT_ORDER[b.type] || 0
                if (typeA === typeB) return desc(a.name, b.name)
                return desc(SORT_ORDER[a.type] || 0, SORT_ORDER[b.type] || 0)
              })
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
                    console.log(link)
                    Linking.openURL(link)
                  }}
                >
                  <Flex align='start'>
                    <Image
                      src={ASSETS_ICONS[item.type]}
                      size={16}
                      placeholder={false}
                      resizeMode='contain'
                    />
                    <Flex.Item style={_.ml.sm}>
                      {item.name.length <= 20 ? (
                        <Text {...textProps} numberOfLines={1}>
                          {item.name}
                        </Text>
                      ) : (
                        <Flex>
                          <Flex.Item>
                            <Text {...textProps} numberOfLines={1}>
                              {item.name.slice(0, item.name.length - 12)}
                            </Text>
                          </Flex.Item>
                          <Text {...textProps}>
                            {item.name.slice(item.name.length - 12)}
                          </Text>
                        </Flex>
                      )}
                    </Flex.Item>
                  </Flex>
                </Touchable>
              ))
          ) : (
            <Text {...textProps}>(空)</Text>
          )}

          {!!folder.list.length && (
            <Text style={_.mt.sm} {...textProps} type='sub' align='right'>
              点击复制地址，长按跳转
            </Text>
          )}
        </View>
      </View>
    )
  })
}

export default Folder
