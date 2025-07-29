import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://uqjtilpwdjoldseqtzsy.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY'; // ← セキュアな管理推奨！
const supabase = createClient(supabaseUrl, supabaseKey);

// ※ 本番ではURLパラメータや別画面から取得したIDに置き換えてね！
const participantId = 'test_user_001';

// 状態管理
let shareToggled = false;
let likeToggled = false;
let originalShareCount = 1;
let originalLikeCount = 1;

// 対象投稿ID（index.htmlの中でこのpostだけdata-postid="target"にしてある前提）
const TARGET_POST_ID = 'target';

function setupToggleButton(selector, actionName) {
  document.querySelectorAll(selector).forEach(btn => {
    const countSpan = btn.querySelector('.count');
    const postId = btn.getAttribute('data-postid');
    const originalCount = parseInt(countSpan.textContent);
    let toggled = false;

    // 初期カウント保存（実験対象のみ）
    if (postId === TARGET_POST_ID) {
      if (actionName === 'share') originalShareCount = originalCount;
      if (actionName === 'like') originalLikeCount = originalCount;
    }

    btn.addEventListener('click', async () => {
      toggled = !toggled;
      const newCount = toggled ? originalCount + 1 : originalCount;
      countSpan.textContent = newCount;

      // 状態記録（実験対象のみ）
      if (postId === TARGET_POST_ID) {
        if (actionName === 'share') shareToggled = toggled;
        if (actionName === 'like') likeToggled = toggled;

        // Supabaseへ送信（どちらのボタンでも両方の状態を送る）
        const { error } = await supabase.from('response').insert([{
          participant_id: participantId,
          post_id: TARGET_POST_ID,
          action_share: actionName === 'share' ? true : null,
          action_like: actionName === 'like' ? true : null,
          state_share: shareToggled,
          state_like: likeToggled,
          count_share: shareToggled ? originalShareCount + 1 : originalShareCount,
          count_like: likeToggled ? originalLikeCount + 1 : originalLikeCount,
        }]);

        if (error) {
          alert('記録失敗！');
          console.error(error);
        } else {
          console.log(`記録成功: ${actionName}`);
        }
      }
    });
  });
}

// 実行
setupToggleButton('.repost-btn', 'share');
setupToggleButton('.like-btn', 'like');
