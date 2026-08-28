/*
 * @Author: czy0729
 * @Date: 2024-10-12 15:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 04:54:25
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet, Divider } from '@components'
import { IconTouchable, Notice } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { WEB } from '@constants'
import Input from '../input'
import RowsCover from './rows-cover'
import RowsDisplay from './rows-display'
import SwitchRow from './switch-row'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Options() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { _loaded, show, userInfo, fixedHeader } = $.state

  const elUserInfo = (
    <SwitchRow
      style={_.mt.md}
      hd='用户信息'
      value={userInfo}
      onSyncPress={() => $.setOptions('userInfo')}
    />
  )
  const elFixedHeader = (
    <SwitchRow hd='锁住头部' value={fixedHeader} onSyncPress={() => $.setOptions('fixedHeader')} />
  )

  if (!_loaded) return null

  return (
    <ActionSheet
      show={show}
      title='照片墙'
      height={Math.floor(_.window.height * 0.68)}
      onClose={() => $.setOptions('show', false)}
    >
      {!WEB && (
        <View style={styles.theme}>
          <IconTouchable
            name={_.isDark ? 'moon' : 'sunny'}
            color={_.colorIcon}
            size={17}
            onPress={() => {
              setTimeout(() => {
                _.toggleMode()
              }, 40)
            }}
          />
        </View>
      )}
      <View style={styles.share}>
        <IconTouchable
          name='md-ios-share'
          color={_.colorIcon}
          size={17}
          onPress={() => {
            open($.shareUrl)
          }}
        />
      </View>

      <Notice style={styles.notice}>此页面可一览用户收藏，可配合手机自带的长截屏使用。</Notice>

      <Input />
      {elUserInfo}
      {elFixedHeader}
      <Divider />
      <RowsDisplay />
      <Divider />
      <RowsCover />
    </ActionSheet>
  )
}

export default observer(Options)
