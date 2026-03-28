/*
 * @Author: czy0729
 * @Date: 2023-02-13 04:48:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-25 14:43:27
 */
import { rc } from '@utils/dev'
import { HOST, MODEL_SETTING_LIVE2D_MODEL, SETTING_LIVE2D_MODEL } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Discovery')

export const TEXTS = {
  discoveryMenuNum: {
    hd: '菜单每行个数'
  },
  discoveryTodayOnair: {
    hd: '今日放送'
  },
  live2DV2: {
    hd: '看板娘 Live2D'
  },
  live2DModel: {
    setting: {
      title: '模型（伪春菜 Shell）',
      information: 'by CatFish',
      search: SETTING_LIVE2D_MODEL.map(item => item.label).join()
    },
    auto_riff: {
      title: MODEL_SETTING_LIVE2D_MODEL.getLabel('auto_riff'),
      information: '开关灯自动切换',
      src: `${HOST}/img/ukagaka/shell_1_thumb.jpg`
    },
    musume_riff: {
      title: MODEL_SETTING_LIVE2D_MODEL.getLabel('musume_riff'),
      information: '首席看板娘现已重制',
      src: `${HOST}/img/ukagaka/shell_24_thumb.jpg`
    },
    black_riff: {
      title: MODEL_SETTING_LIVE2D_MODEL.getLabel('black_riff'),
      information: '不出席看板娘现已出席',
      src: `${HOST}/img/ukagaka/shell_25_thumb.jpg`
    },
    musume_classic: {
      title: MODEL_SETTING_LIVE2D_MODEL.getLabel('musume_classic'),
      information: '首席看板娘 Classic',
      src: `${HOST}/img/ukagaka/shell_23_thumb.jpg`
    }
  },
  live2dScale: {
    hd: '尺寸'
  },
  live2DVoice: {
    hd: '声音',
    information: '点击发声，仅支持 Classic 的模型'
  }
} as const
