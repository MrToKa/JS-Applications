async function getInfo() {
    const url = 'http://localhost:3030/jsonstore/bus/businfo/'

    const stopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');

    await fetch(url + stopId)
        .then(response => response.json())
        .then(data => {
            stopName.textContent = data.name;
            buses.textContent = '';

            Object.entries(data.buses).forEach(([bus, time]) => {
                const li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${time} minutes`;
                buses.appendChild(li);
            });
        })
        .catch(() => {
            stopName.textContent = 'Error';
            buses.textContent = '';
        });

    document.getElementById('stopId').value = '';
}