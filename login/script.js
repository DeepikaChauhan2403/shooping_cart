const form = document.getElementById('inputs');

var totalUser=[];

if(localStorage.getItem('currUser')){
    document.getElementById('message').style.display='inline';
    document.getElementById('message').setAttribute('class','green')
    document.getElementById('message').innerText='Login Successfully';
}




form.addEventListener('submit',(event)=>{
    event.preventDefault();
    // console.log("Hello");

    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    if(!email || !password){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error :All Fields are Mandatory.'
        return;
    }

    let flag=false;
    let currUser;

    if(localStorage.getItem('totalUser')){
        totalUser=JSON.parse(localStorage.getItem('totalUser'));


        totalUser.forEach((user)=>{
            if(user.email==email){
                flag=true;
                user.token=generateToken();
                currUser=user;
                localStorage.setItem('currUser',JSON.stringify(user));
            }
        })

    }

    if(flag==true && password!=currUser.password){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error : Wrong Password.'
        return;
    }
    
    if(flag==false){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error : User does not Exist.'
        return;
    }


    document.getElementById('message').style.display='inline';
    document.getElementById('message').setAttribute('class','green')
    document.getElementById('message').innerText='Login Successfully';

    form.reset();

    setTimeout(()=>{  
        location.href='../shop/index.html';
     },1500);


})


function generateToken(){
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += String.fromCharCode(Math.floor(Math.random() * 256));
    }
    
    return btoa(token);
}