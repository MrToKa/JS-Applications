function solve() {
    const url = 'http://localhost:3030/jsonstore/bus/schedule/';
    
    const infoSpan = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot',
        name: ''
    };
    
    async function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;

        await fetch(url + stop.next)
            .then(response => response.json())
            .then(data => {
                infoSpan.textContent = `Next stop ${data.name}`;
                stop = data;  
            })
            .catch(() => {
                infoSpan.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        infoSpan.textContent = `Arriving at ${stop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();