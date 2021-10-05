// student data template
let studentDataTime = function(viva){
    return `
    <tr id="student-data">                  
    <td class="idText">${viva.idNumber}</td><td class="marksText">${viva.time}</td> 
    <td>
    </tr> 
      `
}

// select the html element where the data is going to be updated

let studentData = document.getElementById('student-data')

// send get request using axios continuously
let requestStudentsPageData = function(){
    let datetime = new Date()
    let ExactTime = datetime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    console.log(ExactTime)
    axios.post('/students-data', {time: ExactTime}).then(function(response){
        // document. getElementById(“div_name”).innerText +=  “data” ; append method
        let x =0
        // for(x=0; x<=response.data.length; x++){

        console.log(response.data.map(function(data){
            return studentDataTime(data)
        }))
            console.log('response : ', response.data.length)
            document.getElementById('student-data').innerHTML = response.data.map(function(data){
               return studentDataTime(data)
            }).join(`<br>`)
        // }
    })
}
setInterval(requestStudentsPageData, 3*1000);
