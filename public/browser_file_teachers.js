// note: There are some variables here, but in code we cannot use variables everywhere to shorten our code, it may get an error that 'cannot find the parent element', so for this reason, we have to use the full code even if it it's not appropriate.

// email field related elements
let teacherMail = document.getElementById('form-email')

let emailField = document.getElementById('email-field')

let emailAlert = document.getElementById('email-alert')

let emailButton = document.getElementById("email-button")

// create field related elements

let formTeacherMarks = document.getElementById('form-teacher')

let formIdSubmit = document.getElementById('idnumber')

let formIdMarks = document.getElementById('marks')

let studentData = document.getElementById('student-data')

let studentTable = document.getElementById('student-table')



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
    return `
    <tr id="student-data">                  
    <td class="idText">${viva.idNumber}</td><td class="marksText">${viva.Marks}</td> 
    <td>
    <button data-id="${viva._id}"  class="edit">Edit</button></td>
    <td><button data-id="${viva._id}"  class="delete">Delete</button></td>
    </tr>   `
}



// send email without page reload and get notification
teacherMail.addEventListener('submit', function(event){
    event.preventDefault()
    emailButton.value="Sending";
    emailButton.disabled = true;
    axios.post('/teachers-email', {email: emailField.value}).then(function(response){
        if(response.data == 'success'){
            emailAlert.className = "alert2";
            console.log(response.data)                      
        }
        else{ 
            emailAlert.className = "alert";
            console.log('mail cannot be sent')
        }
        emailButton.value="Send";
        emailButton.disabled = false;
        emailField.value = ''
        emailField.focus()
        emailAlert.insertAdjacentHTML('afterbegin', notificationEmail(response.data))
            setTimeout(function(){
                emailAlert.innerHTML = '';
            }, 10*1000);
    })
})


// create element feature 

formTeacherMarks.addEventListener('submit', function(event){
    event.preventDefault()
    let datetime = new Date()
    let ExactTime = datetime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    // let datetime = `${datetime.getHours()} : ${datetime.getMinutes()} : ${datetime.getSeconds()}`
    axios.post('/teachers-submit', {idnumber: formIdSubmit.value, marks: formIdMarks.value, time: ExactTime}).then(function(response){
        console.log(response.data)
        if(response.data){
            console.log(studentTable, !studentTable.contains(document.getElementById('student-data')))
            if(studentTable.contains(document.getElementById('student-data')) == false){
                // this condition successfully executes, but the thing is, it doesn't contain any student-data id element, so we have to first make one and then set it to submitted response.
                document.getElementById('student-table').insertAdjacentHTML('beforeend',studentDataTemplate(response.data))
                formIdSubmit.value = ''
                formIdMarks.value = ''
                formIdSubmit.focus()
            } else {

                document.getElementById('student-data').insertAdjacentHTML('beforebegin', studentDataTemplate(response.data))
                // must use the full code instead of studentData variable, it cannot find the parent
                formIdSubmit.value = ''
                formIdMarks.value = ''
                formIdSubmit.focus()
            }


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
                anyName.target.parentElement.parentElement.remove()
                // window.location.reload();
                
                
            }).catch(function(){
                alert("please try again later.")
            })
        } 
    }



                // update Feature
    if(anyName.target.classList.contains("edit")){
    let typedID = anyName.target.parentElement.parentElement.querySelector('.idText').innerHTML
    let typedMarks = anyName.target.parentElement.parentElement.querySelector('.marksText').innerHTML
    
let userInputID = prompt("Enter your corrected Student ID:", typedID)
let userInputMarks = prompt("Enter your corrected Marks:", typedMarks)

if(userInputID && userInputMarks){
    axios.post('/edit-student', {idnumber: userInputID, marks: userInputMarks, id: anyName.target.getAttribute("data-id")}).then(function(res){
        console.log(res.data)
        anyName.target.parentElement.parentElement.querySelector('.idText').innerHTML = userInputID
        anyName.target.parentElement.parentElement.querySelector('.marksText').innerHTML = userInputMarks  
    }).catch(function(){
        alert("please try again later.")
    })
}

} 



}) 