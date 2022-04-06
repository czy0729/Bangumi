/*
 * @Author: czy0729
 * @Date: 2022-04-07 02:20:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-07 03:05:08
 */
import React, { useState } from 'react'
import { Alert, View, Linking } from 'react-native'
import { Flex, Image, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { copy, desc } from '@utils'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'

const icons = {
  file: require('@assets/cloud/file.png'),
  open: require('@assets/cloud/folder-open.png'),
  folder: require('@assets/cloud/folder.png'),
  music: require('@assets/cloud/music.png'),
  pic: require('@assets/cloud/pic.png'),
  video: require('@assets/cloud/video.png'),
  zip: require('@assets/cloud/zip.png'),
  origin: require('@assets/cloud/origin.png')
}

const sortOrder = {
  folder: 110,
  video: 100,
  music: 90,
  pic: 80,
  zip: 70,
  origin: 11,
  file: 10
}

function Comp({ styles, smb, folder }) {
  const [showFolder, setShowFolder] = useState(false)
  const path = []
  path.push(smb.port ? `${smb.ip}:${smb.port}` : smb.ip, smb.sharedFolder)
  if (folder.path) path.push(folder.path)
  path.push(folder.name)
  return (
    <View style={[styles.folder, styles.folderList]}>
      <Touchable
        onPress={() => setShowFolder(!showFolder)}
        onLongPress={() => {
          copy(path.join('/'))
          info('已复制smb地址')
        }}
      >
        <Flex align='start'>
          <Image
            style={_.mr.sm}
            src={icons.open}
            size={16}
            placeholder={false}
            resizeMode='contain'
          />
          <Flex.Item>
            <Text size={12} bold numberOfLines={showFolder ? undefined : 1}>
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
              .sort((a, b) => desc(sortOrder[a.type] || 0, sortOrder[b.type] || 0))
              .map(item => (
                <Touchable
                  key={item.name}
                  style={styles.item}
                  onPress={() => {
                    copy(getUrl(smb, folder, item.name))
                    info('已复制smb地址')
                    console.log(getUrl(smb, folder, item.name))
                  }}
                  onLongPress={async () => {
                    const link = getUrl(smb, folder, item.name)
                    if (!(await Linking.canOpenURL(link))) {
                      Alert.alert('本机不支持打开此链接', link, [
                        {
                          text: '确定',
                          onPress: () => {}
                        }
                      ])
                      return
                    }
                    Linking.openURL(link)
                  }}
                >
                  <Flex align='start'>
                    <Image
                      src={icons[item.type]}
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
    </View>
  )
}

export const FolderSMB = obc(
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
  }) => {
    if (!smb?.uuid || !folder?.name || !folder?.list?.length) return null

    return <Comp styles={memoStyles()} smb={smb} folder={folder} />
  }
)

const memoStyles = _.memoStyles(() => ({
  up: {
    marginTop: -3,
    marginRight: -4,
    marginLeft: _.xs
  },
  folder: {
    paddingRight: 4,
    paddingVertical: 5,
    paddingLeft: 12,
    marginTop: 13,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  folderList: {
    paddingRight: 12,
    paddingVertical: _.sm
  },
  path: {
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  },
  item: {
    paddingVertical: _.xs
  }
}))

function getUrl(smb, folder, fileName = '') {
  try {
    const { sharedFolder } = smb
    const { path: folderPath, name: folderName } = folder

    // smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE]
    const path = []
    if (sharedFolder) path.push(sharedFolder)
    if (folderPath) path.push(folderPath)
    if (folderName) path.push(folderName)
    return smb.url
      .replace(/\[USERNAME\]/g, smb.username)
      .replace(/\[PASSWORD\]/g, smb.password)
      .replace(/\[IP\]/g, smb.port ? `${smb.ip}:${smb.port}` : smb.ip)
      .replace(/\[PATH\]/g, path.join('/'))
      .replace(/\[FILE\]/g, fileName)
  } catch (error) {
    return ''
  }
}
