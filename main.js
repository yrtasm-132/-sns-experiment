import { createClient } from "@supabase/supabase-js";

// Supabase設定
const supabaseUrl = "https://uqjtilpwdjoldseqtzsy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxanRpbHB3ZGpvbGRzZXF0enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzc1NDcsImV4cCI6MjA2ODY1MzU0N30.39z4ok-86KdocgAgC7qYzLij4CWJFzCLGIPw7Co4y1Q";

const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ URLパラメータから学籍番号を取得
const params = new URLSearchParams(window.location.search);
const participantId = params.get("id");

document.querySelectorAll(".like-btn, .repost-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const postId = btn.dataset.postid;
    const action = btn.classList.contains("like-btn") ? "like" : "share";
    const countSpan = btn.querySelector(".count");
    let count = parseInt(countSpan.textContent);

    const isToggled = btn.classList.toggle("active");
    count += isToggled ? 1 : -1;
    countSpan.textContent = count;

    // 🎯 実験対象投稿だけ記録
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
        .select(); // ←これで確実に送信トリガーされることがある

      if (error) {
        console.error("🔥 Supabase insert error:", error.message);
      } else {
        console.log("✅ Supabaseに保存成功:", data);
      }
    }
  });
});
