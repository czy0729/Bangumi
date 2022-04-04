/*
 *
 * @Author: czy0729
 * @Date: 2022-03-28 19:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-05 06:00:42
 */
import { Alert } from 'react-native'
import SMBClient from 'react-native-smb'
import { asc, desc } from '@utils'
import { queue } from '@utils/fetch'
import { info, loading } from '@utils/ui'

export const icons = {
  file: require('@assets/cloud/file.png'),
  open: require('@assets/cloud/folder-open.png'),
  folder: require('@assets/cloud/folder.png'),
  music: require('@assets/cloud/music.png'),
  pic: require('@assets/cloud/pic.png'),
  video: require('@assets/cloud/video.png'),
  zip: require('@assets/cloud/zip.png'),
  origin: require('@assets/cloud/origin.png')
}

let smbClient

export function smbList(config = {}) {
  return new Promise(resolve => {
    smbDisconnect()

    // SMBClient
    smbClient = new SMBClient(
      config.ip,
      config.port,
      config.sharedFolder,
      config.workGroup,
      config.username,
      config.password,
      data => {
        console.log('Create', data)

        if (!data?.success) {
          smbClient = null
          Alert.alert('连接失败', `[${data.errorCode}] ${data.message}`, [
            {
              text: '确定',
              onPress: () => {}
            }
          ])
        }
      }
    )
    info('连接 smb...')

    setTimeout(async () => {
      const data = []
      const _path = config.path.split(',')
      for (let i = 0; i < _path.length; i += 1) {
        const list = await _smbList(_path[i])
        if (list) data.push(...list)
      }

      resolve(data)
      smbDisconnect()
    }, 1000)
  })
}

function _smbList(path = '') {
  return new Promise(resolve => {
    if (typeof smbClient?.list !== 'function') {
      smbDisconnect()
      resolve(false)
      return
    }

    smbClient.list(path, async data => {
      if (!data?.success) {
        smbClient.disconnect(() => console.log('Disconnect'))
        smbClient = null

        Alert.alert('连接失败', `[${data.errorCode}] ${data.message}`, [
          {
            text: '确定',
            onPress: () => {}
          }
        ])
        resolve(false)
        return
      }

      const list = data.list
        .filter(
          item =>
            !item.hidden && item.isDirectory && item.name !== '.' && item.name !== '..'
        )
        .map(item => ({
          name: item.name,
          lastModified: item.lastModified,
          path,

          // lazy
          list: [],
          ids: [],
          tags: []
        }))

      const hide = loading('扫描目录中...')
      await queue(
        list.map(item => {
          return () => {
            return new Promise(rsl => {
              try {
                smbClient.list(path ? `${path}/${item.name}` : item.name, data => {
                  if (data?.success) {
                    // list
                    item.list = data.list
                      .filter(
                        item =>
                          !item.hidden &&
                          item.name !== '.' &&
                          item.name !== '..' &&
                          !item.name.includes('DS_Store')
                      )
                      .map(item => ({
                        name: item.name,
                        type: item.isDirectory ? 'folder' : getFileMediaType(item.name),
                        lastModified: item.lastModified
                      }))
                      .sort((a, b) => asc(a.name, b.name))

                    // subjects
                    item.ids = data.list
                      .filter(item =>
                        /^\d+\.bgm(\.txt)?$/.test(item.name.toLocaleLowerCase())
                      )
                      .sort((a, b) => desc(a.name, b.name))
                      .map(item =>
                        Number(
                          item.name.toLocaleLowerCase().replace(/(\.bgm)|(\.txt)/g, '')
                        )
                      )

                    // tags
                    item.tags = matchTags(`${item.name} ${list[0]?.name || ''}`)
                  }
                  rsl()
                })
              } catch (error) {
                rsl()
              }
            })
          }
        })
      )
      hide()

      resolve(list)
    })
  })
}

function smbDisconnect() {
  if (smbClient) {
    try {
      smbClient.disconnect(() => console.log('Disconnect'))
    } catch (error) {}
    smbClient = null
  }
}

