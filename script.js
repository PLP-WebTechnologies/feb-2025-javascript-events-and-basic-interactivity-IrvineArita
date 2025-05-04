const form = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const feedback = document.getElementById('formFeedback');
const todoList = document.getElementById('todoList');
const keyDisplay = document.getElementById('keyDisplay');
const colorBtn = document.getElementById('colorBtn');
const colorBox = document.getElementById('colorBox');

// Form submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const task = todoInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Basic validation
  if (!task || !email || !password) {
    feedback.textContent = "All fields are required!";
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    feedback.textContent = "Invalid email format.";
    return;
  }

  if (password.length < 8) {
    feedback.textContent = "Password must be at least 8 characters.";
    return;
  }

  feedback.textContent = "";
  addTask(task);
  todoInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
});

// Add task to list
function addTask(text) {
  const li = document.createElement('li');
  li.textContent = text;

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add('delete-btn');
  li.appendChild(deleteBtn);

  // Click to toggle done
  li.addEventListener('click', () => {
    li.classList.toggle('done');
  });

  // Delete task
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
  });

  // Long press to highlight
  let pressTimer;
  li.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
      li.classList.toggle('highlight');
    }, 700);
  });
  li.addEventListener('mouseup', () => clearTimeout(pressTimer));

  todoList.appendChild(li);
}

// Keypress detection
document.addEventListener('keydown', (e) => {
  keyDisplay.textContent = e.key;
});

// Button that changes color box
colorBtn.addEventListener('click', () => {
  const colors = ['#f9c5d1', '#ffe29a', '#dcd0ff', '#c3fbd8', '#a0e7e5'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = randomColor;
});

// Real-time feedback (Bonus)
todoInput.addEventListener('input', () => {
  if (todoInput.value.length < 3) {
    feedback.textContent = "Keep typing...";
  } else {
    feedback.textContent = "";
  }
});
