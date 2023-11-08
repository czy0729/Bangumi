/*
 * @Author: czy0729
 * @Date: 2023-10-21 17:24:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 19:39:49
 */
import React from 'react'
import { ScrollView } from '@components'
import { appNavigate, navigationReference } from '@utils'
import { useMount } from '@utils/hooks'
import { HOST, IMG_DEFAULT } from '@constants'

const cls = 'screen-award-web-view'

function WebView({ source }) {
  useMount(() => {
    setTimeout(() => {
      const parent = document.querySelector(`.${cls}`)

      parent.addEventListener('click', function (event) {
        // @ts-ignore
        if (event.target.closest(`a.${cls}__link`)) {
          event.preventDefault()

          // @ts-ignore
          const dataHref = event.target.closest('a').getAttribute('data-href')
          appNavigate(dataHref, navigationReference())
        }
      })
    }, 2000)
  })

  const __html = source.html
    .replace(/<(script)\b[^<]*(?:(?!<\/(script)>)<[^<]*)*<\/(script)>/g, '')
    .replace(/href="\//g, `href="${HOST}/`)
    .replace(/src="\/img\/no_icon_subject.png"/g, `src="${IMG_DEFAULT}"`)
    .replace(/<a href="/g, `<a class="${`a.${cls}__link`}" data-href="`)
  return (
    <ScrollView>
      <div className={cls} dangerouslySetInnerHTML={{ __html }} />
    </ScrollView>
  )
}

export default WebView
