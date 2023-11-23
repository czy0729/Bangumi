/*
 * @Author: czy0729
 * @Date: 2023-02-22 01:43:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-23 07:56:07
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { copy } from '@utils'
import { obc } from '@utils/decorators'
import { ASSETS_ICONS } from '@constants'
import { AnyObject } from '@types'
import { Ctx, SMBListItem } from '../../types'
import FolderList from '../folder-list'
import { memoStyles } from './styles'

function Folder(
  {
    subjectId,
    folder
  }: AnyObject<{
    folder: SMBListItem
  }>,
  { $ }: Ctx
) {
  const styles = memoStyles()
  const showFolder = $.isExpanded(folder.name)
  const { smb } = $.current

  const path = []
  if (smb.ip && smb.port) {
    path.push(`${smb.ip}:${smb.port}`)
  } else if (smb.ip) {
    path.push(smb.ip)
  }
  if (showFolder && smb.sharedFolder) path.push(smb.sharedFolder)
  if (folder.path) path.push(folder.path)
  if (subjectId || showFolder) path.push(folder.name)

  if (!showFolder) {
    return (
      <Touchable
        onPress={() => {
          $.onExpand(folder.name)
        }}
      >
        <Flex style={styles.folder}>
          <Flex.Item>
            <Text size={11} lineHeight={12} bold numberOfLines={1}>
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
        onPress={() => {
          $.onExpand(folder.name)
        }}
        onLongPress={() => {
          let url = path.join('/')
          const { isWindows } = $.state
          if (isWindows) url = url.replace(/\//g, '\\').replace(/:\\\\/g, '://')
          copy(url, '已复制文件夹路径')
        }}
      >
        <Flex align='start'>
          <Image
            style={_.mr.sm}
            src={ASSETS_ICONS.open}
            size={14}
            placeholder={false}
            resizeMode='contain'
          />
          <Flex.Item>
            <Text size={11} lineHeight={12} bold>
              {path.join('/') || '/'}
            </Text>
          </Flex.Item>
          <Iconfont style={styles.up} name='md-keyboard-arrow-up' />
        </Flex>
      </Touchable>
      <View style={styles.path}>
        <FolderList folder={folder} />
      </View>
    </View>
  )
}

export default obc(Folder)
