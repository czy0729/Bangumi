/*
 * @Author: czy0729
 * @Date: 2026-11-07 02:35:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 19:05:02
 *
 * 列表空态: 区分未检查 / 未登录 / 已登录无数据
 */
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { useInsets } from '@utils/hooks'
import Btn from '../btn'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function ListEmpty() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight } = useInsets()

  const styles = memoStyles()

  const { isLogin, hide } = $.state

  return (
    // 空态区从头部下方开始, 补一个头部高度让内容在整屏视觉居中
    <Flex
      style={stl(styles.empty, {
        paddingBottom: headerHeight
      })}
      direction='column'
      justify='center'
    >
      <Iconfont name='md-person-outline' size={56} color={_.colorSub} />

      {isLogin === true ? (
        <>
          <Text style={_.mt.md} size={16} type='title' bold align='center'>
            已登录 bilibili，但没有读取到数据
          </Text>
          <Text style={_.mt.sm} size={12} type='sub' align='center'>
            请打开登录框后重新获取，或确认账号下有追番记录
          </Text>
        </>
      ) : isLogin === false ? (
        <>
          <Text style={_.mt.md} size={16} type='title' bold align='center'>
            还没有登录 bilibili，暂未获取到数据
          </Text>
          <Flex style={_.mt.sm} direction='column' align='start'>
            <Text size={13} type='sub'>
              ①: 点击下方按钮打开登录框
            </Text>
            <Text style={_.mt.xs} size={13} type='sub'>
              ②: 在打开的网页内登录 bilibili 账号
            </Text>
            <Text style={_.mt.xs} size={13} type='sub'>
              ③: 登录后等待数据自动读取
            </Text>
          </Flex>
        </>
      ) : (
        <>
          <Text style={_.mt.md} size={16} type='title' bold align='center'>
            还没有获取到 bilibili 追番数据
          </Text>
          <Text style={_.mt.sm} size={13} type='sub' align='center'>
            打开登录框后会自动检查登录状态并读取数据
          </Text>
        </>
      )}

      {hide && (
        <Btn
          style={styles.loginBtn}
          text={
            isLogin === true ? '重新获取数据' : isLogin === false ? '登录 bilibili' : '打开登录框'
          }
          size={13}
          onPress={$.onToggleHide}
        />
      )}
    </Flex>
  )
}

export default observer(ListEmpty)
