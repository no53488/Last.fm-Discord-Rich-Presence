const form = document.getElementById('post-presence')
form.addEventListener('submit', startrpc)
async function startrpc(event) {
    event.preventDefault();
    const clientid = document.getElementById('clientid').value || '936982107106967602';
    const username = document.getElementById('username').value;
    const key = document.getElementById('key').value;
    const result = await fetch('http://localhost:3000/api/post-presence', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientid,
            username,
            key
        })
    }).then((res) => res.json())
    console.log(result)
    if(result.status !== "ok") {
        alert(result.error)
    }
}