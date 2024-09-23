import "./css/bootstrap.min.css"
import "./js/bootstrap.bundle.min"

const URL = "https://jsonplaceholder.typicode.com/users";
fetch(URL).then((res) => {
    if (!res.ok) {
        return (container.textContent = "No user found with this data");
    }
    res.json().then((json) => {
        console.log(json);
        handleData(json); 
    });
});

function handleData(data) {
    const dynamicDataDiv = document.querySelector(".dynamic_data");
    data.forEach(user => {
        dynamicDataDiv.innerHTML += `
            <div class="col">
                <article class="card">
                    <div class="card-body">
                        <p>${user.name}</p>
                        <p>${user.email}</p>
                    </div>
                </article>
            </div>
        `;
    });
}

const apiSecret = import.meta.env.VITE_API_KEY;
console.log(apiSecret);

