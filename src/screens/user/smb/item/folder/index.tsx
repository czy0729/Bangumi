/*
 * @Author: czy0729
 * @Date: 2023-02-22 01:43:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 05:31:04
 */
import React from 'react'
import { View, Linking } from 'react-native'
import { Flex, Image, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { copy, desc } from '@utils'
import { useObserver } from '@utils/hooks'
import { ICONS } from '../../ds'
import { SORT_ORDER } from '../ds'
import { memoStyles } from './styles'

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
              <Text size={12} bold numberOfLines={2}>
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
              .slice()
              .sort((a, b) => desc(SORT_ORDER[a.type] || 0, SORT_ORDER[b.type] || 0))
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
    )
  })
}

export default Folder
