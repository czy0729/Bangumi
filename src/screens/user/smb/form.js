/*
 * @Author: czy0729
 * @Date: 2022-04-01 04:04:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 22:21:37
 */
import React, { useRef, useEffect } from 'react'
import { KeyboardAvoidingView, View, Alert } from 'react-native'
import { Flex, Text, Input, Touchable } from '@components'
import Modal from '@components/@/ant-design/modal'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { memo, obc } from '@utils/decorators'

const defaultProps = {
  styles: {},
  visible: false,
  id: '',
  name: '',
  ip: '',
  username: '',
  password: '',
  port: '',
  sharedFolder: '',
  path: '',
  workGroup: '',
  url: '',
  onClose: Function.prototype,
  onChange: Function.prototype,
  onSubmit: Function.prototype
}

const Form = memo(
  ({
    styles,
    visible,
    id,
    name,
    ip,
    username,
    password,
    port,
    sharedFolder,
    path,
    workGroup,
    url,
    onClose,
    onChange,
    onSubmit
  }) => {
    const nameRef = useRef(null)
    const ipRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const portRef = useRef(null)
    const sharedFolderRef = useRef(null)
    const pathRef = useRef(null)
    const workGroupRef = useRef(null)
    const urlRef = useRef(null)
    const isEdit = !!id

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
        title={
          <Text type='title' size={16}>
            连接SMB服务
          </Text>
        }
        transparent
        maskClosable
        closable
        onClose={onClose}
      >
        <KeyboardAvoidingView style={styles.body} behavior='padding'>
          <Flex>
            <Text style={styles.label}>别名</Text>
            <Flex.Item>
              <Input
                ref={ref => (nameRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='选填'
                value={name}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('name', text)}
                onSubmitEditing={() => {
                  try {
                    if (typeof ipRef?.current?.focus === 'function') {
                      ipRef.current.focus()
                    }
                  } catch (error) {}
                }}
              />
            </Flex.Item>
          </Flex>
          <Flex>
            <Text style={styles.label}>主机</Text>
            <Flex.Item>
              <Input
                ref={ref => (ipRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='必填，内网IP'
                value={ip}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('ip', text)}
                onSubmitEditing={() => {
                  try {
                    if (typeof usernameRef?.current?.focus === 'function') {
                      usernameRef.current.focus()
                    }
                  } catch (error) {}
                }}
              />
            </Flex.Item>
          </Flex>
          <Flex>
            <Text style={styles.label}>用户</Text>
            <Flex.Item>
              <Input
                ref={ref => (usernameRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='选填'
                value={username}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('username', text)}
                onSubmitEditing={() => {
                  try {
                    if (typeof passwordRef?.current?.focus === 'function') {
                      passwordRef.current.focus()
                    }
                  } catch (error) {}
                }}
              />
            </Flex.Item>
          </Flex>
          <Flex>
            <Text style={styles.label}>密码</Text>
            <Flex.Item>
              <Input
                ref={ref => (passwordRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='必填'
                value={password}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('password', text)}
                onSubmitEditing={() => {
                  try {
                    if (typeof sharedFolderRef?.current?.focus === 'function') {
                      sharedFolderRef.current.focus()
                    }
                  } catch (error) {}
                }}
              />
            </Flex.Item>
          </Flex>
          <Flex>
            <Text style={styles.label}>路径</Text>
            <Flex.Item>
              <Input
                ref={ref => (sharedFolderRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='必填，通常为共享的顶层目录'
                value={sharedFolder}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('sharedFolder', text)}
                onSubmitEditing={() => {
                  try {
                    if (typeof pathRef?.current?.focus === 'function') {
                      pathRef.current.focus()
                    }
                  } catch (error) {}
                }}
              />
            </Flex.Item>
          </Flex>
          <Flex>
            <Text style={styles.label}>文件夹</Text>
            <Flex.Item>
              <Input
                ref={ref => (pathRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='默认空，可填多个，英文逗号分割'
                value={path}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('path', text)}
                onSubmitEditing={() => {
                  try {
                    if (typeof portRef?.current?.focus === 'function') {
                      portRef.current.focus()
                    }
                  } catch (error) {}
                }}
              />
            </Flex.Item>
          </Flex>
          <Flex>
            <Text style={styles.label}>端口</Text>
            <Flex.Item>
              <Input
                ref={ref => (portRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='默认445'
                value={port}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('port', text)}
                onSubmitEditing={() => {
                  try {
                    if (typeof workGroupRef?.current?.focus === 'function') {
                      workGroupRef.current.focus()
                    }
                  } catch (error) {}
                }}
              />
            </Flex.Item>
          </Flex>
          <Flex>
            <Text style={styles.label}>工作组</Text>
            <Flex.Item>
              <Input
                ref={ref => (workGroupRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='默认空，通常不填'
                value={workGroup}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('workGroup', text)}
                onSubmitEditing={() => {
                  try {
                    if (typeof urlRef?.current?.focus === 'function') {
                      urlRef.current.focus()
                    }
                  } catch (error) {}
                }}
              />
            </Flex.Item>
          </Flex>
          <Flex align='start'>
            <Flex style={[styles.label, _.mt.sm]}>
              <Text lineHeight={15}>跳转</Text>
              <IconTouchable
                style={_.ml._xs}
                name='md-info-outline'
                size={16}
                onPress={() =>
                  Alert.alert(
                    '自定义跳转',
                    `自定义第三方跳转规则。点击文件复制地址，长按跳转。
                    \n[IP] = 主机:端口\n[USERNAME] = 用户\n[PASSWORD] = 密码\n[PATH] = 目录路径\n[FILE] = 文件路径
                    \n推荐播放安装nPlayer，支持 nplayer-smb:// 前缀的直接跳转。\n目前已知只有smb 1.0协议可以直接播放，2.0会被强制关闭连接，待解决。`,
                    [
                      {
                        text: '已知问题和详细教程',
                        onPress: () => {}
                      },
                      {
                        text: '确定',
                        onPress: () => {}
                      }
                    ]
                  )
                }
              />
            </Flex>
            <Flex.Item>
              <Input
                ref={ref => (urlRef.current = ref?.inputRef)}
                style={styles.input}
                value={url}
                showClear
                multiline
                numberOfLines={3}
                textAlignVertical='top'
                returnKeyType='done'
                returnKeyLabel='新增'
                onChangeText={text => onChange('url', text)}
              />
            </Flex.Item>
          </Flex>
          <Flex justify='center'>
            <Touchable style={styles.touch} onPress={onSubmit}>
              <Text style={styles.btn} type='main'>
                {isEdit ? '保存' : '新增'}
              </Text>
            </Touchable>
            <Touchable style={styles.touch} onPress={onClose}>
              <Text style={styles.btn} type='sub'>
                取消
              </Text>
            </Touchable>
          </Flex>
        </KeyboardAvoidingView>
        <View style={styles.info}>
          <Touchable
            onPress={() => open('https://www.yuque.com/chenzhenyu-k0epm/znygb4/rrb8zh')}
          >
            <Text size={14} type='sub'>
              教程
            </Text>
          </Touchable>
        </View>
      </Modal>
    )
  },
  defaultProps
)

export default obc((props, { $ }) => {
  const {
    visible,
    id,
    name,
    ip,
    username,
    password,
    port,
    sharedFolder,
    path,
    workGroup,
    url
  } = $.state
  return (
    <Form
      styles={memoStyles()}
      visible={visible}
      id={id}
      name={name}
      ip={ip}
      username={username}
      password={password}
      port={port}
      sharedFolder={sharedFolder}
      path={path}
      workGroup={workGroup}
      url={url}
      onChange={$.onChange}
      onClose={$.onClose}
      onSubmit={$.onSubmit}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.contentWidth),
    marginTop: -_.window.height * 0.24,
    maxWidth: _.device(408, 560),
    paddingTop: _.device(_.md + 2, 28),
    paddingHorizontal: _.device(0, _.sm),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  body: {
    paddingHorizontal: 6,
    paddingTop: _.md
  },
  label: {
    width: 64
  },
  input: {
    paddingRight: 32,
    paddingLeft: 0,
    backgroundColor: 'transparent'
  },
  touch: {
    marginHorizontal: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  btn: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md
  },
  info: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 20,
    marginTop: -20
  }
}))
