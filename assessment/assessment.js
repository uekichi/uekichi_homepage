(function() {
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
　　　
    /**
     * 
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    //練習問題　Enterキーは無い方がいい。
    /*
    userNameInput.onkeydown = (event) => {
        if (event.key === 'Enter') {
            assessmentButton.onclick();
        }
    };
    */

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) {
            return;
        }

        // 診断結果の表示作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = 'ツイートの文章:';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('h2');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        // ToDo ツイートエリアの作成
        //<a href="https://twitter.com/intent/tweet?button_hashtag=スマブラキャラ&ref_src=twsrc%5Etfw" 
        //class="twitter-hashtag-button" 
        //data-text="診断結果の文章" data-show-count="false">Tweet #スマブラキャラ</a>
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('スマブラやるよ')
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #スマブラやるよ';
        tweetDivided.appendChild(anchor);
        twttr.widgets.load();
    };
    const comment = 'スマブラSP遊びまーす^o^/ 部屋立てました。 ラッキーキャラは'
    const answers = [
        `${comment}マリオです。`,
        `${comment}ドンキーコングです。`,
        `${comment}リンクです。`,
        `${comment}サムスです。`,
        `${comment}ヨッシーです。`,
        `${comment}カービィです。`,
        `${comment}フォックスです。`,
        `${comment}ピカチュウです。`,
        `${comment}ルイージです。`,
        `${comment}ネスです。`,
        `${comment}キャプテン・ファルコンです。`,
        `${comment}プリンです。`,
        `${comment}ピーチです。`,
        `${comment}クッパです。`,
        `${comment}アイスクライマーです。`,
        `${comment}シークです。`,
        `${comment}ドクターマリオです`,
        `${comment}ピチューです`,
        `${comment}ファルコです`,
        `${comment}マルスです`,
        `${comment}ルキナです`,
        `${comment}こどもリンクです`,
        `${comment}ガノンドロフです`,
        `${comment}ミュウツーです`,
        `${comment}ロイです`,
        `${comment}クロムです`,
        `${comment}Mr.ゲーム＆ウォッチです`,
        `${comment}メタナイトです`,
        `${comment}ピットです`,
        `${comment}ブラックピットです`,
        `${comment}ゼロスーツサムスです`,
        `${comment}ワリオです`,
        `${comment}スネークです`,
        `${comment}アイクです`,
        `${comment}ポケモントレーナーゼニガメです`,
        `${comment}ポケモントレーナーフシギソウです`,
        `${comment}ポケモントレーナーリザードンです`,
        `${comment}ディディーコングです`,
        `${comment}リュカです`,
        `${comment}ソニックです`,
        `${comment}デデデです`,
        `${comment}ピクミン＆オリマーです`,
        `${comment}ルカリオです`,
        `${comment}ロボットです`,
        `${comment}トゥーンリンクです`,
        `${comment}ウルフです`,
        `${comment}むらびとです`,
        `${comment}ロックマンです`,
        `${comment}Wii Fit トレーナーです`,
        `${comment}ロゼッタ＆チコです`,
        `${comment}リトル・マックです`,
        `${comment}ゲッコウガです`,
        `${comment}Miiファイター格闘です`,
        `${comment}Miiファイター剣術です`,
        `${comment}Miiファイター射撃です`,
        `${comment}パルテナです`,
        `${comment}パックマンです`,
        `${comment}ルフレです`,
        `${comment}シュルクです`,
        `${comment}クッパJr.です`,
        `${comment}ダックハントです`,
        `${comment}リュウです`,
        `${comment}ケンです`,
        `${comment}クラウドです`,
        `${comment}カムイです`,
        `${comment}ベヨネッタです`,
        `${comment}インクリングです`,
        `${comment}リドリーです`,
        `${comment}シモンです`,
        `${comment}リヒターです`,
        `${comment}キングクルールです`,
        `${comment}しずえです`,
        `${comment}ガオガエンです`,
        `${comment}パックンフラワーです`
]

/**
 * 名前の文字列を引数で渡すと診断結果の文字列を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果 
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode =sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    return result;
}


//テスト
/*
    console.log(assessment('太郎'));
    console.assert(
        assessment('太郎') === '太郎さんはカービィです。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '同じ名前の診断結果が正しくありません。'
    );
*/
})();