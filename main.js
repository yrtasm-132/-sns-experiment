import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://uqjtilpwdjoldseqtzsy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxanRpbHB3ZGpvbGRzZXF0enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzc1NDcsImV4cCI6MjA2ODY1MzU0N30.39z4ok-86KdocgAgC7qYzLij4CWJFzCLGIPw7Co4y1Q'; // ←セキュリティ上、公開アプリでは.env等に移すのが理
const supabase = createClient(supabaseUrl, supabaseKey);

// 参加者ID（後で動的入力に置き換え予定）
const participantId = 'test_user_001';

function setupToggleButton(selector, actionName) {
  document.querySelectorAll(selector).forEach(btn => {
    const countSpan = btn.querySelector('.count');
    const postId = btn.getAttribute('data-postid');
    const originalCount = parseInt(countSpan.textContent);
    let toggled = false;

    btn.addEventListener('click', async () => {
      toggled = !toggled;
      const newCount = toggled ? originalCount + 1 : originalCount;
      countSpan.textContent = newCount;

      // Supabaseに送信するデータオブジェクトを構築
      const insertData = {
        participant_id: participantId,
        post_id: postId
      };

      // 動的にカラムを埋める
      insertData[`action_${actionName}`] = true;
      insertData[`state_${actionName}`] = toggled;
      insertData[`count_${actionName}`] = newCount;

      // Supabaseへ送信
      const { error } = await supabase.from('response').insert([insertData]);
      if (error) {
        alert('送信エラーが発生しました');
        console.error(error);
      } else {
        console.log('✅ 送信完了:', insertData);
      }
    });
  });
}

// 実行
setupToggleButton('.like-btn', 'like');
setupToggleButton('.repost-btn', 'share');
