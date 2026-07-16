/*
 * @Author: czy0729
 * @Date: 2023-07-30 18:21:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-14 20:43:30
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { IOS } from '@constants'
import { Flex } from '../../../flex'
import { Iconfont } from '../../../iconfont'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'
import Count from './count'
import Marks from './marks'
import { styles } from './styles'

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
}) {
  if (!source || !showTextarea) return null

  return (
    <Flex style={styles.source}>
      <Flex.Item>
        <Flex>
          {showSource && (
            <Touchable
              style={stl(styles.opacity, styles.btn, _.mr.md, !showSourceText && _.ml._xs)}
              onPress={onToggleSourceText}
            >
              <Flex>
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
              </Flex>
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
      <Touchable style={styles.touch} onPress={onToggleSource}>
        <Flex>
          <Iconfont
            name={showSource ? 'md-check-circle' : 'md-radio-button-off'}
            size={11}
            color={showSource ? _.colorMain : _.colorSub}
          />
          <Text style={_.ml.xs} type='sub' size={11}>
            宣传语
          </Text>
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default observer(SourceText)
