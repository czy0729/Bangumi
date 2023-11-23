/*
 * @Author: czy0729
 * @Date: 2023-11-22 13:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-23 16:55:09
 */
import React from 'react'
import { View } from 'react-native'
import { Modal, Text, SwitchPro, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import {
  ACTION_DDPLAY,
  ACTION_MPV,
  ACTION_POTPLAYER,
  ACTION_VLC,
  URL_TEMPLATES
} from '../item/folder-ep/ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Config(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { configVisible, configs } = $.state
  return (
    <Modal
      style={styles.modal}
      visible={configVisible}
      title='通用配置'
      onClose={$.onCloseConfig}
    >
      <View style={styles.body}>
        <ItemSetting
          hd='布局'
          hdSize={14}
          ft={
            <SegmentedControl
              style={styles.segmentedControl}
              size={12}
              values={['列表', '网格']}
              selectedIndex={configs.layoutList ? 0 : 1}
              onValueChange={label => {
                if (
                  (configs.layoutList === false && label === '列表') ||
                  (configs.layoutList === true && label === '网格')
                ) {
                  $.onSwitchConfig('layoutList')
                }
              }}
            />
          }
        />
        <Text style={_.mt.sm} size={12} bold type='sub'>
          视频默认菜单
        </Text>
        <ItemSetting
          hd={ACTION_DDPLAY}
          hdSize={14}
          information={URL_TEMPLATES[ACTION_DDPLAY]}
          ft={
            <SwitchPro
              style={styles.switch}
              value={configs.showDDPlay}
              onSyncPress={() => $.onSwitchConfig('showDDPlay')}
            />
          }
        />
        <ItemSetting
          style={_.mt._sm}
          hd={ACTION_POTPLAYER}
          hdSize={14}
          information={URL_TEMPLATES[ACTION_POTPLAYER]}
          ft={
            <SwitchPro
              style={styles.switch}
              value={configs.showPotPlayer}
              onSyncPress={() => $.onSwitchConfig('showPotPlayer')}
            />
          }
        />
        <ItemSetting
          style={_.mt._sm}
          hd={ACTION_VLC}
          hdSize={14}
          information={URL_TEMPLATES[ACTION_VLC]}
          ft={
            <SwitchPro
              style={styles.switch}
              value={configs.showVLC}
              onSyncPress={() => $.onSwitchConfig('showVLC')}
            />
          }
        />
        <ItemSetting
          style={_.mt._sm}
          hd={ACTION_MPV}
          hdSize={14}
          information={URL_TEMPLATES[ACTION_MPV]}
          ft={
            <SwitchPro
              style={styles.switch}
              value={configs.showMPV}
              onSyncPress={() => $.onSwitchConfig('showMPV')}
            />
          }
        />
      </View>
    </Modal>
  )
}

export default obc(Config)
