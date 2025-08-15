/*
 * @Author: czy0729
 * @Date: 2021-06-11 17:29:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:47:19
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { autorun } from 'mobx'
import { useObserver } from 'mobx-react'
import { ActionSheet, Flex, Iconfont, Input, Modal, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT, LINKS } from './ds'
import { memoStyles } from './styles'

const LinkModal = () => {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()
  const [show, setShow] = useState(false)
  const iptRef = useRef<any>(null)

  const handleOpen = useCallback(() => {
    setShow(true)

    try {
      if (typeof iptRef.current?.inputRef?.blur === 'function') {
        iptRef.current.inputRef.blur()
      }
    } catch (error) {}
  }, [])
  const handleClose = useCallback(() => {
    setShow(false)

    setTimeout(() => {
      try {
        if (typeof iptRef.current?.inputRef?.focus === 'function') {
          iptRef.current.inputRef.focus()
        }
      } catch (error) {}
    }, 480)
  }, [])
  const handleSelect = useCallback(
    (text: string) => {
      $.onChangeText(text)
      handleClose()
    },
    [$, handleClose]
  )
  const handleSubmit = useCallback(() => {
    $.onLinkSubmit(navigation)
  }, [$, navigation])

  return useObserver(() => {
    const styles = memoStyles()
    const { visible, link } = $.state

    useEffect(() => {
      return autorun(() => {
        if (visible) {
          setTimeout(() => {
            try {
              if (typeof iptRef.current?.inputRef?.focus === 'function') {
                iptRef.current.inputRef.focus()
              }
            } catch (error) {}
          }, 240)
        }
      })
    }, [visible])

    return (
      <>
        <Modal style={styles.modal} visible={visible} title='剪贴板' onClose={$.toggleLinkModal}>
          <View style={styles.container}>
            <Text size={13} bold>
              可能由于权限问题，未能在剪贴板中匹配到链接，请手动粘贴或输入
            </Text>
            <Flex style={_.mt.md} align='center'>
              <Flex.Item>
                <Input
                  ref={iptRef}
                  style={styles.ipt}
                  defaultValue={link}
                  placeholder='输入或粘贴 bgm.tv 的链接'
                  showClear
                  onChangeText={$.onChangeText}
                  onSubmitEditing={handleSubmit}
                />
              </Flex.Item>
              <Touchable style={_.ml.md} onPress={handleSubmit}>
                <Text size={13}>提交</Text>
              </Touchable>
            </Flex>
          </View>
          <View style={styles.info}>
            <Touchable onPress={handleOpen}>
              <Text size={14} type='sub'>
                预设
              </Text>
            </Touchable>
          </View>
        </Modal>

        <ActionSheet show={show} title='预设' height={640} onClose={handleClose}>
          <View style={_.container.wind}>
            {LINKS.map(item => (
              <Touchable
                key={item.key}
                style={styles.item}
                onPress={() => {
                  handleSelect(item.value)
                }}
              >
                <Flex>
                  <Flex.Item>
                    <Text size={15} bold>
                      {item.key}
                    </Text>
                    <Text style={_.mt.xs} type='sub' size={13} bold>
                      {item.text}
                    </Text>
                  </Flex.Item>
                  <Iconfont name='md-navigate-next' />
                </Flex>
              </Touchable>
            ))}
          </View>
        </ActionSheet>
      </>
    )
  })
}

export default LinkModal
