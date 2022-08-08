/*
 * @Author: czy0729
 * @Date: 2022-08-07 07:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 08:24:27
 */
import React from 'react'
import { Highlight } from '@components'
import { t2s } from '@utils'
import { ob } from '@utils/decorators'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'

const PIN_YIN_FIRST_CHARACTER = {}

function Name({ userName, filter }) {
  const _filter = t2s(String(filter).toLocaleUpperCase())
  let value = ''
  if (_filter) {
    if (/^[a-zA-Z]+$/.test(_filter)) {
      if (!PIN_YIN_FIRST_CHARACTER[userName]) {
        PIN_YIN_FIRST_CHARACTER[userName] = getPinYinFirstCharacter(
          userName,
          userName.length
        ).replace(/ /g, '')
      }

      const pinyin = PIN_YIN_FIRST_CHARACTER[userName]
      if (typeof pinyin === 'string' && pinyin) {
        const index = pinyin.indexOf(_filter)
        if (index !== -1) {
          value = userName.slice(index, index + _filter.length)
        }
      }
    } else if (!value) {
      value = _filter
    }
  }

  return (
    <Highlight numberOfLines={1} bold value={value}>
      {userName}
    </Highlight>
  )
}

export default ob(Name)
