/*
 * @Author: czy0729
 * @Date: 2022-04-12 11:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-11 05:27:28
 */
import React, { useState } from 'react'
import { Flex, Text, SwitchPro } from '@components'
import { ItemSettingBlock } from '@_'
import { _, userStore, subjectStore } from '@stores'
import { info, confirm, loading, feedback } from '@utils/ui'
import { useMount } from '@utils/hooks'
import { read } from '@utils/db'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'

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

  return (
    <>
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
    </>
  )
}

export default Cloud

const styles = _.create({
  container: {
    paddingHorizontal: 0,
    marginBottom: _.md
  },
  setting: {
    marginBottom: 40
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  }
})
