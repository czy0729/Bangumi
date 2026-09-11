/*
 * @Author: czy0729
 * @Date: 2023-07-30 18:21:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 00:42:53
 */
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { IOS } from '@constants'
import { Flex, flexStyle } from '../../../flex'
import { Iconfont } from '../../../iconfont'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'
import Count from './count'
import Marks from './marks'
import { styles } from './styles'

import type { Props } from './types'

function SourceText({
  source,
  marks,
  value,
  showTextarea,
  showSource,
  showSourceText,
  onAddSymbolText,
  onToggleSource,
  onToggleSourceText
}: Props) {
  if (!source || !showTextarea) return null

  return (
    <Flex style={styles.source}>
      <Flex.Item>
        <Flex>
          {showSource && (
            <Touchable
              style={stl(
                flexStyle(),
                styles.opacity,
                styles.btn,
                _.mr.md,
                !showSourceText && _.ml._xs
              )}
              onPress={onToggleSourceText}
            >
              {showSourceText && (
                <Text size={11} type='sub'>
                  [来自Bangumi for {IOS ? 'iOS' : 'android'}]
                </Text>
              )}
              <Iconfont
                name={showSourceText ? 'md-navigate-before' : 'md-navigate-next'}
                color={_.colorSub}
                size={18}
              />
            </Touchable>
          )}
          <Marks
            marks={marks}
            showSource={showSource}
            showSourceText={showSourceText}
            onAddSymbolText={onAddSymbolText}
          />
        </Flex>
      </Flex.Item>
      <Count value={value} />
      <Touchable style={stl(flexStyle(), styles.touch)} onPress={onToggleSource}>
        <Iconfont
          name={showSource ? 'md-check-circle' : 'md-radio-button-off'}
          size={11}
          color={showSource ? _.colorMain : _.colorSub}
        />
        <Text style={_.ml.xs} type='sub' size={11}>
          宣传语
        </Text>
      </Touchable>
    </Flex>
  )
}

export default observer(SourceText)
