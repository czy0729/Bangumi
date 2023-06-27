/*
 * @Author: czy0729
 * @Date: 2023-06-27 10:01:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-27 10:04:54
 */
import { getTimestamp } from '@utils'

export const TITLE = '登录'

export const NAMESPACE = 'LoginV2'

export const AUTH_RETRY_COUNT = 4

export const URL_TOURIST =
  `https://gitee.com/a296377710/bangumi/raw/master/tourist.json?t=${getTimestamp()}` as const

export const UA_EKIBUN_BANGUMI_APP =
  'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36'
