/*
 * @Author: czy0729
 * @Date: 2022-10-17 11:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:42:12
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { info, open, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST_DB, HOST_DB_M } from '@constants'
import { Ctx } from '../../types'
import Btn from '../../../bilibili-sync/component/btn'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Login() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { doubanId, hide, data, progress } = $.state
  return (
    <>
      {!hide && <View style={styles.mask} />}
      <View style={stl(styles.fixed, hide && styles.hide)}>
        <View style={styles.user}>
          <Input
            style={styles.input}
            defaultValue={doubanId}
            multiline
            numberOfLines={3}
            placeholder='输入豆瓣用户空间地址或用户的豆瓣 ID'
            onChangeText={$.onChange}
          />
          <Flex style={_.mt.md}>
            <Text size={15} bold>
              {$.doubanId ? `匹配到豆瓣ID：${$.doubanId}` : '未匹配到豆瓣ID'}
            </Text>
            {!!$.doubanId && (
              <IconTouchable
                name='md-open-in-new'
                size={18}
                onPress={() => {
                  open(`${HOST_DB_M}/people/${$.doubanId}/`)

                  t('豆瓣同步.检查')
                }}
              />
            )}
          </Flex>
          {!!data.list.length && (
            <Text style={_.mt.md} bold>
              当前已获取 {data.list.length} 个影视收藏，其中 {$.matchCount} 个条目匹配 bgm.tv
              数据成功。
            </Text>
          )}
        </View>
        <View style={styles.body}>
          <Text style={_.mt.sm} size={13} type='sub'>
            请务必准确填写您的豆瓣用户空间地址或豆瓣 ID。例如: {HOST_DB}/people/123456 或 123456。
          </Text>
          <Text style={_.mt.sm} size={13} type='sub'>
            网页版: 右上方 → 个人主页 → 复制网页地址。
          </Text>
          <Text style={_.mt.sm} size={13} type='sub'>
            豆瓣客户端: 底部菜单我 → 左上方菜单 → 点击头像 → 豆瓣ID。
          </Text>
          <Text style={_.mt.md} size={13} type='sub'>
            请知悉，因收录规则不同，绝大部分豆瓣条目不在 bgm.tv 收录范围内。
          </Text>
          <Text style={_.mt.md} size={13} type='sub'>
            此功能目前为实验性质，仅获取用户想看、在看、看过的影视条目，未来可能会逐步扩大到书籍和游戏。
          </Text>
          <Text style={_.mt.sm} size={13} type='sub'>
            自己主动隐藏的条目不能获取。请勿过度获取数据，可能会被豆瓣封 IP 几个小时。
          </Text>
          <Flex style={_.mt.lg} justify='center'>
            <Btn
              style={styles.btn}
              btnStyle={styles.btnStyle}
              text='重新获取数据'
              size={13}
              loading={progress.fetching}
              onPress={() => {
                if (progress.fetching) {
                  info('已在获取中...')
                  return
                }

                $.fetchDouban()
                t('豆瓣同步.获取数据')
              }}
            />
            <Btn
              style={[styles.btn, _.ml.md]}
              btnStyle={styles.btnStyle}
              text='收起窗口'
              size={13}
              onPress={$.onToggleHide}
            />
          </Flex>
        </View>
      </View>
    </>
  )
}

export default ob(Login, COMPONENT)
