/* eslint-disable max-len */
/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:04:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:48:18
 */
export const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0"
    />
    <title>请长按图片保存</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: ResourceHanRoundedCN Medium, PingFang sc, BlinkMacSystemFont, -apple-system,
        Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica,
        Arial, sans-serif Verdana, Helvetica Neue, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif,
        WenQuanYi Micro Hei, sans-serif !important;
      }
      img {
        max-width: 100%;
      }
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 300vw;
        height: 300vh;
        filter: blur(60px);
        background-color: #fff;
        transform-origin: center;
      }
      .bg img {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        object-fit: cover;
      }
      .ratio {
        position: relative;
        width: 300vw;
        height: 300vh;
        background: linear-gradient(to right bottom,rgba(255,255,255,0.5),rgba(255,255,255,1));
        transform-origin: top left;
      }
      .container {
        position: relative;
        z-index: 1;
        width: 300vw;
        height: 300vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 12vw 24vw 72vw;
      }
      .cover {
        position: relative;
        z-index: 1;
        width: 180vw;
        height: 255.6vw;
        margin: 0 auto;
        border-radius: 6vw;
        overflow: hidden;
        box-shadow: 6vw 6vw 24vw rgba(0,0,0,0.12);
      }
      .cover img {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        object-fit: cover;
      }
      .title {
        margin-top: 24vw;
        font-size: 16.2vw;
        line-height: 1.5;
        text-align: center;
        font-weight: 400;
      }
      .content {
        margin-top: 9.6vw;
        font-size: 12vw;
        line-height: 1.5;
        font-weight: 300;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box !important;
        word-break: break-all;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }
      .detail {
        margin-top: 8.4vw;
        font-size: 9.3vw;
        line-height: 1.5;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box !important;
        word-break: break-all;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        opacity: 0.64;
      }
      .footer {
        position: absolute;
        z-index: 1;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 42vw;
        background: rgba(255,255,255,0.5);
        box-shadow: 0 3vw 3vw rgba(0,0,0,0.02);
      }
      .footer .logo {
        height: 15vw;
        opacity: 0.9;
      }
      .footer .qr {
        position: absolute;
        top: 50%;
        right: 12vw;
        transform: translateY(-50%);
        opacity: 0.9;
      }
      .footer .qr #canvas {
        width: 27vw !important;
        height: 27vw !important;
      }
      body {
        position: relative;
        width: 300vw;
        height: 300vh;
        background: #fff;
      }
      body.captured {
        width: 100vw;
        height: 100vw;
        background: #fff;
        overflow: hidden;
      }
      body.dark {
        background: #fff
      }
      body.dark .bg {
        background-color: #000;
      }
      body.dark .title,body.dark .content,body.dark .detail {
        color: #fff;
      }
    </style>
    <script src="https://unpkg.com/qrcode@1.4.4/build/qrcode.min.js"></script>
    <script src="https://unpkg.com/dom-to-image@2.6.0/dist/dom-to-image.min.js"></script>
    <script>
      function loadImage() {
        // 获取亮色调还是暗色调
        // const cover = document.getElementById("bg");
        // const canvas = document.createElement("canvas");
        // canvas.width = 1;
        // canvas.height = 1;
        // const ctx = canvas.getContext("2d");
        // ctx.drawImage(cover, 0, 0, 1, 1);
        // const { data } = ctx.getImageData(0, 0, 1, 1);
        // const grayLevel = data[0] * 0.299 + data[1] * 0.587 + data[2] * 0.114;
        // if (grayLevel < 192) document.body.classList.add("dark");

        const url = "$url";
        setTimeout(() => {
          QRCode.toCanvas(
            document.getElementById("canvas"),
            url,
            {
              errorCorrectionLevel: "L",
              type: "image/jpeg",
              quality: 1,
              margin: 2,
            },
            (error) => {
              if (error) return;

              domtoimage
                .toJpeg(document.getElementById("capture"))
                .then((dataUrl) => {
                  const img = new Image();
                  img.src = dataUrl;
                  document.body.appendChild(img);

                  document.querySelector(".bg").remove();
                  document.querySelector(".ratio").remove();
                  document.body.classList.add("captured");

                  setTimeout(() => {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'captured',
                      data: {}
                    }))
                  }, 160);

                  // 长按保存图片
                  let timer = null;
                  let startTime = "";
                  let endTime = "";
                  img.addEventListener("touchstart", () => {
                    startTime = +new Date();
                  });
                  img.addEventListener("touchend", () => {
                    endTime = +new Date();
                    if (endTime - startTime > 600) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'base64',
                        data: {
                          dataUrl,
                        }
                      }))
                    }
                  });
                })
                .catch((error) => {});
            }
          );
        }, 240);
      }
    </script>
  </head>
  <body id="capture">
    <div class="bg">
      <img onload="loadImage()" id="bg" src="$cover" />
    </div>

    <div class="ratio">
      <div class="container">
        <div class="cover">
          <img id="cover" src="$cover" />
        </div>
        <h1 class="title">$title</h1>
        <p class="content">$content</p>
        <p class="detail">$detail</p>
      </div>

      <div class="footer">
        <img
          class="logo"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfcAAACACAMAAAAh+9DYAAAArlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeyFOlAAAAOXRSTlMAwEDr5UcV+/PHLe+sCRADzQymoHogZ4NxGffVsiT12V3Rm2JOjolsS7iWWDcG4Nx/Uzy9dSiSHTJr/rfkAAAMSklEQVR42uzay04CURCE4ZLbTLg4AgKKiIICAoGg4qXe/8V03Z2Yicks+qS+N6hFb/40RERERH7NaDUKSOru6dxAkjeklfchqbvNaK0gyVvTyr4gqevntLqQ5J3pvEGcmtVGZEWd1gLiPNMaI7InOnuIc0Wjc0BkD2o2ZdRonRDZC50zxNnSmF4isgtaczUbr01rici+6XxCnAGtESLrMrFB1RhlNGaIbJQxrUEV2SWWOHZqNmW0pmkljtZUzaaMSWKJY0LnEWL187QSR69Dqx56UEXOtDaIbEPnGmId6jTyHgIrGrTmsSNUNca01ohsT2cHsYojjayFyBZqNmW80hoishrVbP53Hh+IbEunBrGatLaIrE3nDuK802oisiGd48WfZoPl6rSP/VX2w8257qYNBFEYxw43X6AYl4uLCVAgBAcIEZd5/xer1B+NwuITc3ZSKfl+VipW7J3dM2dnRuHCsl35ypyEZhzPBh97Qud19xj/cj5mFUyPvVkeVjCBcyurID4ulnd24jv4Zo7mXKxIuwMkgY8TuZlNsDyguiAa/3W312sh8ypfmagutgSjgkjve8LizYsyyYZYUQ+4U3n6zarQumJPNrsamJ5Y4VyNzb1Y4/WJFjJzAX1tR9MTDeZALvL0cKc2j3OybyHzHYru28lxd0nONG2EZNG8Dg9ABvGscNLJ4ze509CePQiMBpF8zdmieSVGoPyQZ4HLGnm2EXMa2tNGdllwu8qI2Z4fLaZK2wi2RhIhsez4dEV/X2zf3nT+pNW32hA1qpU3kroo0QB/uB1N/gKWx4PKalnBzLWM4r3osYaajibHZYA8MXMBy2NWs9Tkkpcbi+EaIT3GSI8empvBs8CqmqdO1CfwmC1VkRicbyvySn/QHpQiHWQB8vwCZY12nNgLWJ4n/PKhkdw3pGmVL5pXpPM5n2eLBzNkzj9SuWDy918zIBnLcS8k8L4+BztQGYnhneyK5k38sVNEw8OJ6dvnMalvi392UyqF9+Ax0CkoEVz/+3FyUpejtnfhVCq9xWdxRxWWnVzBXSQVRDItSEyxBTiMsX6OFiAqQXI4MJxUMytKfMEWIyYXLe5AAGN1vqaNJ5PQFZNFWKKIHMv5BzHpVEkrIcUe0xSIihN2XZL/Ln4n2AqSafnKvizXrAoWt9Qq8sXEgyroN+0lzPDCGBmi4prOPBC+DfrPwR3F+5V2LN+y8Kha6bM1D/Yz2QIu0kUq6Dfthbp4XXTALnTGeUtuMcNz8DmN9A+ldeWL1Vgmdi5TChPTV3Z+QoxNgT3y3MxhXK84b2lYzPDsa5fr4WLW/RBsghoWrfdMe/pTcGE2LBce1ZoYDKvGMVvwbWdgJ4yGYrDmy5EmLeWqbKw48kx13eXC9vhNYGLaYVtvFviyp4n1cQr04E4MNqVz3Qw8VbnwoXKNcx3sgSplgi4f7quLbZEYcRvWsc8Rw9TxHhxZoS/8Vr0DT7WjXL1e09ftYEvoY6sNk+w5O+5piT2bQU2QunHAKMGlhWcT+lik8lRLSY6DC6SsjkXrhnS4b9+yqYwM95aHPZu5GIxBbXvP+GXOs+mDp9pxkBJfdOQalp+duIgytjy0LSgP6LLXnS/Ys4kymNoHQA+uxaA24BvEH1SbEnFPdWI83gFnMXds+Xy4u8/FgwFqI74A5CeUZl6r+NCaYhna4asPNy3N5lqcRQ82Whfuxd9Huny4L8B76hAFIKbOfMbS7AnowXubUpsxk/OweubxUgEYT08j9cEN/g863GtV8J5KhnuAPZuloP2pOgQXHCsLz+YFrEVbdh+txijVuXDH63hHhLsR0o9suCd4ObU2cFX0gB5sivAuZ5vYFXlhHb7/7BOdC3cctXU+3KUJLqoPfAFIDKVZFhXnWmN8l7BtUdILvyZ7/8T/w96ZbakJBGG4ETAD7hviqOM2cYnG3cR+/xfL7STgN56yPImG73bOgDRUd/VfS5uP1Kp6AXd4P225uQdgW0Xx7sLaE7pmX2GvNeFt/0zeD2Jq1HAwSlsKEp9caG4lpFovNnecNYtSc99a1N593IlVPFiDf1grbj0WQrjgdrqUjFNyErfeK0wxmubuVQStmpO7C/JuD7gIDBOuCk8kU/kwfTN6uBC1/H5IfOf+PVpPc7M6rjw/gm2dzVVMOJ0y5KqsAeQqN9NmCvEwfWkZPWAgK73EnXdGDLyfqdzc32qXbWtxQ41ehK5ZERaBMU8kdXnBe8Pokb8cGa4UQZrUlGjf8nJz/wG2tTLi67rfKYJkz+Aftbi8KZQnG/eNHuHF0arU77N7bEqjFFXMTkza1kGceGJtG/d4DkRkelze5MgL3ntGkdzFzOAGvx+5RCvMh5lzRngkNfcwVbPBJH8fnK8cx3re5Wemno0iy8Qj33l5mUjT36qcEb6RWladNZu2TTAC52vEv3gjmBXheRTl+c0l56tYMRoMNM29C1v7nCG4hjLENJwlLAJDbL9qZ/LAlW9uBz5n58LqstB57XPpprTK2e2BNPgxZc0mthQKzb/CaQk9DOYwM4VjVwSNK7aWI69yDsJ8mLlFr3uF5sHraJI5JstEYDVNTppvy/MtdkaVYtpPOya/ttpfPu2wyiXvRWn2YcyazRC3eKUXEKAa6C4yydsOKkaVIGXqnCXvqiUM1+XmTsPYSjFZeVpdhJLOET6ab+w3NAROkJ5ywnfwU3ZE646Rw05UQ2Duyf/9hubO2xlK8JxjKmzFA83m6w2azRyiEHK4xvA0TA6Emi78VZj+5nNnoPKrdJs84kXYwb8mRqrHfsNBnm8RG2WSEwr02FPoRSs2dxrGrdT5zVksaV9x26wunHB5RHeR2cMUpETHAlDqLONIAXI2d5K+SgWp89tjzaaHZ1T7tLi4IDb0c0lC/FVbo8zZAupHfniyMrFalxvPRJAqhpw4bevEzYgOoOdMyF3csKATQrWvELYksCoVhhTYYqvEkdpIiwvGrNmMMYq6ovqyLriLc8uFU3VxYET+KvTLM3gwBv3PrX1h0yjUIPzh7q+LQeMi3GGPvAgbvHdyFxfc7KalNeWybMFEd59b6v6pRu/m0tkBU+5PstiFeUla3QAV3B7IcS9lrr7J0+LSx5S8rdGmbZGmUaTO7uNLoeC6nrdebzaDbndUrQZB4Iw+7/q3uuqy3m+XdardtWvTiLD19x4iMl+5A9WYcrZ73Nxt0zHKjC2gvK64VpExWa0ct0TXDWiNaHH1TUg527lPZsW1tlzX47FN5V9oSvqW12hpTTNqrYAb8Dak3PXJXYwhnEytmjdOkkhFnocn0SCn/n70p5HXMqXCDqg7xp4n0XcMCMDeEnDLCr3EIOCug2/1CEBx1OnbW3JxbxPTEkBiw85+EpUv2auZ68jz+gF3FknkrD9+6G9WjxbnW0BEZsmZHDH1mp3KutHWjZjvNgkH3OWUXq0SXh9VATlF7HE7A9ljbdAxeCnTsUQ/QcymWV75jE4OuMtpWB1GeYjxKZ0tMbNYej6AeFlMWf6Nz/2ommevYnkHed7rGH1ObzpGWbrXPsFBc2+Cq1KocTfsPimE+wvdDpievq/Fpc5yfIXjP7o50ByFJEMRESvoTkLoYOV7QS1wq6IHKuQV5HkodVZl79361idah6uxRLtG5+tMK3SX+qF5GAGBz045bnLEkxv0yY9frZx6zqTjF6wCEZpDB+S4Os+gXczqStW4AssczE1MheeeyKnNeqKX5LT9Gl11ZG/FvfaAgT5VZB3ogwquT60O48ULnEX1U9/F3pl7Ey6bjcPVB+a3493qisdsLb9VX3SOVls5ST54PJHzB+MPG6S0hyhRBKkD4zSbjoupAzU0t9FOu+QDk1/Nh7PmdrttNpvHYxzHs1kURZPJZDgcLpe73e79fT73fT830+4hIq/EywC0qUPinC7c4N6eTYYC8h4iHZPx9PxIEbsznp6Ugz9Ck/H0tFNUz4ynp1RIkaoynp44RSPPeHryXkpEJuPZ+R6kRGQynp5iWpucjCentUhtbZzx3BxfU5MeM56ZctO9UGGZ8ayU/WbxzabSNhmPQc4q4pZMxmMQWEUik/EYqJp7YDIeBE1zL2Rx90fBt3IyhfZxCbLF/X9EZu7ZFu7R0TP3L5lQ9zjombu3MhkPw68JUCuzq44Ozw4hQKXszq01upBySAGKs7ucHqeQCCvDKBgFo2AUjIJRMApGwSggGgAAXAy50xGpkLgAAAAASUVORK5CYII="
          alt=""
        />
        <div class="qr">
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </div>
  </body>
</html>
`
