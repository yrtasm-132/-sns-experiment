//import { createClient } from "@supabase/supabase-js";

/*
// Supabase設定
const supabaseUrl = "https://uqjtilpwdjoldseqtzsy.supabase.co";
const supabaseKey = "★あなたのキー★"; // 公開前に伏せよう！

const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ URLパラメータから学籍番号取得
const params = new URLSearchParams(window.location.search);
const participantId = params.get("id");
*/

// ✅ アクションボタン処理（いいね・シェア・コメント）
//シェア
document.querySelectorAll('.share-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const countEl = btn.querySelector('.count');
    let count = parseInt(countEl.textContent, 10);

    const isActive = btn.classList.toggle('active');

    // 数字を増減
    countEl.textContent = isActive ? count + 1 : count - 1;

    // 色を変える
    if (isActive) {
      btn.classList.add('pink');
    } else {
      btn.classList.remove('pink');
    }
  });
});

//いいね
document.querySelectorAll('.like-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const countEl = btn.querySelector('.count');
    let count = parseInt(countEl.textContent, 10);

    const isActive = btn.classList.toggle('active');
    
    // 数字を増減
    countEl.textContent = isActive ? count + 1 : count - 1;

    // 色を変える
    if (isActive) {
      btn.classList.add('orange');
    } else {
      btn.classList.remove('orange');
    }
  });
});


