// email field related elements
let teacherMail = document.getElementById('form-email')

let emailField = document.getElementById('email-field')

let emailAlert = document.getElementById('email-alert')

// create field related elements

let formTeacherMarks = document.getElementById('form-teacher')

let formIdSubmit = document.getElementById('idnumber')

let formIdMarks = document.getElementById('marks')

let studentData = document.getElementById('student-data')



// functions for automated email 
let notificationEmail = function(data){
    let successStatement = `<strong>Congrats,</strong> The mail has been sent successfully.`
    let failureStatement = `<strong>Error:</strong> Mail cannot be sent, check you internet connection or contact your developer.`
    if(data == 'success'){
        
        return `<span>&times;</span> 
            ${successStatement}
        <br>`    
    } else {
        return `<span>&times;</span> 
            ${failureStatement}
        <br>`    
    }    
}    

// functions for create element

let studentDataTemplate = function(viva){
    return ` <tr>
    <td>${viva.idNumber}</td><td>${viva.Marks}</td> 
    <td>
    <button data-id="${viva._id}"  class="edit">Edit</button></td>
    <td><button data-id="${viva._id}"  class="delete">Delete</button></td>
    </tr> `
}



// send email without page reload and get notification
teacherMail.addEventListener('submit', function(event){
    event.preventDefault()
    document.getElementById("email-button").value="Sending";
    document.getElementById("email-button").disabled = true;
    axios.post('/teachers-email', {email: emailField.value}).then(function(response){
        if(response.data == 'success'){
            emailAlert.className = "alert2";
            console.log(response.data)                      
        }
        else{ 
            emailAlert.className = "alert";
            console.log('mail cannot be sent')
        }
        document.getElementById("email-button").value="Send";
        document.getElementById("email-button").disabled = false;
        emailAlert.insertAdjacentHTML('afterbegin', notificationEmail(response.data))
            setTimeout(function(){
                emailAlert.innerHTML = '';
            }, 10*1000);
    })
})


// create element feature 

formTeacherMarks.addEventListener('submit', function(event){
    event.preventDefault()
    axios.post('/teachers-submit', {idnumber: formIdSubmit.value, marks: formIdMarks.value}).then(function(response){
        console.log(response.data)
        if(response.data){
            studentData.insertAdjacentHTML('beforebegin', studentDataTemplate(response.data))
            formIdSubmit.value = ''
            formIdMarks.value = ''
            formIdSubmit.focus()


        } else {
            console.log('response failed : ', response)
        }
    })
})



document.addEventListener("click", function(anyName){


    // Delete Feature
    if(anyName.target.classList.contains("delete")){
        if(confirm("Do you really want to delete this item?")){
             axios.post('/delete-student', {id: anyName.target.getAttribute("data-id")}).then(function(){
                // reload page after editing data
                window.location.reload();
                
                
            }).catch(function(){
                alert("please try again later.")
            })
        } 
    }



                // update Feature
    if(anyName.target.classList.contains("edit")){
    
let userInput1 = prompt("Enter your corrected Student ID:", "Your changed ID"
)
let userInput2 = prompt("Enter your corrected Marks:", "Your changed marks"
)

if(userInput1 && userInput2){
    axios.post('/edit-student', {idnumber: userInput1, marks: userInput2, time: Date,id: anyName.target.getAttribute("data-id")}).then(function(res){
        console.log(res.data)
        alert(res.data.idNumber, window.location.reload()) 

        // you can pass parameter to load window after the alert popup

        
        
        
    }).catch(function(){
        alert("please try again later.")
    })
}

} 



}) 