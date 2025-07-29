import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://uqjtilpwdjoldseqtzsy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxanRpbHB3ZGpvbGRzZXF0enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzc1NDcsImV4cCI6MjA2ODY1MzU0N30.39z4ok-86KdocgAgC7qYzLij4CWJFzCLGIPw7Co4y1Q"; // ← 本番用に置き換えてください
const supabase = createClient(supabaseUrl, supabaseKey);

const participantId = "test_user_001"; // 必要ならユーザー入力に置き換え可能

document.querySelectorAll(".repost-btn, .like-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const postId = button.dataset.postid;
    const action = button.classList.contains("repost-btn") ? "share" : "like";
    const isTarget = postId === "target";

    const countSpan = button.querySelector(".count");
    let count = parseInt(countSpan.textContent, 10);
    const toggled = !button.classList.contains("active");

    // 表示切替
    button.classList.toggle("active", toggled);
    count = toggled ? count + 1 : count - 1;
    countSpan.textContent = count;

    console.log({ postId, action, toggled, finalCount: count });

    // Supabaseへ送信（実験対象投稿のみ）
    if (isTarget) {
      const response = await supabase.from("response").insert([{
        timestamp: new Date().toISOString(),
        participant_id: participantId,
        post_id: postId,
        [`action_${action}`]: toggled,
        [`state_${action}`]: count
      }]);

      if (response.error) {
        console.error("Supabaseへの送信エラー:", response.error);
      } else {
        console.log("Supabaseに記録成功");
      }
    }
  });
});
