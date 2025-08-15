/*
 * @Author: czy0729
 * @Date: 2022-04-07 02:20:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:26:43
 */
import React, { useState } from 'react'
import { Linking, View } from 'react-native'
import { Component, Flex, Iconfont, Image, Text, Touchable } from '@components'
import { _ } from '@stores'
import { alert, copy, desc } from '@utils'
import { ob } from '@utils/decorators'
import { ASSETS_ICONS } from '@constants'
import { getUrl } from './utils'
import { COMPONENT, SORT_ORDER } from './ds'
import { memoStyles } from './styles'
import { Props as FolderSMBProps } from './types'

export { FolderSMBProps }

function FolderSMBComp({ styles, smb, folder }: FolderSMBProps) {
  const [showFolder, setShowFolder] = useState(false)
  const path = []
  path.push(smb.port ? `${smb.ip}:${smb.port}` : smb.ip, smb.sharedFolder)
  if (folder.path) path.push(folder.path)
  path.push(folder.name)
  return (
    <Component id='base-folder-smb' style={[styles.folder, styles.folderList]}>
      <Touchable
        onPress={() => setShowFolder(!showFolder)}
        onLongPress={() => copy(path.join('/'), '已复制smb地址')}
      >
        <Flex align='start'>
          <Image
            style={_.mr.sm}
            src={ASSETS_ICONS.open}
            size={16}
            placeholder={false}
            resizeMode='contain'
          />
          <Flex.Item>
            <Text size={12} lineHeight={14} bold numberOfLines={showFolder ? undefined : 1}>
              {path.join('/') || '/'}
            </Text>
          </Flex.Item>
          <Iconfont
            style={styles.up}
            name={showFolder ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
          />
        </Flex>
      </Touchable>
      {showFolder && (
        <View style={styles.path}>
          {folder.list.length ? (
            folder.list
              .slice()
              .sort((a, b) => desc(SORT_ORDER[a.type] || 0, SORT_ORDER[b.type] || 0))
              .map(item => (
                <Touchable
                  key={item.name}
                  style={styles.item}
                  onPress={() => copy(getUrl(smb, folder, item.name), '已复制smb地址')}
                  onLongPress={async () => {
                    const link = getUrl(smb, folder, item.name)
                    if (!(await Linking.canOpenURL(link))) {
                      alert(link, '本机不支持打开此链接')
                      return
                    }
                    Linking.openURL(link)
                  }}
                >
                  <Flex align='start'>
                    <Image
                      src={ASSETS_ICONS[item.type]}
                      size={16}
                      placeholder={false}
                      resizeMode='contain'
                    />
                    <Flex.Item style={_.ml.sm}>
                      <Text size={12}>{item.name}</Text>
                    </Flex.Item>
                  </Flex>
                </Touchable>
              ))
          ) : (
            <Text size={10}>(空)</Text>
          )}
          {!!folder.list.length && (
            <Text style={_.mt.sm} size={10} type='sub' align='right'>
              点击复制地址，长按跳转
            </Text>
          )}
        </View>
      )}
    </Component>
  )
}

/** SMB 管理弹窗 */
export const FolderSMB = ob(
  ({
    smb = {
      uuid: '',
      name: '',
      ip: '',
      username: '',
      password: '',
      sharedFolder: '',
      path: '',
      port: '',
      workGroup: '',
      url: ''
    },
    folder = {
      name: '',
      lastModified: '',
      path: '',
      list: [
        {
          name: '',
          type: '',
          lastModified: ''
        }
      ],
      ids: [],
      tags: []
    }
  }: FolderSMBProps) => {
    if (!smb?.uuid || !folder?.name || !folder?.list?.length) return null

    return <FolderSMBComp styles={memoStyles()} smb={smb} folder={folder} />
  },
  COMPONENT
)

export default FolderSMB
