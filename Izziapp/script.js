import data from "./allProsData.json" with { type: "json" };

console.log(data);

function createTaskerCard(tasker) {
  const newTasker = document.createElement("div");
  newTasker.classList.add("card");
  newTasker.setAttribute("id", `${tasker.id}`);

  newTasker.innerHTML = `
    <div class="info">
        <div class="profile_photo">
            <img src="${tasker.user.profile_picture.publicUrl}" alt="">
        </div>
        <div class="user_info">
          <p class="username">
            <span class="name">${tasker.user.name}</span>
            <span class="surname">${tasker.user.surname}</span>
          </p>
          <div class="user_rate">
            <span class="stars"></span>
            <span class="star_rate">${tasker.averageRating}</span>
          </div>
        </div>
      </div>

      <div class="user_status">
        <div class="task_number"><img src="photos/tasks.png" alt="tick" />${
          tasker.completedTasks
        } tasks</div>
        <div class="user_top_pro" ${
          !tasker.eliteTasker ? 'style="display:none;"' : ""
        }><img src="photos/topPro.png" alt="top" />Top Pro</div>
        <div class="user_new_pro" ${
          !tasker.newPro ? 'style="display:none;"' : ""
        }><img src="photos/newPro.png" alt="new" />New Pro</div>
      </div>

      <div class="about_user">
        <p>
        ${tasker.bio}
        </p>
      </div>

      <div class="about_service">
        <div class="view_profile">View Profile</div>
        <div class="price_and_booking">
          <div class="service_price">$35</div>
          <div class="book_service">Book Now</div>
        </div>
      </div>
  `;

  const stars = newTasker.querySelector(".stars");
  for (let i = 0; i < tasker.averageRating; i++) {
    stars.innerHTML += "&Star;";
  }

  return newTasker;
}

function renderTaskers(taskers) {
  const container = document.querySelector(".main");
  container.innerHTML = "";
  taskers.forEach((tasker) => {
    container.appendChild(createTaskerCard(tasker));
  });
}

function sortTaskersByRating(taskers, order) {
  taskers.sort((a, b) =>
    order === "ascending"
      ? a.averageRating - b.averageRating
      : b.averageRating - a.averageRating
  );
  renderTaskers(taskers);
}

function sortTaskersByTasks(taskers, order) {
  taskers.sort((a, b) =>
    order === "ascending"
      ? a.completedTasks - b.completedTasks
      : b.completedTasks - a.completedTasks
  );
  renderTaskers(taskers);
}

function filterTaskers(taskers, condition) {
  const filteredTaskers = taskers.filter(condition);
  renderTaskers(filteredTaskers);
}

function setupEventListeners(taskers) {
  const ratingOrder = document.querySelector("#rating");
  const taskCountOrder = document.querySelector("#task_count");
  const topProChecker = document.querySelector("#top_pros");
  const newProChecker = document.querySelector("#new_pros");
  const supervisorChecker = document.querySelector("#supervisors");
  const prosChecker = document.querySelector("#pros");

  ratingOrder.addEventListener("change", () => {
    sortTaskersByRating(taskers, ratingOrder.value);
  });

  taskCountOrder.addEventListener("change", () => {
    sortTaskersByTasks(taskers, taskCountOrder.value);
  });

  topProChecker.addEventListener("click", () => {
    filterTaskers(taskers, (tasker) =>
      topProChecker.checked ? tasker.eliteTasker : true
    );
  });

  newProChecker.addEventListener("click", () => {
    filterTaskers(taskers, (tasker) =>
      newProChecker.checked ? tasker.newPro : true
    );
  });

  supervisorChecker.addEventListener("click", () => {
    filterTaskers(taskers, (tasker) =>
      supervisorChecker.checked ? tasker.supervisor : true
    );
  });

  prosChecker.addEventListener("click", () => {
    renderTaskers(taskers);
  });

  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((box) => (box.checked = false));
      this.checked = true;
    });
  });
}

async function GetInfo() {
  const taskers = data.data.taskers;
  renderTaskers(taskers);
  setupEventListeners(taskers);
}

GetInfo();