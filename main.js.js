import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://uqjtilpwdjoldseqtzsy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxanRpbHB3ZGpvbGRzZXF0enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzc1NDcsImV4cCI6MjA2ODY1MzU0N30.39z4ok-86KdocgAgC7qYzLij4CWJFzCLGIPw7Co4y1Q';  
const supabase = createClient(supabaseUrl, supabaseKey);

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

      // 実験対象投稿（postId === 'target'）のみ記録
      if (postId === 'target') {
        const data = {
          participant_id: participantId,
          post_id: postId,
        };

        // アクション名ごとに動的にカラム名を作る
        data[`action_${actionName}`] = 1;
        data[`state_${actionName}`] = toggled ? 1 : 0;
        data[`count_${actionName}`] = newCount;

        const { error } = await supabase.from('response').insert([data]);

        if (error) {
          alert('送信エラーが発生しました');
          console.error(error);
        } else {
          console.log(`記録：${actionName}`, data);
        }
      }
    });
  });
}

// 実行
setupToggleButton('.repost-btn', 'share');
setupToggleButton('.like-btn', 'like');
