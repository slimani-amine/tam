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
    const newProject = await submitNewProject(newProjectData);
    const user = {
      projects: [newProject.id],
    };

    const res = await fetch(`http://localhost:1337/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ user }),
    });

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const submitNewTask = async function (newTaskData) {
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
export const pushNewTask = async function (newTaskData) {
  try {
    const jwtToken = localStorage.getItem("token");
    const newTask = await submitNewTask(newTaskData);
    const project = {
      tasks: [newTask.id],
    };
    const res = await fetch(`http://localhost:1337/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ project }),
    });

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
