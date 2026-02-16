/*
 * @Author: czy0729
 * @Date: 2023-11-17 09:54:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:24:38
 */
import React from 'react'
import { Linking, View } from 'react-native'
import { Flex, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { copy, desc } from '@utils'
import { ob } from '@utils/decorators'
import { ASSETS_ICONS } from '@constants'
import { Ctx, SMBListItem } from '../../../types'
import FolderEp from '../folder-ep'
import LastModified from '../last-modified'
import { styles } from './styles'

function FolderList({ folder }: { folder: SMBListItem }) {
  const { $ } = useStore<Ctx>()
  const { smb } = $.current
  const { name, lastModified, list } = folder
  const showFiles = $.isFiles(name)

  /**
   * - 若操作过展示文件列表
   * - 从来没操作过并且文件列表中没有视频
   */
  if (showFiles || (showFiles === null && !list.some(item => item.type === 'video'))) {
    return (
      <View>
        {list
          .slice()
          .sort((a, b) => desc(a.type === 'video' ? 1 : 0, b.type === 'video' ? 1 : 0))
          .map(item => (
            <Touchable
              key={item.name}
              style={styles.item}
              onPress={() => {
                copy($.url(smb.sharedFolder, folder.path, name, item.name), '已复制路径')
              }}
              onLongPress={() => {
                const link = $.url(smb.sharedFolder, folder.path, name, item.name)
                Linking.openURL(link)
              }}
            >
              <Flex align='start'>
                <Image
                  src={ASSETS_ICONS[item.type]}
                  size={14}
                  placeholder={false}
                  resizeMode='contain'
                />
                <Flex.Item style={_.ml.sm}>
                  <Text size={11} lineHeight={12} numberOfLines={2}>
                    {item.name}
                    {!!item.size && (
                      <Text type='icon' size={11} lineHeight={12}>
                        {' '}
                        ({item.size})
                      </Text>
                    )}
                  </Text>
                </Flex.Item>
              </Flex>
            </Touchable>
          ))}
        <Flex style={_.mt.sm}>
          <Flex.Item>
            <Text size={12} type='icon'>
              点击复制地址，长按跳转
            </Text>
          </Flex.Item>
          <Touchable
            style={_.mr.xs}
            onPress={() => {
              $.onFile(name)
            }}
          >
            <Text size={12} type='icon'>
              [文件]
            </Text>
          </Touchable>
          <LastModified value={lastModified} />
        </Flex>
      </View>
    )
  }

  return <FolderEp folder={folder} />
}

export default ob(FolderList)
