/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:48:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:41:41
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'System')

export const TEXTS = {
  setting: {
    setting: {
      title: '同步设置',
      information: '同步设置、超展开设置、自定义放送数据'
    },
    download: {
      title: '下载'
    },
    upload: {
      title: '上传'
    },
    reset: {
      title: '恢复默认'
    }
  },
  settingTopic: {
    hd: '同步收藏的帖子',
    information: '规划中暂不可用，当前均为自动同步，后续会改为手动'
  },
  serverStatus: {
    hd: '网络探针'
  }
} as const
