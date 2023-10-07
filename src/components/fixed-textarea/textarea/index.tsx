/*
 * @Author: czy0729
 * @Date: 2023-07-29 04:25:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 19:27:07
 */
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useObserver } from 'mobx-react'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { _ } from '@stores'
import { IOS } from '@constants'
import { SafeAreaBottom, SafeAreaBottomProps } from '../../safe-area-bottom'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Touchable } from '../../touchable'
import SourceText from './source-text'
import { memoStyles } from './styles'

function Textarea({
  forwardRef,
  simple,
  marks,
  source,
  placeholder,
  value,
  editing,
  showSource,
  showSourceText,
  showTextarea,
  onFocus,
  onChange,
  onSelectionChange,
  onSubmit,
  onAddSymbolText,
  onToggleSource,
  onToggleSourceText
}) {
  const { bottom } = useSafeAreaInsets()

  /** 是否安卓全面屏 */
  const isFullScreen = !IOS && bottom <= 20

  return useObserver(() => {
    const styles = memoStyles()
    const Component = _.ios(View, SafeAreaBottom)

    const passProps: SafeAreaBottomProps = {
      style: styles.container
    }
    if (!isFullScreen) {
      passProps.style = editing ? styles.containerSpec : styles.containerSpecFixed
      passProps.type = 'paddingBottom'
    }

    return (
      <Component {...passProps}>
        <Flex align='start'>
          <Flex.Item style={editing ? styles.body : styles.fixed}>
            <TextareaItem
              ref={forwardRef}
              style={styles.textarea}
              value={value}
              placeholder={simple || editing ? placeholder || '我要吐槽' : ''}
              placeholderTextColor={_.colorDisabled}
              rows={8}
              selectionColor={_.colorMain}
              clear
              onFocus={onFocus}
              onChange={onChange}
              onSelectionChange={onSelectionChange}
            />
          </Flex.Item>
          {editing && (
            <Touchable style={styles.touch} onPress={onSubmit}>
              <Flex style={styles.send} justify='center'>
                <Iconfont
                  name='md-send'
                  size={16}
                  color={value !== '' ? _.colorMain : _.colorSub}
                />
              </Flex>
            </Touchable>
          )}
          <SourceText
            source={source}
            marks={marks}
            value={value}
            showTextarea={showTextarea}
            showSource={showSource}
            showSourceText={showSourceText}
            onAddSymbolText={onAddSymbolText}
            onToggleSource={onToggleSource}
            onToggleSourceText={onToggleSourceText}
          />
        </Flex>
      </Component>
    )
  })
}

export default Textarea