/**
 * https://github.com/MagmaBlock/LavaAnimeWeb/blob/main/assets/dict.json
 */
const dict = [
  {
    reg: /(1080(P|p)|1920(X|×)1080)/,
    val: '1080P'
  },
  {
    reg: /2160(P|p)/,
    val: '2160P'
  },
  {
    reg: /1440(P|p)/,
    val: '1440P'
  },
  {
    reg: /(720(P|p)|1280(X|×)720)/,
    val: '720P'
  },
  {
    reg: /60fps/,
    val: '60FPS'
  },
  {
    reg: /(AVC|x264|h264)/,
    val: 'AVC'
  },
  {
    reg: /(HEVC|x265|H265)/,
    val: 'HEVC'
  },
  {
    reg: /ma10p/,
    val: 'Ma10p'
  },
  {
    reg: /8bit/,
    val: '8bit'
  },
  {
    reg: /Hi10p|10bit/,
    val: '10bit'
  },
  {
    reg: /yuv420p10/,
    val: 'YUV-4:2:0 10bit'
  },
  {
    reg: /(ACC|AAC)/,
    val: 'AAC'
  },
  {
    reg: /flac|FLAC/,
    val: 'FLAC'
  },
  {
    reg: /(opus|OPUSx2)/,
    val: 'OPUS'
  },
  {
    reg: /(web-dl|webrip)/,
    val: 'WEBRip'
  },
  {
    reg: /(bdrip|BD)/,
    val: 'BDRip'
  },
  {
    reg: /(dvdrip|DVD)/,
    val: 'DVDRip'
  },
  // {
  //   reg: /(AT-X)/,
  //   val: 'AT-X'
  // },
  {
    reg: /(剧场版|movie|MOVIE)/,
    val: '剧场版'
  },
  {
    reg: /(ova|OVA)/,
    val: 'OVA'
  },
  {
    reg: /(sp|SP)/,
    val: 'SP'
  },
  {
    reg: /(NCOP)/,
    val: '无字OP'
  },
  {
    reg: /(NCED)/,
    val: '无字ED'
  },
  {
    reg: /\.mp4/,
    val: 'MP4'
  },
  {
    reg: /\.mkv/,
    val: 'MKV'
  }
]
export const dictOrder = {
  条目: 1101,
  文件夹: 1100,

  动画: 1005,
  书籍: 1004,
  游戏: 1003,
  音乐: 1002,
  三次元: 1001,

  在看: 965,
  看过: 964,
  想看: 963,
  在读: 955,
  读过: 954,
  想读: 953,
  在玩: 945,
  玩过: 944,
  想玩: 943,
  在听: 935,
  听过: 934,
  想听: 933,
  搁置: 902,
  抛弃: 901,
  未收藏: 900,

  '2160P(2K)': 104,
  '1440P': 103,
  '1080P': 102,
  '720P': 101,

  BDRip: 93,
  WEBRip: 92,
  DVDRip: 91,

  '10bit 色深': 81,
  '8bit 色深': 80,

  剧场版: 73,
  OVA: 72,
  SP: 71
}
export function matchTags(name) {
  const tags = []
  if (!name) return tags

  dict.forEach(item => {
    if (item.reg.test(name)) tags.push(item.val)
  })

  return tags.sort((a, b) => desc(dictOrder[a] || 0, dictOrder[b] || 0))
}

export function getFileMediaType(filename) {
  const _filename = String(filename).toLocaleLowerCase()
  if (/\.(mp4|m4v|mkv|avi|rmvb|mov|flv)$/.test(_filename)) return 'video'
  if (/\.(mp3|m4a|aac|flac|ape|wav)$/.test(_filename)) return 'music'
  if (/\.(jpg|jpeg|png|gif|bmp|webp)$/.test(_filename)) return 'pic'
  if (/\.(zip|rar|7z)$/.test(_filename)) return 'zip'
  if (/((\.bgm)|(\.bgm\.txt))$/.test(_filename)) return 'origin'
  return 'file'
}
