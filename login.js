document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const student_number = document.getElementById('student_number').value;

  // 学籍番号のバリデーション（AABAAAA：数字2 + 英大文字1 + 数字4）
  const regex = /^[0-9]{2}[A-Z][0-9]{4}$/;
  // 仮ログインチェック（本番環境では削除・変更）
   if (regex.test(student_number)) {
    window.location.href = 'main.html';
  }
});
