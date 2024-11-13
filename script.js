// Lấy phần tử canvas và tạo context để vẽ
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Cài đặt kích thước canvas
canvas.width = 400;
canvas.height = 200;

// Định nghĩa đối tượng rổ
const basket = {
  width: 120,
  height: 30,
  x: canvas.width / 2 - 50,
  speed: 8
};

// Định nghĩa đối tượng bóng
const ball = {
  radius: 20,
  x: Math.random() * canvas.width,
  y: -10,
  speed: 15,
  dx: Math.random() * 2 - 1, // Di chuyển ngẫu nhiên theo hướng X
  dy: 3 // Di chuyển xuống
};

// Điểm số
let score = 0;

// Lắng nghe sự kiện di chuyển chuột để điều khiển rổ
document.addEventListener("mousemove", moveBasket);

function moveBasket(event) {
  basket.x = event.clientX - canvas.offsetLeft - basket.width / 2;

  // Đảm bảo rổ không ra ngoài biên giới canvas
  if (basket.x < 0) {
    basket.x = 0;
  } else if (basket.x + basket.width > canvas.width) {
    basket.x = canvas.width - basket.width;
  }
}

// Hàm vẽ rổ
function drawBasket() {
  ctx.fillStyle = "#333";
  ctx.fillRect(basket.x, canvas.height - basket.height, basket.width, basket.height);
}

// Hàm vẽ bóng
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#f00";
  ctx.fill();
  ctx.closePath();
}

// Hàm cập nhật game
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Vẽ rổ và bóng
  drawBasket();
  drawBall();

  // Cập nhật vị trí bóng
  ball.y += ball.dy;
  ball.x += ball.dx;

  // Kiểm tra va chạm với rổ
  if (ball.y + ball.radius >= canvas.height - basket.height && ball.x >= basket.x && ball.x <= basket.x + basket.width) {
    // Bắt được bóng
    ball.y = -10; // Đặt lại vị trí bóng
    ball.x = Math.random() * canvas.width;
    score++;
    document.getElementById("score").textContent = `Điểm: ${score}`;
  }

  // Nếu bóng rơi xuống dưới mà không bắt được
  if (ball.y + ball.radius > canvas.height) {
    ball.y = -10; // Đặt lại vị trí bóng
    ball.x = Math.random() * canvas.width;
  }

  // Vẽ lại trò chơi sau mỗi 10ms
  requestAnimationFrame(update);
}

// Bắt đầu game
update();
