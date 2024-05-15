import Cookies from "js-cookie";

export async function postMethod() {
    const jsonBody = JSON.stringify(obj);
    const token = "";
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        mode: "cors",
        method: "POST",
        body: jsonBody,
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response.status;
}
export async function registerUser(formData) {
    const jsonBody = JSON.stringify(formData);
    const response = await fetch("http://127.0.0.1:8080/api/utente/registrazione", {
        mode: "cors",
        method: "POST",
        body: jsonBody,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.status;
}
export async function getAllUsers(token) {
    const response = await fetch("http://127.0.0.1:8080/api/utente/trova/tutti", {
        mode: "cors",
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    if (!response.ok) {
        return null;
    }
    const users = await response.json();
    return users;
}
export async function getUserByEmail(email) {
    const response = await fetch(`http://127.0.0.1:8080/api/utente/trova?email=${email}`, {
        mode: "cors",
        method: "GET",
    });
    if (!response.ok) {
        return null;
    }
    const user = await response.json();
    return user;
}
export async function loginUser(formData) {
    const jsonBody = JSON.stringify(formData);
    const response = await fetch("http://127.0.0.1:8080/api/utente/login", {
        mode: "cors",
        method: "POST",
        body: jsonBody,
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        return null;
    }
    const user = await response.json();
    return user;
}

export async function updateUser(formData) {
    const jsonBody = JSON.stringify(formData);
    await fetch("http://127.0.0.1:8080/api/utente/aggiorna", {
        mode: "cors",
        method: "PUT",
        body: jsonBody,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function deleteUser(email) {
    await fetch(`http://127.0.0.1:8080/api/utente/cancella/${email}`, {
        mode: "cors",
        method: "DELETE",
    });
}

export async function getAllCourses() {
    const response = await fetch("http://localhost:8080/api/corso/corsi", {
        mode: "cors",
        method: "GET",
    });
    console.log(response);
    if (!response.ok) {
        return null;
    }
    const courses = await response.json();
    return courses;
}

export async function updateCourse(formData, token) {
    const jsonBody = JSON.stringify(formData);
    console.log(jsonBody);
    console.log(token);
    const response = await fetch("http://localhost:8080/api/corsi/aggiorna", {
        mode: "cors",
        method: "PUT",
        body: jsonBody,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    console.log(response.status);
}

export async function deleteCourse(id) {
    await fetch(`http://127.0.0.1:8080/api/corsi/cancella/${id}`, {
        mode: "cors",
        method: "DELETE",
    });
}

export async function insertCourse(formData) {
    const jsonBody = JSON.stringify(formData);
    const response = await fetch("http://127.0.0.1:8080/api/corsi/inserisci", {
        mode: "cors",
        method: "POST",
        body: jsonBody,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.status;
}