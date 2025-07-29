import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://uqjtilpwdjoldseqtzsy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxanRpbHB3ZGpvbGRzZXF0enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzc1NDcsImV4cCI6MjA2ODY1MzU0N30.39z4ok-86KdocgAgC7qYzLij4CWJFzCLGIPw7Co4y1Q';
const supabase = createClient(supabaseUrl, supabaseKey);

// 参加者ID（本番では入力画面で取得）
const participantId = 'test_user_001';

function setupToggleButton(selector, actionName) {
  document.querySelectorAll(selector).forEach(btn => {
    const countSpan = btn.querySelector('.count');
    const postId = btn.getAttribute('data-postid');
    const originalCount = parseInt(countSpan.textContent);
    let toggled = false;

    btn.addEventListener('click', async () => {
      toggled = !toggled;

      // 数値更新
      const newCount = toggled ? originalCount + 1 : originalCount;
      countSpan.textContent = newCount;

      // 実験対象投稿以外は記録しない
      if (postId !== 'target') return;

      // カラム名を自動で決定
      const actionCol = `action_${actionName}`;
      const stateCol = `state_${actionName}`;
      const countCol = `count_${actionName}`;

      const data = {
        participant_id: participantId,
        post_id: postId,
        [actionCol]: 1,
        [stateCol]: toggled ? 1 : 0,
        [countCol]: newCount
      };

      const { error } = await supabase.from('response').insert([data]);

      if (error) {
        console.error('送信エラー:', error);
        alert('送信エラーが発生しました');
      } else {
        console.log('送信成功', data);
      }
    });
  });
}

// 実行
setupToggleButton('.repost-btn', 'share');
setupToggleButton('.like-btn', 'like');
