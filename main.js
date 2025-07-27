import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://uqjtilpwdjoldseqtzsy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxanRpbHB3ZGpvbGRzZXF0enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzc1NDcsImV4cCI6MjA2ODY1MzU0N30.39z4ok-86KdocgAgC7qYzLij4CWJFzCLGIPw7Co4y1Q';
const supabase = createClient(supabaseUrl, supabaseKey);

const participantId = 'test_user_001'; // ← テスト用ID、後で置き換えOK！

document.querySelectorAll('.like-button').forEach(button => {
  button.addEventListener('click', async () => {
    const postId = button.dataset.postId;
    const { error } = await supabase.from('response').insert([
      {
        participant_id: participantId,
        post_id: postId
      }
    ]);

    if (error) {
      alert('送信エラーが発生しました');
      console.error(error);
    } else {
      alert(`「${postId}」へのいいねを記録しました！`);
    }
  });
});

function setupToggleButton(selector, actionName) {
  document.querySelectorAll(selector).forEach(btn => {
    const countSpan = btn.querySelector('.count');
    const postId = btn.getAttribute('data-postid');
    const originalCount = parseInt(countSpan.textContent);
    let toggled = false;

    btn.addEventListener('click', () => {
      toggled = !toggled;

      // 数値を更新
      countSpan.textContent = toggled ? originalCount + 1 : originalCount;

      // ログ記録（実際の保存はこの後拡張）
      console.log({
        postId,
        action: actionName,
        toggled: toggled,
        finalCount: parseInt(countSpan.textContent)
      });
    });
  });
}

// 実行
setupToggleButton('.repost-btn', 'share');
setupToggleButton('.like-btn', 'like');

