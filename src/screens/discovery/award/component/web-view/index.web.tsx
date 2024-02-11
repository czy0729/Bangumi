/*
 * @Author: czy0729
 * @Date: 2023-10-21 17:24:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 17:19:13
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
    }, 4000)
  })

  const __html = source.html
    .replace(/<(script)\b[^<]*(?:(?!<\/(script)>)<[^<]*)*<\/(script)>/g, '')
    .replace('<link rel="preconnect" href="https://fonts.googleapis.com">', '')
    .replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>', '')
    .replace(
      '<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;900&display=swap" rel="stylesheet">',
      ''
    )
    .replace(/href="\//g, `href="${HOST}/`)
    .replace(/src="\/img\/no_icon_subject.png"/g, `src="${IMG_DEFAULT}"`)
    .replace(/<a href="/g, `<a class="${`${cls}__link`}" data-href="`)
  return (
    <ScrollView>
      <div className={cls} dangerouslySetInnerHTML={{ __html }} />
    </ScrollView>
  )
}

export default WebView
