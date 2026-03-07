console.log("hello world")
document.getElementById("login-btn").addEventListener("click", function(){
   //getting the username
    const username = document.getElementById("Username");
   const uservalue = username.value; 
   console.log(uservalue);
   // getting password
   const password = document.getElementById("password");
   const passvalue = password.value;
   console.log(passvalue);
   // condition
   const a = "admin";
   const b = "admin123"
   if (uservalue == a && passvalue == b ){
    window.location.assign("./home.html");
   } else {
    alert("login failed");
    return
   }
})