/*
 * @Author: czy0729
 * @Date: 2022-10-30 06:57:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:07:05
 */
import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import { Modal } from '@components'
import { memo } from '@utils/decorators'
import { FROZEN_FN, WEB } from '@constants'
import DirectoryItem from './directory-item'
import Example from './example'
import Information from './information'
import InputItem from './input-item'
import SaveItem from './save-item'
import SwitchItem from './switch-item'
import TypeItem from './type-item'
import UrlItem from './url-item'
import { DEFAULT_PROPS } from './ds'

export default memo(({ store, styles, visible = false, name = '', onClose = FROZEN_FN }) => {
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
    <Modal style={styles.modal} visible={visible} title='连接本地服务' onClose={onClose}>
      <View style={styles.body}>
        {!WEB && <TypeItem store={store} />}
        <Example store={store} />
        {WEB && <DirectoryItem />}
        <InputItem
          store={store}
          label='别名'
          placeholder='选填，区分不同服务，如 Anime'
          name='name'
          connectRef={(ref: { inputRef: any }) => (nameRef.current = ref?.inputRef)}
          onSubmitEditing={() => {
            try {
              if (typeof ipRef?.current?.focus === 'function') ipRef.current.focus()
            } catch (error) {}
          }}
        />
        {!WEB && (
          <InputItem
            store={store}
            label='主机'
            placeholder='必填，如内网 192.168.1.1'
            name='ip'
            connectRef={(ref: { inputRef: any }) => (ipRef.current = ref?.inputRef)}
            onSubmitEditing={() => {
              try {
                if (typeof portRef?.current?.focus === 'function') portRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        {!WEB && (
          <InputItem
            store={store}
            label='端口'
            placeholder='默认 445'
            name='port'
            connectRef={(ref: { inputRef: any }) => (portRef.current = ref?.inputRef)}
            onSubmitEditing={() => {
              try {
                if (typeof usernameRef?.current?.focus === 'function') usernameRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        {!WEB && (
          <InputItem
            store={store}
            label='用户'
            placeholder='必填'
            name='username'
            connectRef={(ref: { inputRef: any }) => (usernameRef.current = ref?.inputRef)}
            onSubmitEditing={() => {
              try {
                if (typeof passwordRef?.current?.focus === 'function') passwordRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        {!WEB && (
          <InputItem
            store={store}
            label='密码'
            placeholder='必填'
            name='password'
            connectRef={(ref: { inputRef: any }) => (passwordRef.current = ref?.inputRef)}
            onSubmitEditing={() => {
              try {
                if (typeof sharedFolderRef?.current?.focus === 'function')
                  sharedFolderRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        <InputItem
          store={store}
          label='路径'
          information={
            WEB
              ? `同时支持读取所有子文件夹，若你直接选择了 D:/Anime，那路径应该填 D: 就可以了，可能不同版本浏览器之间有差异。若填入后在结果列表中出现了 D:/D:/ 这种不寻常的情况，可能你并不需要填写此项，可以随时修改。`
              : ''
          }
          placeholder={
            WEB
              ? '选填，硬盘名，如 D:、D:/Anime，头尾不需要斜杠'
              : '选填，常为顶文件夹，头尾不需要斜杠'
          }
          name='sharedFolder'
          connectRef={(ref: { inputRef: any }) => (sharedFolderRef.current = ref?.inputRef)}
          onSubmitEditing={() => {
            try {
              if (typeof pathRef?.current?.focus === 'function') pathRef.current.focus()
            } catch (error) {}
          }}
        />
        {!WEB && (
          <InputItem
            store={store}
            label='文件夹'
            placeholder='通常不填，多个用英文逗号分割'
            name='path'
            connectRef={(ref: { inputRef: any }) => (pathRef.current = ref?.inputRef)}
            onSubmitEditing={() => {
              try {
                if (typeof workGroupRef?.current?.focus === 'function') workGroupRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        {!WEB && (
          <InputItem
            store={store}
            label='工作组'
            placeholder='通常不填，默认空'
            name='workGroup'
            connectRef={(ref: { inputRef: any }) => (workGroupRef.current = ref?.inputRef)}
            onSubmitEditing={() => {
              try {
                if (typeof urlRef?.current?.focus === 'function') urlRef.current.focus()
              } catch (error) {}
            }}
          />
        )}
        <UrlItem
          store={store}
          connectRef={(ref: { inputRef: any }) => (urlRef.current = ref?.inputRef)}
        />
        {WEB && <SwitchItem />}
        <SaveItem store={store} />
      </View>
      <Information />
    </Modal>
  )
}, DEFAULT_PROPS)
