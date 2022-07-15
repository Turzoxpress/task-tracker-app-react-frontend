module.exports = {
  backend_server: "http://localhost:3000",

  registerNewUser: "/user/register-user",
  login: "/user/login-user",
  getAllUsers: "/user/get-users",
  updateUserRole: "/user/update-user-role",

  addTask: "/todo/add-task",
  getAllTasks: "/todo/get-all-tasks",
  getAllTasksStatus: "/todo/get-all-tasks-status",
  changeTask: "/todo/change-task",
  deleteTask: "/todo/delete-task",
  getTotalTaskCount: "/todo/task-count",

  authorized_admin_emails: [
    "turzoxpress@gmail.com",
    "testsdfsdf324324sdf565675343534@gmail.com",
  ],
};
