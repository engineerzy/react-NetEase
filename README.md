<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996.icu" /></a>

## 技术栈
react+typescript+webpack
没有使用第三方状态管理工具，感觉用不上;
webpack脚手架自己搭建，也是为了学习更好的使用webpack来优化项目；

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | ✔ | ✔ | ✔ | ✔ | No |

#### babel
放弃ts-loader加happypack 因为ts-loader版本的原因导致happypack打包失败，提示webpack版本最少4.x
其实并不是webpack版本的原因，而是ts-loader版本的原因
参考 [两个小优化，webpack打包速度飞起来](https://juejin.im/post/5cc81368518825750351a50f)

