
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
    axios.post('/edit-student', {idnumber: userInput1, marks: userInput2, time: Date,id: anyName.target.getAttribute("data-id")}).then(function(){
        
        // reload page after editing data
        window.location.reload();
        
        
    }).catch(function(){
        alert("please try again later.")
    })
}

} 
}) 