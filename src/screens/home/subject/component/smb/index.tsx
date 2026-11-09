/*
 * @Author: czy0729
 * @Date: 2022-04-07 02:01:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:14:03
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { FolderSMB } from '@_'
import { smbStore, useStore } from '@stores'
import { IOS, WEB } from '@constants'
import IconSMB from '../icon/smb'
import BlockTitle from '../block-title'
import Split from '../split'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function SMB() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (WEB || IOS) return null

  const item = smbStore.subject($.subjectId)
  if (!item) return null

  if (!$.showSMB[1]) return null

  const showSMB = $.showSMB[0]

  const styles = memoStyles()

  return (
    <Component id='screen-subject-smb' style={styles.container}>
      <BlockTitle
        layoutKey='showSMB'
        right={showSMB ? <IconSMB /> : null}
        icon={!showSMB && 'md-navigate-next'}
        splitStyles
      >
        本地
      </BlockTitle>
      {showSMB && <FolderSMB smb={item.smb} folder={item.folder} />}
      <Split />
    </Component>
  )
}

export default observer(SMB)
