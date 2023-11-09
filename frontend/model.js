const userId = localStorage.getItem("userId");

export const getProjects = async () => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/users/${userId}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getProjects of user");
    }
    const data = await res.json();
    if (data.projects) {
      return data.projects;
    }
    console.log(data.projects, "projects");
  } catch (error) {
    console.log(error);
  }
};
export const getTasks = async (projectId) => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/projects/${projectId}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getTasks ");
    }
    const { data } = await res.json();
    if (data.attributes) {
      return data.attributes.tasks.data;
    }
    console.log(data.attributes.tasks.data, "tasks");
  } catch (error) {
    console.log(error);
  }
};
const submitNewProject = async function (newProjectData) {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`http://localhost:1337/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ data: newProjectData }),
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const pushNewProject = async function (newProjectData) {
  try {
    const jwtToken = localStorage.getItem("token");

    const newProject = await submitNewProject(newProjectData, userId);
    console.log("New Project:", newProject);

    const lastProjects = await getProjects(userId);
    console.log("Existing Projects:", lastProjects);

    const updatedProjects = lastProjects.concat({
      id: newProject.id,
      Name: newProject.attributes.Name,
      createdAt: newProject.attributes.createdAt,
      publishedAt: newProject.attributes.publishedAt,
      updatedAt: newProject.attributes.updatedAt,
      url: newProject.attributes.url
    });
    console.log("Updated Projects:", updatedProjects);

    const res = await fetch(`http://localhost:1337/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        projects: updatedProjects,
      }),
    });

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};


const submitNewTask = async function (newTaskData) {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`http://localhost:1337/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ data: newTaskData }),
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const pushNewTask = async function (newTaskData, projectId = 1) {
  try {
    const jwtToken = localStorage.getItem("token");
    const newTask = await submitNewTask(newTaskData);
    console.log("New tasks:", newTask);

    const lastTasks = await getTasks(projectId);
    console.log("Existing tasks:", lastTasks);

    const updatedTask = lastTasks.concat(
      {
        id: newTask.id,
        title: newTask.attributes.title,
        createdAt: newTask.attributes.createdAt,
        publishedAt: newTask.attributes.publishedAt,
        updatedAt: newTask.attributes.updatedAt,
        description: newTask.attributes.description,
        priority: newTask.attributes.priority,
        status: newTask.attributes.status
      });
    console.log("Updated Task:", updatedTask)
    const res = await fetch(`http://localhost:1337/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        data: { tasks: updatedTask },
      }),
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
};
