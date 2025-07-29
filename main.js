import { createClient } from "@supabase/supabase-js";

// Supabase設定（あなたの環境に合わせて記載）
const supabaseUrl = "https://uqjtilpwdjoldseqtzsy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxanRpbHB3ZGpvbGRzZXF0enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzc1NDcsImV4cCI6MjA2ODY1MzU0N30.39z4ok-86KdocgAgC7qYzLij4CWJFzCLGIPw7Co4y1Q";
const supabase = createClient(supabaseUrl, supabaseKey);

// 参加者ID（本番はログインや事前入力で動的に取得することを推奨）
const participantId = "test_user_001";

document.querySelectorAll(".like-btn, .repost-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const postId = btn.dataset.postid;
    const action = btn.classList.contains("like-btn") ? "like" : "share";
    const countSpan = btn.querySelector(".count");
    let count = parseInt(countSpan.textContent);

    const isToggled = btn.classList.toggle("active");
    count += isToggled ? 1 : -1;
    countSpan.textContent = count;

    // 実験対象投稿（postId === "target"）のみSupabaseに記録
    if (postId === "target") {
      const response = {
        timestamp: new Date().toISOString(),
        participant_id: participantId,
        post_id: postId,
        [`action_${action}`]: isToggled,
        [`state_${action}`]: count,
      };

      const { error } = await supabase.from("response").insert([response]);

      if (error) {
        console.error("🔥 Supabase insert error:", error);
      } else {
        console.log("✅ Supabaseに保存:", response);
      }
    }
  });
});
