/*
 * @Author: czy0729
 * @Date: 2022-08-05 07:25:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 07:26:10
 */
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'

const pinYinFirstCharacter = {}

export function testPinYinFirstCharacter(text: string, filter: string) {
  // 支持每个字符首拼音筛选
  if (/^[a-zA-Z]+$/.test(filter) && text) {
    if (!pinYinFirstCharacter[text]) {
      pinYinFirstCharacter[text] = getPinYinFirstCharacter(text, text.length).replace(
        / /g,
        ''
      )
    }

    if (pinYinFirstCharacter[text].includes(filter)) return true
  }

  return false
}
