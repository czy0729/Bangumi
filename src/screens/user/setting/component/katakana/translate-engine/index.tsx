/*
 * @Author: czy0729
 * @Date: 2024-04-23 05:21:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 05:23:10
 */
import React from 'react'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'

/** 翻译引擎 */
function TranslateEngine({ filter }) {
  return useObserver(() => (
    <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS.engine.setting}>
      <ItemSettingBlock.Item active filter={filter} onPress={() => {}} {...TEXTS.engine.baidu} />
      <ItemSettingBlock.Item
        style={_.ml.md}
        active={false}
        filter={filter}
        onPress={() => {}}
        {...TEXTS.engine.google}
      />
    </ItemSettingBlock>
  ))
}

export default TranslateEngine
