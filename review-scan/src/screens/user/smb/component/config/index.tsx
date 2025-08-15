/*
 * @Author: czy0729
 * @Date: 2023-11-22 13:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:17:27
 */
import React from 'react'
import { View } from 'react-native'
import { Modal, SegmentedControl, SwitchPro, Text } from '@components'
import { ItemSetting } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { HTML_SINGLE_DOC, WEB } from '@constants'
import { Ctx } from '../../types'
import {
  ACTION_DDPLAY,
  ACTION_MPV,
  ACTION_POTPLAYER,
  ACTION_VLC,
  URL_TEMPLATES
} from '../item/folder-ep/ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Config() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { configVisible, configs } = $.state
  return (
    <Modal style={styles.modal} visible={configVisible} title='通用配置' onClose={$.onCloseConfig}>
      <View style={styles.body}>
        <Text style={_.mt.sm} type='sub' size={12} bold>
          UI
        </Text>
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
        <ItemSetting
          show={!configs.layoutList}
          hd='列数'
          hdSize={14}
          ft={
            <SegmentedControl
              style={styles.segmentedControl}
              size={12}
              values={['2', '3', '4']}
              selectedIndex={Number(configs.layoutGridNums - 2)}
              onValueChange={$.onSwitchLayoutGridNums}
            />
          }
        />
        <Text style={_.mt.md} type='sub' size={12} bold>
          视频菜单
          <Text type='sub' size={12}>
            {' '}
            (目前貌似只有弹弹Play是可用的)
          </Text>
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
        {WEB && (
          <>
            <Text style={_.mt.md} type='sub' size={12} bold>
              浏览器插件
            </Text>
            <ItemSetting
              hd='Local Explorer'
              hdSize={14}
              information='出于安全原因，浏览器不允许访问本地资源。若浏览器安装了此插件，即可通过外部调用方式使用本地资源管理器，直接打开文件夹。点击上方提示按钮进一步了解。'
              ft={
                <SwitchPro
                  style={styles.switch}
                  value={configs.showOpenLocalFolder}
                  onSyncPress={() => $.onSwitchConfig('showOpenLocalFolder')}
                />
              }
              onInfoPress={() => {
                open(`${HTML_SINGLE_DOC('nogol0viqd1flhqt')}#DuNXM`)
              }}
            />
          </>
        )}
      </View>
    </Modal>
  )
}

export default ob(Config, COMPONENT)
