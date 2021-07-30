# SPA 部落格
 一個串接 Lidemy API 的部落格系統，註冊用戶可以檢視、新增、編輯及刪除文章。
 
 [DEMO](https://bryan9411.github.io/react_blog/#/)
 
 [Lidemy API](https://lidemy-api.herokuapp.com/)
 
## 技術

* React 搭配 React-router，建立具備會員系統的部落格
* react-router-dom 路由導向
* Token 機制建立登入登出系統
* 使用 CSS 框架 `bulma` 來撰寫 css 且支援 RWD
* 使用 funciton component 及 hooks
* Axios 串接 API
## 功能描述
* 註冊/登入功能，密碼統一預設「Lidemy」，方便 D
* 顯示所有文章列表
* 點擊顯示單頁文章內容（標題、發文時間以及文章內容）
* 發佈文章功能：登入狀態下，顯示發布文章的頁面按鈕，點擊顯示新增頁面 Modal，輸入標題及內容即可新增文章
* 編輯功能：登入狀態下顯示編輯按鈕，點擊顯示編輯頁面 Modal，輸入內容即可編輯文章
* 刪除功能：登入狀態下顯示刪除按鈕
* Dark Modal ：點擊切換按鈕可以切換暗黑模式
