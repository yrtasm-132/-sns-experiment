import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://uqjtilpwdjoldseqtzsy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxanRpbHB3ZGpvbGRzZXF0enN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzc1NDcsImV4cCI6MjA2ODY1MzU0N30.39z4ok-86KdocgAgC7qYzLij4CWJFzCLGIPw7Co4y1Q';
const supabase = createClient(supabaseUrl, supabaseKey);

// 仮の参加者ID（本番では入力ページから取得する）
const participantId = 'test_user_001';

// 操作状態を保存するオブジェクト（投稿ごと）
const postStates = {};

function setupToggleButton(selector, actionName) {
  document.querySelectorAll(selector).forEach(btn => {
    const countSpan = btn.querySelector('.count');
    const postId = btn.getAttribute('data-postid');
    const originalCount = parseInt(countSpan.textContent);
    let toggled = false;

    // 初期化
    if (!postStates[postId]) {
      postStates[postId] = {
        share: { toggled: false, count: originalCount },
        like: { toggled: false, count: originalCount }
      };
    }

    btn.addEventListener('click', async () => {
      toggled = !toggled;
      postStates[postId][actionName].toggled = toggled;
      postStates[postId][actionName].count = toggled ? originalCount + 1 : originalCount;

      // カウント表示更新
      countSpan.textContent = postStates[postId][actionName].count;

      // 実験対象の投稿のみSupabaseに送信
      if (postId === 'target') {
        const record = {
          participant_id: participantId,
          post_id: postId,
          action_share: postStates[postId].share.toggled ? 1 : 0,
          action_like: postStates[postId].like.toggled ? 1 : 0,
          state_share: postStates[postId].share.toggled ? 'on' : 'off',
          state_like: postStates[postId].like.toggled ? 'on' : 'off',
          count_share: postStates[postId].share.count,
          count_like: postStates[postId].like.count
        };

        const { error } = await supabase.from('response').insert([record]);

        if (error) {
          console.error('送信エラー:', error);
          alert('データの送信に失敗しました。');
        } else {
          console.log('送信完了:', record);
        }
      }
    });
  });
}

// 実行：class名に合わせて適用
setupToggleButton('.repost-btn', 'share');
setupToggleButton('.like-btn', 'like');
