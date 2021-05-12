document.addEventListener('DOMContentLoaded',function(){
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});     

document.querySelector('table tbody').addEventListener
('click',function(event){
    if(event.target.className === "delete-row-btn"){
       // console.log("HAHAHAHHA");
        deleteRowById(event.target.dataset.ID);
    }
});

function deleteRowById(ID){
   

    fetch('http://localhost:5000/delete/' + ID,{
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload(); 
        }
    });
}

const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function(){

    const idInput = document.querySelector('#id-input');
    const id = idInput.value;
    idInput.value = "";

    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";

    const venueInput = document.querySelector('#venue-input');
    const venue = venueInput.value;
    venueInput.value = "";

    const timeInput = document.querySelector('#time-input');
    const time = timeInput.value;
    timeInput.value = "";

    const seatsInput = document.querySelector('#seats-input');
    const seats = seatsInput.value;
    seatsInput.value = "";

    const costInput = document.querySelector('#cost-input');
    const cost = costInput.value;
    costInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers:{
            'Content-type' : 'application/json'
        },
        method:'POST',
        body: JSON.stringify({id:id, name : name, venue:venue, time:time, seats:seats, cost:cost})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data){
  
}



function loadHTMLTable(data){
    const table=document.querySelector('table tbody');
 
    if(data.length === 0){
        table.innerHTML="<tr><td class='no-data' colspan='8'> No data </td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ ID,Name, Venue,Time, Seats,Cost }){
        tableHtml += "<tr>";
      //  tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${Name}</td>`;
        tableHtml += `<td>${Venue}</td>`;
        tableHtml += `<td>${Time}</td>`;
        tableHtml += `<td>${Seats}</td>`;
        tableHtml += `<td>${Cost}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${ID}>Delete></td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${ID}>Edit</td>`;
        tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml; 
//    sea.innerHTML = tableHtml;
 //   document.getElementById("table").innerHTML = tableHtml;
//sea.innerHTML= 'seats available' + `${Seats}`;
}