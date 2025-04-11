/*
 * @Author: czy0729
 * @Date: 2022-04-07 02:01:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-11 21:45:38
 */
import React from 'react'
import { Component } from '@components'
import { FolderSMB, SectionTitle } from '@_'
import { smbStore, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { IOS, WEB } from '@constants'
import { Ctx } from '../../types'
import IconHidden from '../icon/hidden'
import IconSMB from '../icon/smb'
import Split from '../split'
import { memoStyles } from './styles'

function SMB() {
  const { $ } = useStore<Ctx>()
  if (WEB || IOS) return null

  const item = smbStore.subject($.subjectId)
  if (!item) return null

  const { showSMB } = systemStore.setting
  if (showSMB === -1) return null

  const styles = memoStyles()
  return (
    <Component id='screen-subject-smb' style={styles.container}>
      <SectionTitle
        right={showSMB ? <IconSMB /> : <IconHidden name='本地' value='showSMB' />}
        icon={!showSMB && 'md-navigate-next'}
        splitStyles
        onPress={() => $.onSwitchBlock('showSMB')}
      >
        本地
      </SectionTitle>
      {showSMB && <FolderSMB smb={item.smb} folder={item.folder} />}
      <Split />
    </Component>
  )
}

export default ob(SMB)
