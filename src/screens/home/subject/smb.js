/*
 * @Author: czy0729
 * @Date: 2022-04-07 02:01:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-07 03:12:00
 */
import React from 'react'
import { View } from 'react-native'
import { SectionTitle, FolderSMB } from '@_'
import { _, smbStore, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import IconSMB from './icon/smb'
import IconHidden from './icon/hidden'

function SMB(props, { $ }) {
  const item = smbStore.subject($.subjectId)
  if (!item) return null

  const { showSMB } = systemStore.setting
  if (showSMB === -1) return null

  return (
    <View style={[styles.container, _.mt.md]}>
      <SectionTitle
        right={showSMB ? <IconSMB /> : <IconHidden name='本地' value='showSMB' />}
        icon={!showSMB && 'md-navigate-next'}
        onPress={() => $.switchBlock('showSMB')}
      >
        本地
      </SectionTitle>
      {showSMB && <FolderSMB smb={item.smb} folder={item.folder} />}
    </View>
  )
}

export default obc(SMB)

const styles = _.create({
  container: {
    paddingTop: _.md,
    paddingHorizontal: _.wind
  }
})
