const userId = localStorage.getItem('userId')

export const getProjects = async () => {
  try {
    const res = await fetch(`http://localhost:1337/api/users/${userId}?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to getProjects of user");
    }
    const data = await res.json();

    if (data.projects) {
      return data.projects
    }
    console.log(data.projects, "projects");
  } catch (error) {
    console.log(error);
  }
};
export const getTasks = async (projectId) => {
  try {
    const res = await fetch(`http://localhost:1337/api/projects/${projectId}?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to getTasks ");
    }
    const { data } = await res.json();

    if (data.attributes) {
      return data.attributes.tasks.data
    }
    console.log(data.attributes.tasks.data, "tasks");
  } catch (error) {
    console.log(error);
  }
};
export const submitNewProject = async function (newProject) {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`http://localhost:1337/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ data: newProject }),
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    alert(err)
  }
};
export const pushNewProject = async function (newProject) {
  try {
    
    const jwtToken = localStorage.getItem("token");
    const lastData=await getProjects()
    lastData && lastData.filter()
    const res = await fetch(`http://localhost:1337/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ data: newProject }),
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    alert(err)
  }
};
export const submitNewTask = async function (newTask) {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`http://localhost:1337/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ data: newTask }),
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    alert(err)
  }
};