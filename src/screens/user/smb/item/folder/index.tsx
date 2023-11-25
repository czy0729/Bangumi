/*
 * @Author: czy0729
 * @Date: 2023-02-22 01:43:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-25 16:53:04
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { copy } from '@utils'
import { obc } from '@utils/decorators'
import { ASSETS_ICONS } from '@constants'
import { fixedUrl } from '../../utils'
import { Ctx, SMBListItem } from '../../types'
import FolderList from '../folder-list'
import { memoStyles } from './styles'

function Folder(
  {
    folder,
    defaultShow = false
  }: {
    folder: SMBListItem
    defaultShow?: boolean
  },
  { $ }: Ctx
) {
  const styles = memoStyles()
  const { smb } = $.current
  let showFolder = $.isExpanded(folder.name)
  if (showFolder === null && defaultShow) showFolder = true

  const path = []
  if (smb.ip && smb.port) {
    path.push(`${smb.ip}:${smb.port}`)
  } else if (smb.ip) {
    path.push(smb.ip)
  }
  if (showFolder && smb.sharedFolder) path.push(smb.sharedFolder)
  if (showFolder && folder.path) path.push(folder.path)
  if (folder.name) path.push(folder.name)

  if (!showFolder) {
    const splits = path.join('/').split('/')
    return (
      <Touchable
        onPress={() => {
          $.onExpand(folder.name)
        }}
      >
        <Flex style={styles.folder}>
          <Flex.Item>
            <Text size={11} lineHeight={12} bold numberOfLines={1}>
              {splits?.[splits.length - 1] || '/'}
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
          copy(fixedUrl(path.join('/')), '已复制路径')
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
