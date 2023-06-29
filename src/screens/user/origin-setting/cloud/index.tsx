/*
 * @Author: czy0729
 * @Date: 2022-04-12 11:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-29 17:45:13
 */
import React, { useState } from 'react'
import { Flex, Divider, Text, SwitchPro } from '@components'
import { ItemSettingBlock } from '@_'
import { _, userStore, subjectStore, systemStore } from '@stores'
import { info, confirm, loading, feedback } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { read } from '@utils/db'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { styles } from './styles'

const Cloud = ({ active, onToggle, onDownloaded }) => {
  const [settingLen, setSettingLen] = useState(0)
  useMount(() => {
    setTimeout(async () => {
      try {
        const { id } = userStore.userInfo
        if (!id) return

        const { content } = await read({
          path: `origin/${id}.json`
        })

        if (content?.length) setSettingLen(content.length)
      } catch (error) {}
    }, 2400)
  })

  return useObserver(() => {
    const { focusOrigin } = systemStore.setting
    return (
      <>
        {/* 同步设置 */}
        <ItemSettingBlock style={styles.container} title='同步设置' size={20}>
          <ItemSettingBlock.Item
            icon='md-ios-share'
            iconStyle={{
              transform: [
                {
                  rotate: '180deg'
                }
              ]
            }}
            title='下载'
            information={
              settingLen
                ? `${(settingLen / 1000).toFixed(1)} kb`
                : (!userStore.isLogin || !userStore.userInfo.id) && `需${i18n.login()}`
            }
            onPress={() => {
              if (!userStore.isLogin || !userStore.userInfo.id) {
                return info(`下载需先${i18n.login()}`)
              }

              setTimeout(() => {
                confirm('确定恢复到云端的设置?', async () => {
                  const hide = loading('下载中...')
                  const flag = await subjectStore.downloadOrigin()
                  hide()
                  feedback()
                  info(flag ? '已恢复' : '下载失败')
                  if (flag) {
                    onDownloaded()
                    t('自定义源头.下载')
                  }
                })
              }, 160)
            }}
          />
          <ItemSettingBlock.Item
            style={_.ml.md}
            icon='md-ios-share'
            title='上传'
            information={
              (!userStore.isLogin || !userStore.userInfo.id) && `需${i18n.login()}`
            }
            onPress={() => {
              if (!userStore.isLogin || !userStore.userInfo.id) {
                return info(`上传需先${i18n.login()}`)
              }

              setTimeout(() => {
                confirm('确定上传当前设置到云端?', async () => {
                  const hide = loading('上传中...')
                  const flag = await subjectStore.uploadOrigin()
                  hide()
                  feedback()
                  info(flag ? '已上传' : '上传失败，云服务异常，请待作者修复')
                  if (flag) {
                    t('自定义源头.上传')
                  }
                })
              }, 160)
            }}
          />
        </ItemSettingBlock>

        {/* 突出显示源头按钮 */}
        <Flex style={styles.setting}>
          <Flex.Item>
            <Text size={15} bold>
              突出显示源头按钮
            </Text>
          </Flex.Item>
          <SwitchPro
            style={styles.switch}
            value={focusOrigin}
            onSyncPress={() => {
              t('设置.切换', {
                title: ' 突出源头按钮',
                checked: !focusOrigin
              })

              systemStore.switchSetting('focusOrigin')
            }}
          />
        </Flex>

        {/* 显示所有项 */}
        <Flex style={styles.setting}>
          <Flex.Item>
            <Text size={15} bold>
              显示所有项
            </Text>
          </Flex.Item>
          <SwitchPro
            key={active}
            style={styles.switch}
            value={active}
            onSyncPress={onToggle}
          />
        </Flex>
        <Divider />
      </>
    )
  })
}

export default Cloud
