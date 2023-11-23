/*
 * @Author: czy0729
 * @Date: 2023-11-23 06:30:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-23 09:26:38
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
    subjectId,
    folder,
    merge
  }: {
    subjectId: SubjectId
    folder: SMBListItem
    merge?: SMBListItem[]
  },
  { $ }: Ctx
) {
  const folderNames = [folder.name]
  if (merge?.length) merge.forEach(item => folderNames.push(item.name))
  const hasExpanded = folderNames.some(item => $.isExpanded(item))

  return (
    <View style={!hasExpanded && styles.folders} pointerEvents='none'>
      <View pointerEvents='auto'>
        <Folder subjectId={subjectId} folder={folder} />
        {!!merge?.length &&
          merge.map(item => <Folder subjectId={subjectId} folder={item} />)}
      </View>
    </View>
  )
}

export default obc(Folders)
