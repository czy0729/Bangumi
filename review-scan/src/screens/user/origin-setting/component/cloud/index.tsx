/*
 * @Author: czy0729
 * @Date: 2022-04-12 11:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 20:52:02
 */
import React from 'react'
import { Divider, SwitchPro } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, subjectStore, systemStore } from '@stores'
import { confirm, feedback, info, loading } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import { getYuqueThumbs } from '../../utils'
import { useCloud } from './hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

const Cloud = ({ isLogin, active, onToggle, onDownloaded }) => {
  r(COMPONENT)

  const text = useCloud()

  return useObserver(() => {
    const { focusOrigin, showLegalSource } = systemStore.setting
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
            information={text ? text : !isLogin && `需${i18n.login()}`}
            onPress={() => {
              if (!isLogin) return info(`下载需先${i18n.login()}`)

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
            information={!isLogin && `需${i18n.login()}`}
            onPress={() => {
              if (!isLogin) return info(`上传需先${i18n.login()}`)

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
        <ItemSetting
          style={styles.item}
          contentStyle={styles.content}
          hd='突出显示源头按钮'
          ft={
            <SwitchPro
              style={styles.switch}
              value={focusOrigin}
              onSyncPress={() => {
                t('设置.切换', {
                  title: '突出源头按钮',
                  checked: !focusOrigin
                })

                systemStore.switchSetting('focusOrigin')
              }}
            />
          }
          thumb={getYuqueThumbs([
            '0/2024/png/386799/1705044747998-45792520-30b5-4079-8889-1eb471b977b1.png',
            '0/2024/png/386799/1705044615611-9e2bf83f-d563-4e85-89c8-5a1136a08e6d.png'
          ])}
        />

        {/** 显示正版播放源 */}
        <ItemSetting
          style={styles.item}
          contentStyle={styles.content}
          hd='显示正版播放源'
          information='若有正版播放数据，会在源头选项底部插入 acfun、bilibili、qq、iqiyi、netflix 等播放源头（数据来源自 bangumi-data）'
          ft={
            <SwitchPro
              style={styles.switch}
              value={showLegalSource}
              onSyncPress={() => {
                t('设置.切换', {
                  title: '显示正版播放源',
                  checked: !showLegalSource
                })

                systemStore.switchSetting('showLegalSource')
              }}
            />
          }
        />

        {/* 显示所有项 */}
        <ItemSetting
          style={styles.item}
          contentStyle={styles.content}
          hd='显示所有项'
          ft={
            <SwitchPro key={active} style={styles.switch} value={active} onSyncPress={onToggle} />
          }
        />
        <Divider />
      </>
    )
  })
}

export default Cloud
