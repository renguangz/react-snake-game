網址：https://react-snake-game-eight.vercel.app/

### 資料邏輯

#### Board 邏輯

> - 二維陣列，貪吃蛇佔據的格子為 `1`，果實的位置為 `2`，其他為 `0`
> - 到了畫面上做 `array.flat().map()` 先攤平在 mapping 放進 `grid` 容器
> - 蛇移動的新位置，如果是出界或是 `1` (若是前一次的尾巴的位置不算) 則結束遊戲，如果是 `2` 則更新 snake 資料如下

![截圖 2024-07-23 凌晨12 22 47](https://github.com/user-attachments/assets/948608ea-1ff6-4786-864a-e8dcd99a3d23)

#### Snake 邏輯

![截圖 2024-07-23 凌晨12 18 02](https://github.com/user-attachments/assets/27b9ff3f-3d78-49fd-9e2f-230d4e4e47ae)

### 監聽器

> - window event listener 監聽 keydown 事件，判斷是否可以改變方向 (如果蛇的長度超過 1，則不能回頭)
> - setInterval 每 500ms 移動一次位置
> - 如果遊戲結束，取消監聽 keydown & clearInterval，等到按下 replay 再重新掛載

### 其他

> - 手機版：未實作，目前猜想會有上下左右鍵顯示在畫面上，如果按下去則改變位置，其餘邏輯不變
> - 使用 NextJs，部署在 Vercel
