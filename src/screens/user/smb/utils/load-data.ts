/*
 * @Author: czy0729
 * @Date: 2024-08-19 09:07:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:43:44
 */
import { queue } from '@utils'
import { decode } from '@utils/thirdParty/protobuf'
import { loadJSON } from '@assets/json'

/** 预载罗马音字典 (protobuf) 与手工补充表 (JSON) */
export async function loadJAData() {
  return queue([() => decode('ja'), () => loadJSON('thirdParty/ja.addon')])
}
