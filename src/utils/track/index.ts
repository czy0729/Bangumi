/*
 * @Author: czy0729
 * @Date: 2022-04-13 00:32:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 20:06:04
 */
import { NativeModules, InteractionManager } from 'react-native'
import { DEV, IOS_IPA } from '@/config'
import { WSA } from '@constants/device'
import { HOST, IOS, VERSION_GITHUB_RELEASE } from '@constants/constants'
import events, { EventKeys } from '@constants/events'
import { urlStringify } from '../utils'
import { getUserStoreAsync, getThemeStoreAsync, getSystemStoreAsync } from '../async'
import { log } from '../dev'
import { xhr } from './utils'
import { SI_ANDROID, SI_ERROR, SI_IOS, SI_UV, SI_WSA } from './ds'

// const { UMAnalyticsModule } = NativeModules

const lastQuery = ''
const currentUrl = ''
const currentQuery = ''

/** HM@6.0 浏览统计 */
export function hm(url?: string, screen?: string) {}

/** UA */
export function ua() {}

/** Error 致命错误上报 */
export function err(desc: string) {}

/** 埋点统计 */
export function t(
  desc: EventKeys,
  eventData?: {
    [key: string]: string | number | boolean
  }
) {}
