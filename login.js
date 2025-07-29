document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // 仮ログインチェック（本番環境では削除・変更）
  if (username === 'test' && password === 'pass') {
    window.location.href = 'index.html';
  } else {
    alert('ユーザー名またはパスワードが違います');
  }
});
