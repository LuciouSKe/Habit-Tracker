let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  const list = document.getElementById("habit-list");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");

    const habitName = document.createElement("span");
    habitName.textContent = habit.name;
    habitName.className = habit.done ? "done" : "";

    const streak = document.createElement("span");
    streak.className = "streak";
    streak.textContent = `🔥 ${habit.streak} day(s)`;

    const wrapper = document.createElement("div");
    wrapper.appendChild(habitName);
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(streak);

    li.appendChild(wrapper);

    li.className = habit.done ? "done" : "";

    li.onclick = () => {
      const today = new Date().toDateString();
      if (habit.lastMarked !== today) {
        habit.streak += 1;
        habit.lastMarked = today;
        habit.done = true;
        saveHabits();
        renderHabits();
      }
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addHabit() {
  const input = document.getElementById("habit-input");
  const name = input.value.trim();
  if (!name) return;

  habits.push({
    name: name,
    done: false,
    streak: 0,
    lastMarked: ""
  });

  input.value = "";
  saveHabits();
  renderHabits();
}

document.getElementById("darkModeToggle").addEventListener("change", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
  localStorage.setItem("darkMode", e.target.checked);
});

window.onload = () => {
  const isDark = JSON.parse(localStorage.getItem("darkMode"));
  document.body.classList.toggle("dark", isDark);
  document.getElementById("darkModeToggle").checked = isDark;
  renderHabits();
};
