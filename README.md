# unfollow-notification

昔あった某めか○○るみたいなやつ。

前回とのFollower差分を表示します。

めんどくさいというかAPI Limit的に不可能なので、ブロブロ解、凍結には対応してません。
~~#俺たちのUserStreamを返せ~~


Followerが3000人以上の人は確定でAPI Limit引っかかるので、Twitter For iPadとかのそういうCK/CS使おう。

## 使い方

```
npm install
```

app.jsの
consumer_key
consumer_secret
access_token_key
access_token_secret
targetName (自分のscreen_name)
を自分のに書き換え

```
node app.js
```

初回起動時は差分が無いためコケます。

## おすすめの使い方

cronで15分おきに実行

自分宛てDMにリムられを送信

リムった人にアクセスして30xでsuspendedページに飛ばされたら自動煽りツイートとかも簡単にできます。Nodeはいいぞ


### 開発環境(動作確認環境)

Node v10.15.0
