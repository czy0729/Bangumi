/*
 * @Author: czy0729
 * @Date: 2022-10-30 06:57:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-06 18:51:03
 */
import React, { useRef, useEffect } from 'react'
import { KeyboardAvoidingView, View, Alert } from 'react-native'
import { Modal, Flex, SegmentedControl, Text, Input, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { alert, open } from '@utils'
import { memo } from '@utils/decorators'
import { s2tAsync } from '@utils/async'
import { IOS, STORYBOOK } from '@constants'
import { DEFAULT_PROPS } from './ds'

export default memo(
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
    webDAV,
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

    const elType = (
      <SegmentedControl
        style={styles.segmentedControl}
        size={11}
        values={['SMB', 'webDAV']}
        selectedIndex={webDAV ? 1 : 0}
        enabled={!IOS}
        onChange={() => onChange('webDAV', !webDAV)}
      />
    )
    return (
      <Modal
        style={styles.modal}
        visible={visible}
        title='连接本地服务'
        onClose={onClose}
      >
        <KeyboardAvoidingView style={styles.body} behavior='padding'>
          {/* 类型 */}
          <Flex>
            <Text style={styles.label} size={12}>
              类型
            </Text>
            <Flex.Item>
              {IOS ? (
                <Touchable
                  onPress={() => {
                    alert('iOS 目前仅支持 webDAV 模式')
                  }}
                >
                  {elType}
                </Touchable>
              ) : (
                elType
              )}
            </Flex.Item>
          </Flex>

          {/* 例子 */}
          <Flex style={_.mt.sm} align='start'>
            <Text style={styles.label} size={12} lineHeight={13}>
              例子
            </Text>
            <Flex.Item>
              {webDAV ? (
                <>
                  <Text size={10} lineHeight={12} type='sub'>
                    http://{' '}
                    <Text size={10} lineHeight={12} type='sub' underline>
                      192.168.1.1
                    </Text>
                    ① :{' '}
                    <Text size={10} lineHeight={12} type='sub' underline>
                      5081
                    </Text>
                    ② /{' '}
                    <Text size={10} lineHeight={12} type='sub' underline>
                      my_dav/anime
                    </Text>
                    ③
                  </Text>
                  <Text size={10} lineHeight={12} type='sub'>
                    ①主机 ②端口 ③路径
                  </Text>
                </>
              ) : (
                <>
                  <Text size={10} lineHeight={12} type='sub'>
                    smb://{' '}
                    <Text size={10} lineHeight={12} type='sub' underline>
                      192.168.1.1
                    </Text>
                    ① :{' '}
                    <Text size={10} lineHeight={12} type='sub' underline>
                      445
                    </Text>
                    ② /{' '}
                    <Text size={10} lineHeight={12} type='sub' underline>
                      my_smb
                    </Text>
                    ③ /{' '}
                    <Text size={10} lineHeight={12} type='sub' underline>
                      anime
                    </Text>
                    ④
                  </Text>
                  <Text size={10} lineHeight={12} type='sub'>
                    ①主机 ②端口 ③路径 ④文件夹
                  </Text>
                </>
              )}
            </Flex.Item>
          </Flex>

          {/* 别名 */}
          <Flex style={_.mt.sm}>
            <Text style={styles.label} size={12}>
              别名
            </Text>
            <Flex.Item>
              <Input
                ref={ref => (nameRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='选填，用于区分，如 2023S4'
                defaultValue={name}
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

          {/* 主机 */}
          <Flex>
            <Text style={styles.label} size={12}>
              主机
            </Text>
            <Flex.Item>
              <Input
                ref={ref => (ipRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='必填，如内网 192.168.1.1'
                defaultValue={ip}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('ip', text)}
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

          {/* 端口 */}
          <Flex>
            <Text style={styles.label} size={12}>
              端口
            </Text>
            <Flex.Item>
              <Input
                ref={ref => (portRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='默认 445'
                defaultValue={port}
                showClear
                returnKeyType='next'
                onChangeText={text => onChange('port', text)}
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

          {/* 用户 */}
          <Flex>
            <Text style={styles.label} size={12}>
              用户
            </Text>
            <Flex.Item>
              <Input
                ref={ref => (usernameRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='必填'
                defaultValue={username}
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

          {/* 密码 */}
          <Flex>
            <Text style={styles.label} size={12}>
              密码
            </Text>
            <Flex.Item>
              <Input
                ref={ref => (passwordRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='必填'
                defaultValue={password}
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

          {/* 路径 */}
          <Flex>
            <Text style={styles.label} size={12}>
              路径
            </Text>
            <Flex.Item>
              <Input
                ref={ref => (sharedFolderRef.current = ref?.inputRef)}
                style={styles.input}
                placeholder='选填，常为顶目录，头尾不要填斜杠'
                defaultValue={sharedFolder}
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

          {/* 文件夹 */}
          {!STORYBOOK && (
            <Flex>
              <Text style={styles.label} size={12}>
                文件夹
              </Text>
              <Flex.Item>
                <Input
                  ref={ref => (pathRef.current = ref?.inputRef)}
                  style={styles.input}
                  placeholder='通常不填，多个用英文逗号分割'
                  defaultValue={path}
                  showClear
                  returnKeyType='next'
                  onChangeText={text => onChange('path', text)}
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
          )}

          {/* 工作组 */}
          {!STORYBOOK && (
            <Flex>
              <Text style={styles.label} size={12}>
                工作组
              </Text>
              <Flex.Item>
                <Input
                  ref={ref => (workGroupRef.current = ref?.inputRef)}
                  style={styles.input}
                  placeholder='通常不填，默认空'
                  defaultValue={workGroup}
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
          )}

          {/* 跳转 */}
          <Flex style={_.mt.sm} align='start'>
            <Flex style={styles.label}>
              <Text size={12}>跳转</Text>
              <IconTouchable
                style={_.ml._xs}
                name='md-info-outline'
                size={14}
                onPress={() => {
                  Alert.alert(
                    s2tAsync('自定义跳转'),
                    s2tAsync(`自定义第三方跳转规则。点击文件复制地址，长按跳转。
                    \n[IP] = 主机:端口\n[USERNAME] = 用户\n[PASSWORD] = 密码\n[PATH] = 目录路径\n[FILE] = 文件路径
                    \n若使用 SMB 务必使用 smb:// 开头，webDAV 务必使用 http | https:// 开头
                    \n推荐播放安装 VLC，直接使用 smb:// 能播；其次推荐 nPlayer，支持 nplayer-smb:// 前缀的直接跳转。\n目前已知只有 smb 1.0 协议可以直接播放，2.0会被强制关闭连接，待解决。`),
                    [
                      {
                        text: s2tAsync('已知问题和详细教程'),
                        onPress: () => {
                          open('https://www.yuque.com/chenzhenyu-k0epm/znygb4/rrb8zh')
                        }
                      },
                      {
                        text: s2tAsync('确定'),
                        onPress: () => {}
                      }
                    ]
                  )
                }}
              />
            </Flex>
            <Flex.Item>
              <Input
                ref={ref => (urlRef.current = ref?.inputRef)}
                style={[styles.input, styles.inputMultiline]}
                inputStyle={styles.multilineInputStyle}
                defaultValue={url}
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

          {/* 保存 */}
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

        {/* 教程 */}
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
  DEFAULT_PROPS
)
