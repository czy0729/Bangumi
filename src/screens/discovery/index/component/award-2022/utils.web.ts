/*
 * @Author: czy0729
 * @Date: 2023-12-10 22:53:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-10 22:53:52
 */
export function getHtml(width: number, height: number) {
  return `
  <style>
    .award2022 * {
      padding: 0;
      margin: 0;
    }
    .award2022 {
      box-sizing: border-box;
      position: relative;
      width: ${width}px;
      height: ${height}px;
      padding: 0;
      margin: 0 0 10px 0;
      line-height: 100%;
      background: #fff;
      border: none;
    }
    .award2022 .wrap {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      color: #fff;
      background-color: transparent;
    }
    .award2022 .header {
      margin: 30px auto;
      text-indent: -9999px;
      font-size: 0;
      line-height: 100%;
      background: url(https://bgm.tv/img/event/2022/title.png);
      width: 80%;
      max-width: 860px;
      max-height: 120px;
      aspect-ratio: 860 / 120;
      background-size: 100% auto;
      background-repeat: no-repeat;
      z-index: 3;
      position: relative;
    }
    .award2022 .heroes {
      position: absolute;
      width: 168px;
      height: 85px;
      background-image: url(https://bgm.tv/img/event/2022/heroes_s.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      bottom: 0;
      z-index: 2;
    }
    .award2022 .oceanCanvas {
      position: absolute;
      overflow: hidden;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .award2022 .oceanCanvas div {
      position: absolute;
      overflow: hidden;
    }
    .award2022 .oceanCanvas .sea {
      height: 30%;
      width: 200%;
      left: -50%;
      top: 40%;
      border-radius: 0 0 50% 50%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 75%,
        rgba(235, 233, 234, 1) 100%
      );
      animation: waveanim ease-in-out 10s;
      animation-iteration-count: infinite;
      transform-origin: 50% 0%;
      overflow: hidden;
    }
    .award2022 .oceanCanvas .sand {
      height: 35%;
      width: 100%;
      background: rgb(248, 247, 245);
      top: 65%;
      border-radius: 0 0 15px 15px;
    }
    .award2022 .oceanCanvas .sand-front {
      height: 10%;
      width: 100%;
      background: rgb(248, 247, 245);
      top: 90%;
      border-radius: 0 0 15px 15px;
    }
    .award2022 .oceanCanvas .wet-sand {
      height: 37.5%;
      width: 200%;
      left: -50%;
      top: 40%;
      border-radius: 0 0 50% 50%;
      background: rgb(237, 233, 227);
      box-shadow: 0 10px 10px 0 rgb(241, 238, 234);
      animation: wetsandanim ease-in-out 10s;
      animation-iteration-count: infinite;
    }
    .award2022 @keyframes waveanim {
      0% {
        transform: scaleY(1);
      }
      35% {
        transform: scaleY(1.3);
      }
      69% {
        transform: scaleY(1);
      }
      100% {
        transform: scaleY(1);
      }
    }
    .award2022 @keyframes wetsandanim {
      0% {
        opacity: 0.2;
      }
      34% {
        opacity: 0.2;
      }
      35% {
        opacity: 0.7;
      }
      100% {
        opacity: 0.2;
      }
    }
    .award2022 @keyframes seafoamanim {
      0% {
        opacity: 0;
      }
      30% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
  </style>
  <div class="award2022">
    <div class="wrap">
      <div class="oceanCanvas">
        <div class="sand"></div>
        <div class="wet-sand"></div>
        <div class="sea">
          <div class="seafoam"></div>
        </div>
        <div class="seafoam"></div>
        <div class="sea">
          <div class="seafoam"></div>
        </div>
        <div class="sand-front"></div>
      </div>
      <div class="heroes"></div>
      <div class="header"></div>
    </div>
  </div>`
}
