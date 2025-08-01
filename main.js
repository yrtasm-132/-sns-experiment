import { createClient } from "@supabase/supabase-js";

// Supabase設定
const supabaseUrl = "https://uqjtilpwdjoldseqtzsy.supabase.co";
const supabaseKey = "★あなたのキー★"; // 公開前に伏せよう！

const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ URLパラメータから学籍番号取得
const params = new URLSearchParams(window.location.search);
const participantId = params.get("id");

// ✅ アクションボタン処理（いいね・シェア・コメント）
document.querySelectorAll('.share-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const countEl = btn.querySelector('.count');
    let count = parseInt(countEl.textContent, 10);
    
    const isActive = btn.classList.toggle('active');
    count += isActive ? 1 : -1;
    countEl.textContent = count;
  });
});
