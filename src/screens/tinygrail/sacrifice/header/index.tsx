/*
 * @Author: czy0729
 * @Date: 2022-11-11 05:52:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:21:20
 */
import React from 'react'
import { HeaderV2, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <HeaderV2
      backgroundStyle={_.container.tinygrail}
      headerTitleStyle={styles.headerTitle}
      title={$.name ? $.name : '资产重组'}
      headerTitleAlign='left'
      hm={[`tinygrail/sacrifice/${$.monoId}`, 'TinygrailSacrifice']}
      headerRight={() => (
        <>
          <Touchable
            style={styles.touch}
            onPress={() => {
              const { form, monoId } = $.params
              t('资产重组.跳转', {
                to: 'TinygrailDeal',
                monoId: $.monoId
              })

              if (form === 'deal') {
                navigation.goBack()
                return
              }

              navigation.push('TinygrailDeal', {
                monoId,
                form: 'sacrifice'
              })
            }}
          >
            <Iconfont name='md-attach-money' color={_.colorTinygrailPlain} />
          </Touchable>
          <Touchable
            style={styles.touch}
            onPress={() => {
              const { form, monoId } = $.params
              t('资产重组.跳转', {
                to: 'TinygrailTrade',
                monoId: $.monoId
              })

              if (form === 'trade') {
                navigation.goBack()
                return
              }

              navigation.push('TinygrailTrade', {
                monoId,
                form: 'sacrifice'
              })
            }}
          >
            <Iconfont name='md-waterfall-chart' size={20} color={_.colorTinygrailPlain} />
          </Touchable>
          <Touchable
            style={[styles.touch, _.mr.xs]}
            onPress={() => {
              const { monoId } = $.params
              open(`https://fuyuake.top/xsb/chara/${monoId?.replace('character/', '')}`)
            }}
          >
            <Iconfont name='icon-link' size={19} color={_.colorTinygrailPlain} />
          </Touchable>
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
