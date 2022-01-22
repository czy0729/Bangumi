/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-21 17:03:56
 */
import React, { useState, useCallback, useEffect } from 'react'
import { ActionSheet, Flex, Text, SwitchPro, Heatmap } from '@components'
import { ItemSetting, ItemSettingBlock, Cover } from '@_'
import { _, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { t, ping } from '@utils/fetch'
import { info } from '@utils/ui'
import { MODEL_SETTING_CDN_ORIGIN } from '@constants/model'
import styles from './styles'

const URL_LAIN = 'https://lain.bgm.tv/pic/cover/c/fa/1d/25833_kZIjD.jpg'
const URL_JSDELIVR =
  'https://cdn.jsdelivr.net/gh/czy0729/Bangumi-OSS@master/data/subject/c/t/TfOdAB.jpg'
const URL_ONEDRIVE = 'https://bangumi.stdcdn.com/subject/c/t/TfOdAB.jpg'
const IMG_WIDTH = parseInt((_.window.contentWidth - 2 * _.md) / 3)
const IMG_HEIGHT = parseInt(IMG_WIDTH * 1.44)

function CDN() {
  const [show, setShow] = useState(false)
  const [test, setTest] = useState(false)
  const [pings, setPings] = useState([])
  const setTrue = useCallback(() => setShow(true), [])
  const setFalse = useCallback(() => setShow(false), [])
  useEffect(() => {
    if (test && !pings.length) {
      const data = []
      async function cb() {
        data.push(await ping(URL_LAIN))
        data.push(await ping(URL_JSDELIVR))
        if (systemStore.advance) data.push(await ping(URL_ONEDRIVE))
        setPings(data)
      }
      cb()
    }
  }, [test, pings])

  return useObserver(() => {
    const { cdn, cdnOrigin, cdnAvatar } = systemStore.setting
    const origin = MODEL_SETTING_CDN_ORIGIN.getLabel(cdnOrigin)
    const label = []
    if (cdn) {
      label.push('开启')
      if (!cdnAvatar) label.push('自定义规则')
    } else {
      label.push('关闭')
    }
    return (
      <>
        <ItemSetting
          hd='CDN加速'
          ft={
            <Text type='sub' size={15}>
              {label.join('、')}
            </Text>
          }
          arrow
          highlight
          onPress={setTrue}
        />
        <ActionSheet height={560} show={show} onClose={setFalse}>
          <ItemSettingBlock
            style={_.mt.sm}
            title='封面加速'
            information='使用特定CDN域名加速访问'
          >
            <ItemSettingBlock.Item
              title='lain.bgm.tv'
              information={'不使用加速\n稳定但没清晰度加成'}
              active={!cdn}
              onPress={async () => {
                if (!cdn) return

                t('设置.切换', {
                  title: 'CDN加速',
                  checked: !cdn,
                  origin: 'lain.bgm.tv'
                })

                systemStore.switchSetting('cdn')
              }}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='jsDelivr'
              information={'免费开放\n国内部分地区不稳定'}
              active={cdn && origin === 'jsDelivr'}
              onPress={async () => {
                if (cdn && origin === 'jsDelivr') return

                t('设置.切换', {
                  title: 'CDN加速',
                  checked: !cdn,
                  origin: 'jsDelivr'
                })

                if (!cdn) systemStore.switchSetting('cdn')
                systemStore.setSetting(
                  'cdnOrigin',
                  MODEL_SETTING_CDN_ORIGIN.getValue('jsDelivr')
                )
              }}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='OneDrive'
              information={'高级会员开放\n作者私有付费空间'}
              active={cdn && origin === 'OneDrive'}
              onPress={async () => {
                if (cdn && origin === 'OneDrive') return
                if (!systemStore.advance) return info('此域名仅对高级会员开放')

                t('设置.切换', {
                  title: 'CDN加速',
                  checked: !cdn,
                  origin: 'OneDrive'
                })

                if (!cdn) systemStore.switchSetting('cdn')
                systemStore.setSetting(
                  'cdnOrigin',
                  MODEL_SETTING_CDN_ORIGIN.getValue('OneDrive')
                )
              }}
            />
            <Heatmap id='设置.切换' title='CDN加速' />
          </ItemSettingBlock>
          <ItemSetting
            hd='头像加速'
            ft={
              <SwitchPro
                style={styles.switch}
                value={cdn && cdnAvatar}
                disabled={!cdn}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '头像加速',
                    checked: !cdnAvatar
                  })

                  systemStore.switchSetting('cdnAvatar')
                }}
              />
            }
            information='其他用户头像使用清晰快照，但不会实时更新'
          />
          <ItemSettingBlock style={_.mt.md} title='测试样例'>
            {test ? (
              <>
                <Flex.Item>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={URL_LAIN}
                      cdn={false}
                      radius
                    />
                    <Text style={_.mt.xs} type='sub' size={10} align='center'>
                      lain.bgm.tv: {pings[0] || 0}ms
                    </Text>
                  </Flex>
                </Flex.Item>
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={URL_JSDELIVR}
                      radius
                    />
                    <Text style={_.mt.xs} type='sub' size={10} align='center'>
                      jsDelivr: {pings[1] || 0}ms
                    </Text>
                  </Flex>
                </Flex.Item>
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={URL_ONEDRIVE}
                      radius
                    />
                    <Text style={_.mt.xs} type='sub' size={10} align='center'>
                      OneDrive: {pings[2] || 0}ms
                    </Text>
                  </Flex>
                </Flex.Item>
              </>
            ) : (
              <Text
                style={styles.test}
                size={12}
                type='sub'
                onPress={() => setTest(true)}
              >
                各资源域的图片质量和访问速度，
                <Text size={12} type='warning'>
                  点击测试
                </Text>
              </Text>
            )}
          </ItemSettingBlock>
        </ActionSheet>
      </>
    )
  })
}

export default CDN
