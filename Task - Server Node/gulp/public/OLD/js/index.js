const ORIGIN = 'http://localhost:5001';

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.get').addEventListener('click', async function() {
        const response = await fetch(`${ORIGIN}/todos`, {
            method: 'GET'
        });

        const data = await response.json();
        console.log(data);
    });
    document.querySelector('.post').addEventListener('click', async function() {
        const response = await fetch(`${ORIGIN}/todos`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                text: 'Task 6',
                checked: false,
                priority: 'Medium',
                id: 126
            })
        });
        const data = await response.json();
        console.log(data);
    });
    document.querySelector('.put').addEventListener('click', async function() {
        const response = await fetch(`${ORIGIN}/todos/2`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                checked: false
            })
        });
        const data = await response.json();
        console.log(data);
    });
    document.querySelector('.delete').addEventListener('click', async function() {
        const response = await fetch(`${ORIGIN}/todos/20`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        console.log(data);
    })
})