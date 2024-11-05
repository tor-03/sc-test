import axios from 'axios'

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};


const login = async data => {
    let response = null
    try {
         response = await axios.post('http://localhost:8080/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        document.cookie = `token=${response.data.token}; path=/;`; 
        localStorage.setItem('loggedInUser', response.data.username);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/collection-types/';
    } catch (error) {
        console.log(error.response);
        if (error.response && error.response.status === 401) {
            alert("Invalid credentials. Please check your username and password.");
        } else {
            console.error("Error:", error);
        }
    }
    console.log(response.data)
    return response ? response.data : null;
};



const getCollectionTypes = async (logout, setTokenExp) => {
    let response = null
    const token = localStorage.getItem("token");
    console.log("Token : ", token);
    try {
        response = await axios.get('http://localhost:8080/sc/types', {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}


// const getCollections = async (logout, setTokenExp) => {
//     let response = null
//     const token = localStorage.getItem("token");
//     console.log("Token : ", token);
//     try {
//         response = await axios.get('http://localhost:8080/sc/collections', {
//             headers: { Authorization: `Bearer ${token}` },
//         })
//     } catch (error) {
//         console.log(error.response)
//         if (error.response && error.response.status === 401) {
//             if (error.response.data && error.response.data.error === "Unauthorized") {
//                 setTokenExp(true)
//                 logout();
//             }
//         } else {
//             console.error("Error:", error);
//         }
//     }
//     return response ? response.data : null;
// }

const getCollections = async (id, logout, setTokenExp) => {
    let response = null;
    const token = localStorage.getItem("token");
    console.log("Token : ", token);

    try {
        response = await axios.get(`http://localhost:8080/sc/collections/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const getCarpet = async (id, logout, setTokenExp) => {
    let response = null;
    const token = localStorage.getItem("token");
    console.log("Token : ", token);

    try {
        response = await axios.get(`http://localhost:8080/sc/collection/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const getTypeWithName = async (name, logout, setTokenExp) => {
    let response = null;
    const token = localStorage.getItem("token");
    console.log("Token : ", token);

    try {
        response = await axios.get(`http://localhost:8080/sc/types/${name}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const getTotalNumberOfTypes = async (logout, setTokenExp) => {
    let response = null;
    let token = localStorage.getItem("token");

    if (!token) {
        token = getCookie('token');
    }
    
    try {
        console.log("Sending Token : ", token);
        response = await axios.get(`http://localhost:8080/admin/total-types`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const getTypesWithCarpet = async (logout, setTokenExp) => {
    let response = null;
    let token = localStorage.getItem("token");

    if (!token) {
        token = getCookie('token');
    }
    
    try {
        console.log("Sending Token : ", token);
        response = await axios.get(`http://localhost:8080/sc/types-with-carpet`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const getTotalImagesSize = async (logout, setTokenExp) => {
    let response = null;
    const token = localStorage.getItem("token");
    console.log("Token : ", token);

    try {
        response = await axios.get(`http://localhost:8080/admin/total-image-size`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const addCarpet = async (data, logout, setTokenExp) => {
    let response = null;
    const token = localStorage.getItem("token");
    console.log("Token : ", token);

    try {
        response = await axios.post('http://localhost:8080/admin/collections', data, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const deleteCarpet = async (id, logout, setTokenExp) => {
    let response = null
    const token = localStorage.getItem("token");
    console.log("Token : ", token);
    try {
        response = await axios.delete(`http://localhost:8080/admin/collections/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const updateCarpet = async (data, logout, setTokenExp) => {
    let response = null;
    const token = localStorage.getItem("token");
    console.log("Token : ", token);

    try {
        response = await axios.put('http://localhost:8080/admin/collections', data, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const addCollectionType = async (data, logout, setTokenExp) => {
    let response = null;
    const token = localStorage.getItem("token");
    console.log("Token : ", token);

    try {
        response = await axios.post('http://localhost:8080/admin/types', data, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const deleteCollectionType = async (id, logout, setTokenExp) => {
    let response = null
    const token = localStorage.getItem("token");
    console.log("Token : ", token);
    try {
        response = await axios.delete(`http://localhost:8080/admin/types/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}

const updateCollectionType = async (data, logout, setTokenExp) => {
    let response = null;
    const token = localStorage.getItem("token");
    console.log("Token : ", token);

    try {
        response = await axios.put('http://localhost:8080/admin/types', data, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.log(error.response)
        if (error.response && error.response.status === 401) {
            if (error.response.data && error.response.data.error === "Unauthorized") {
                setTokenExp(true)
                logout();
            }
        } else {
            console.error("Error:", error);
        }
    }
    return response ? response.data : null;
}


export {
    login,
    getCollectionTypes,
    getCollections,
    addCarpet,
    deleteCarpet,
    updateCarpet,
    updateCollectionType,
    deleteCollectionType,
    addCollectionType,
    getTotalNumberOfTypes,
    getTotalImagesSize,
    getTypesWithCarpet,
    getTypeWithName,
    getCarpet

}

