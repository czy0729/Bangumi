/*
 * @Author: czy0729
 * @Date: 2023-11-23 06:30:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 13:54:19
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text } from '@components'
import { _ } from '@stores'
import { desc } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx, SMBListItem } from '../../types'
import Folder from '../folder'
import { styles } from './styles'

const LIMIT = 3

function Folders(
  {
    fixedStyle = true,
    folder,
    merge,
    defaultShow = false
  }: {
    fixedStyle?: boolean
    folder: SMBListItem
    merge?: SMBListItem[]
    defaultShow?: boolean
  },
  { $ }: Ctx
) {
  const { layoutList } = $.state.configs
  const folderNames = [folder.name]
  if (merge?.length) merge.forEach(item => folderNames.push(item.name))
  const hasExpanded = folderNames.some(item => $.isExpanded(item))

  const folders = [folder, ...(merge || [])]
  const foldersExpanded = layoutList ? $.isFoldersExpanded(folder.name) : true
  return (
    <View
      style={fixedStyle && !hasExpanded && styles.folders}
      pointerEvents={_.web('none', 'auto')}
    >
      <View pointerEvents='auto'>
        {folders
          .sort((a, b) => {
            if (a.name.startsWith('[') && b.name.startsWith('[')) {
              return a.name.localeCompare(b.name)
            }
            return desc(a.name, b.name)
          })
          .filter((item, index) => (foldersExpanded ? true : index < LIMIT))
          .map((item, index) => (
            <Folder
              key={item.name}
              folder={item}
              defaultShow={index === 0 ? defaultShow : undefined}
            />
          ))}
        {layoutList && folders.length > LIMIT && (
          <Flex justify='center'>
            <Touchable
              style={styles.expand}
              onPress={() => $.onFoldersExpand(folder.name)}
            >
              <Text type='sub' size={12} bold>
                {foldersExpanded ? '收起' : `展开 ${folders.length - LIMIT} 个文件夹`}
              </Text>
            </Touchable>
          </Flex>
        )}
      </View>
    </View>
  )
}

export default obc(Folders)
