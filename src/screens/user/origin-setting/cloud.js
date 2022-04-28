/*
 * @Author: czy0729
 * @Date: 2022-04-12 11:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 18:06:35
 */
import React, { useState } from 'react'
import { ItemSettingBlock } from '@_'
import { _, userStore, subjectStore } from '@stores'
import { info, confirm, loading, feedback } from '@utils/ui'
import { useMount } from '@utils/hooks'
import { read } from '@utils/db'
import i18n from '@constants/i18n'

const Cloud = ({ onDownloaded }) => {
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

              if (flag) onDownloaded()
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
            })
          }, 160)
        }}
      />
    </ItemSettingBlock>
  )
}

export default Cloud

const styles = _.create({
  container: {
    paddingHorizontal: 0,
    marginBottom: _.lg
  }
})
