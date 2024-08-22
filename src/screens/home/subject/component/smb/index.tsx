/*
 * @Author: czy0729
 * @Date: 2022-04-07 02:01:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 17:11:04
 */
import React from 'react'
import { View } from 'react-native'
import { FolderSMB, SectionTitle } from '@_'
import { smbStore, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { IOS, WEB } from '@constants'
import { Ctx } from '../../types'
import IconHidden from '../icon/hidden'
import IconSMB from '../icon/smb'
import { memoStyles } from './styles'

function SMB(_props, { $ }: Ctx) {
  if (WEB || IOS) return null

  const item = smbStore.subject($.subjectId)
  if (!item) return null

  const { showSMB } = systemStore.setting
  if (showSMB === -1) return null

  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <SectionTitle
        right={showSMB ? <IconSMB /> : <IconHidden name='本地' value='showSMB' />}
        icon={!showSMB && 'md-navigate-next'}
        onPress={() => $.onSwitchBlock('showSMB')}
      >
        本地
      </SectionTitle>
      {showSMB && <FolderSMB smb={item.smb} folder={item.folder} />}
    </View>
  )
}

export default obc(SMB)
