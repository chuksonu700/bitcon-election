var holdlgaid;
var holdpuname = [];
document.getElementById('resultDisplay').style.display = "none";
document.getElementById('noResult').style.display = "none";
document.getElementById('holdform').style.display = "none";

function inputWard(val) {
    document.getElementById('ward').innerHTML = `<option selected>Ward Select </option>`;
    fetch(`/ward-get/${val}`)
        .then(response => response.json())
        .then(data => sendData(data))
        .catch(error => console.log('error', error));

    function sendData(data) {
        for (var i = 0; i < data.length; i++) {
            document.getElementById('ward').innerHTML += `<option value="${data[i].ward_id}">${data[i].ward_name}</option>`;
        }
    }
    holdlgaid = val;
}

function inputPoll(val) {

    document.getElementById('polls').innerHTML = `<option selected>Polling Unit Select </option>`;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "lga": holdlgaid,
        "ward": val
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`/polls-get/`, requestOptions)
        .then(response => response.json())
        .then(data => sendData(data))
        .catch(error => console.log('error', error));

    function sendData(data) {

        for (var i = 0; i < data.length; i++) {
            document.getElementById('polls').innerHTML += `<option value="${data[i].uniqueid}">${data[i].polling_unit_name}</option>`;
        }
        holdpuname = data;
    }
}

function getResultPolls() {
    document.getElementById('resultDisplay').style.display = "block";
    document.getElementById('holdResult').innerHTML = ``;
    var val = document.getElementById('polls').value;
    fetch(`/showresult/${val}`)
        .then(response => response.json())
        .then(data => sendData(data))
        .catch(error => console.log('error', error));

    function sendData(data) {

        if (data.length < 1) {
            document.getElementById("table").style.display = "none";
            document.getElementById("noResult").style.display = "block";

        } else {
            document.getElementById("table").style.display = "block";
            document.getElementById("noResult").style.display = "none";
            for (let i = 0; i < data.length; i++) {
                document.getElementById('holdResult').innerHTML += `
            <tr>
            <th scope="row">${i+1}</th>
            <td>${data[i].party_abbreviation}</td>
            <td>${data[i].party_score}</td></tr>`;

            }
        }
    }
}

function getResultLga() {
    document.getElementById('resultDisplay').style.display = "block";
    document.getElementById('holdResult').innerHTML = ``;
    var val = document.getElementById('lgaId').value;
    fetch(`/lga-result/${val}`)
        .then(response => response.json())
        .then(data => sendData(data))
        .catch(error => console.log('error', error));

    function sendData(data) {
        if (data.length < 1) {
            document.getElementById("table").style.display = "none";
            document.getElementById("noResult").style.display = "block";

        } else {
            document.getElementById("table").style.display = "block";
            document.getElementById("noResult").style.display = "none";
            for (let i = 0; i < data.length; i++) {
                document.getElementById('holdResult').innerHTML += `
            <tr>
            <th scope="row">${i+1}</th>
            <td>${data[i].party}</td>
            <td>${data[i].score}</td></tr>`;
            }
        }
    }
}

function fillParty() {

    fetch(`/get-party`)
        .then(response => response.json())
        .then(data => sendData(data))
        .catch(error => console.log('error', error));

    function sendData(data) {
        for (var i = 0; i < data.length; i++) {
            document.getElementById('partyId').innerHTML += `<option value="${data[i].partyid}">${data[i].partyid}</option>`;
        }
    }

}

function subomit() {
    var polls = document.getElementById("pools").value;
    var partty = document.getElementById("partty").value;
}