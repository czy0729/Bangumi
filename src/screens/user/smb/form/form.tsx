/*
 * @Author: czy0729
 * @Date: 2022-10-30 06:57:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-17 07:16:16
 */
import React, { useRef, useEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Modal } from '@components'
import { memo } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import TypeItem from './type-item'
import Example from './example'
import DirectoryItem from './directory-item'
import InputItem from './input-item'
import UrlItem from './url-item'
import SaveItem from './save-item'
import Information from './information'
import { DEFAULT_PROPS } from './ds'

export default memo(({ styles, visible, name, onClose }) => {
  const nameRef = useRef(null)
  const ipRef = useRef(null)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const portRef = useRef(null)
  const sharedFolderRef = useRef(null)
  const pathRef = useRef(null)
  const workGroupRef = useRef(null)
  const urlRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      if (visible && !name.length) {
        try {
          if (typeof nameRef?.current?.focus === 'function') {
            nameRef.current.focus()
          }
        } catch (error) {}
      }
    }, 400)
  }, [visible, name])

  return (
    <Modal
      style={styles.modal}
      visible={visible}
      title='连接本地服务'
      onClose={onClose}
    >
      <KeyboardAvoidingView style={styles.body} behavior='padding'>
        {!STORYBOOK && <TypeItem />}
        <Example />
        {STORYBOOK && <DirectoryItem />}
        <InputItem
          label='别名'
          placeholder='选填，用于区分，如 2023S4'
          name='name'
          connectRef={(ref: { inputRef: any }) => (nameRef.current = ref?.inputRef)}
          onSubmitEditing={() => {
            try {
              if (typeof ipRef?.current?.focus === 'function') ipRef.current.focus()
            } catch (error) {}
          }}
        />
        {!STORYBOOK && (
          <InputItem
            label='主机'
            placeholder='必填，如内网 192.168.1.1'
            name='ip'
            connectRef={(ref: { inputRef: any }) => (ipRef.current = ref?.inputRef)}
            onSubmitEditing={() => {
              try {
                if (typeof portRef?.current?.focus === 'function')
                  portRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        {!STORYBOOK && (
          <InputItem
            label='端口'
            placeholder='默认 445'
            name='port'
            connectRef={(ref: { inputRef: any }) => (portRef.current = ref?.inputRef)}
            onSubmitEditing={() => {
              try {
                if (typeof usernameRef?.current?.focus === 'function')
                  usernameRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        {!STORYBOOK && (
          <InputItem
            label='用户'
            placeholder='必填'
            name='username'
            connectRef={(ref: { inputRef: any }) =>
              (usernameRef.current = ref?.inputRef)
            }
            onSubmitEditing={() => {
              try {
                if (typeof passwordRef?.current?.focus === 'function')
                  passwordRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        {!STORYBOOK && (
          <InputItem
            label='密码'
            placeholder='必填'
            name='password'
            connectRef={(ref: { inputRef: any }) =>
              (passwordRef.current = ref?.inputRef)
            }
            onSubmitEditing={() => {
              try {
                if (typeof sharedFolderRef?.current?.focus === 'function')
                  sharedFolderRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        <InputItem
          label='路径'
          placeholder='选填，常为顶目录，头尾不要填斜杠'
          name='sharedFolder'
          connectRef={(ref: { inputRef: any }) =>
            (sharedFolderRef.current = ref?.inputRef)
          }
          onSubmitEditing={() => {
            try {
              if (typeof pathRef?.current?.focus === 'function') pathRef.current.focus()
            } catch (error) {}
          }}
        />
        {!STORYBOOK && (
          <InputItem
            label='文件夹'
            placeholder='通常不填，多个用英文逗号分割'
            name='path'
            connectRef={(ref: { inputRef: any }) => (pathRef.current = ref?.inputRef)}
            onSubmitEditing={() => {
              try {
                if (typeof workGroupRef?.current?.focus === 'function')
                  workGroupRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        {!STORYBOOK && (
          <InputItem
            label='工作组'
            placeholder='通常不填，默认空'
            name='workGroup'
            connectRef={(ref: { inputRef: any }) =>
              (workGroupRef.current = ref?.inputRef)
            }
            onSubmitEditing={() => {
              try {
                if (typeof urlRef?.current?.focus === 'function') urlRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        <UrlItem
          connectRef={(ref: { inputRef: any }) => (urlRef.current = ref?.inputRef)}
        />
        <SaveItem />
      </KeyboardAvoidingView>
      <Information />
    </Modal>
  )
}, DEFAULT_PROPS)
