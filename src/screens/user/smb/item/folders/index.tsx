/*
 * @Author: czy0729
 * @Date: 2023-11-23 06:30:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 16:40:27
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx, SMBListItem } from '../../types'
import Folder from '../folder'
import { styles } from './styles'

function Folders(
  {
    fixedStyle = true,
    subjectId,
    folder,
    merge,
    defaultShow = false
  }: {
    fixedStyle?: boolean
    subjectId: SubjectId
    folder: SMBListItem
    merge?: SMBListItem[]
    defaultShow?: boolean
  },
  { $ }: Ctx
) {
  const folderNames = [folder.name]
  if (merge?.length) merge.forEach(item => folderNames.push(item.name))
  const hasExpanded = folderNames.some(item => $.isExpanded(item))

  return (
    <View style={fixedStyle && !hasExpanded && styles.folders} pointerEvents='none'>
      <View pointerEvents='auto'>
        <Folder subjectId={subjectId} folder={folder} defaultShow={defaultShow} />
        {!!merge?.length &&
          merge.map(item => <Folder subjectId={subjectId} folder={item} />)}
      </View>
    </View>
  )
}

export default obc(Folders)
