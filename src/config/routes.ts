/*
 * @Author: czy0729
 * @Date: 2026-09-06 17:28:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 17:33:31
 *
 * 默认路由
 */
import type { Configs } from '@types'

import { DEV } from './dev'

/** 路由覆盖配置 */
const CONFIGS: Configs = {
  initialRouteName: DEV ? 'HomeTab' : 'HomeTab',
  initialRouteParams: {
    // subjectId: 552533
    // topicId: 'group/438017'
    // userId: 'lilyurey'
    // monoId: 'character/109775'
    // id: 68522148
    // ids: [72649, 59610, 59611, 72648, 72650, 72651, 72652, 74522, 75203, 75207]
    // blogId: 295515
    // catalogId: 34360
    // groupId: 'boring'
    // jp: 'ようこそ実力至上主義の教室へ',
    // cn: '无职转生 ～在异世界认真地活下去～'
    // userName: 'sukaretto'
    // from: 'tinygrail'
    // form: 'lottery'
    // message: '彩票刮刮乐共获得： #20391「双叶杏」64股 #70900「神原骏河」36股'
    // name: '绫香·沙条',
    // keywords: ['アヤカ・サジョウ', 'Fate/strange Fake']
    // tag: '水树奈奈'
    // type: 'anime'
    // uri: 'https://bgm.tv/award/2019'
  }
}

// 本地开发覆盖（src/config/router.local.ts 为 gitignored 文件，不入库）
try {
  const localConfigs = require('./router.local') as {
    default: {
      enabled: boolean
      initialRouteName: Configs['initialRouteName']
      initialRouteParams: Configs['initialRouteParams']
    }
  }
  if (localConfigs.default.enabled) {
    if (localConfigs.default.initialRouteName) {
      CONFIGS.initialRouteName = localConfigs.default.initialRouteName
    }
    if (localConfigs.default.initialRouteParams) {
      CONFIGS.initialRouteParams = localConfigs.default.initialRouteParams
    }
  }
} catch {}

export default CONFIGS
