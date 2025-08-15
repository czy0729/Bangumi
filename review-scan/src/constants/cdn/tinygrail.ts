/*
 * @Author: czy0729
 * @Date: 2022-05-23 07:27:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 08:20:36
 */
import { getStorage, setStorage } from '@utils/storage'
import { xhrCustom } from '@utils/fetch'
import { HOST_CDN } from '../constants'
import { VERSION_TINYGRAIL } from './ds'
import { getOTA } from './utils'

const HOST_STATIC = `${HOST_CDN}/gh/czy0729/Bangumi-Static`
const OTA_XSB_RELATION_VERSION = '@cdn|oss-xsb-relation|version|210719'
const OTA_XSB_RELATION_DATA = '@cdn|oss-xsb-relation|data|210719'
let xsbRelationOTA = {
  name: {},
  data: {},
  relation: {}
}
let xsbRelationLoaded = false

/** 初始化云端数据 */
export const initXsbRelationOTA = async () => {
  if (xsbRelationLoaded) return

  // 云版本
  // 版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(OTA_XSB_RELATION_VERSION)) || VERSION_TINYGRAIL
  const data = (await getStorage(OTA_XSB_RELATION_DATA)) || {
    name: {},
    data: {},
    relation: {}
  }

  const ota = getOTA()
  const needUpdate =
    (!xsbRelationLoaded && !Object.keys(xsbRelationOTA.data).length) ||
    parseInt(ota.VERSION_TINYGRAIL) > parseInt(version)

  // 没缓存也要请求数据
  if (needUpdate || !Object.keys(data.data).length) {
    try {
      xsbRelationLoaded = true

      const version =
        parseInt(ota.VERSION_TINYGRAIL) > parseInt(VERSION_TINYGRAIL)
          ? ota.VERSION_TINYGRAIL
          : VERSION_TINYGRAIL
      const { _response } = await xhrCustom({
        url: `${HOST_STATIC}@${version}/data/tinygrail/relation.min.json`
      })

      xsbRelationOTA = JSON.parse(_response)
      setStorage(OTA_XSB_RELATION_VERSION, version)
      setStorage(OTA_XSB_RELATION_DATA, xsbRelationOTA)
    } catch (error) {
      // 404
      xsbRelationLoaded = true
    }
    return
  }

  // 有缓存直接返回
  xsbRelationLoaded = true
  xsbRelationOTA = data
}

/** 获取小圣杯关联角色数据 */
export const getXsbRelationOTA = () => xsbRelationOTA
