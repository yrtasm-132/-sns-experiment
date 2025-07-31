import { createClient } from "@supabase/supabase-js";

// Supabase設定
const supabaseUrl = "https://uqjtilpwdjoldseqtzsy.supabase.co";
const supabaseKey = "★あなたのキー★"; // 公開前に伏せよう！

const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ URLパラメータから学籍番号取得
const params = new URLSearchParams(window.location.search);
const participantId = params.get("id");

// ✅ アクションボタン処理（いいね・シェア・コメント）
document.querySelectorAll(".like-btn, .share-btn, .comment-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const post = btn.closest(".post");
    const postId = post?.dataset.postid;
    const action = btn.classList.contains("like-btn")
      ? "like"
      : btn.classList.contains("share-btn")
      ? "share"
      : "comment";

    const countSpan = btn.querySelector(".count");
    let count = parseInt(countSpan.textContent);

    const isToggled = btn.classList.toggle("active");
    count += isToggled ? 1 : -1;
    countSpan.textContent = count;

    if (postId === "target" && participantId) {
      const payload = {
        timestamp: new Date().toISOString(),
        participant_id: participantId,
        post_id: postId,
        [`action_${action}`]: isToggled,
        [`state_${action}`]: count,
      };

      const { data, error } = await supabase
        .from("response")
        .insert([payload])
        .select();

      if (error) {
        console.error("🔥 Supabase insert error:", error.message);
      } else {
        console.log("✅ Supabaseに保存成功:", data);
      }
    }
  });
});
