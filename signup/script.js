const form = document.getElementById('inputs');

var totalUser = [];

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    // console.log('hello');

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    const confPass = document.getElementById('confirm-pass').value;

    if(!firstName || !lastName || !email || !pass || !confPass){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error :All Fields are Mandatory.'
        return;
    }

    if(pass!=confPass){
        document.getElementById('message').style.display='inline';
        document.getElementById('message').setAttribute('class','red')
        document.getElementById('message').innerText='Error :Passwrod and Confirm Password Should be same.'
        return;
    }

    var user={
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:pass
    }

    let flag=false;
    if(localStorage.getItem('totalUser')){
        // console.log("hello");
        totalUser=JSON.parse(localStorage.getItem('totalUser'));
        totalUser.forEach((user)=>{
            if(user.email==email){
                flag=true;
                document.getElementById('message').style.display='inline';
                document.getElementById('message').setAttribute('class','red')
                document.getElementById('message').innerText='Error :User Already Exist.';
            }
        })
    }
    if(flag==true){
        //user already exist;
        return;
    }

    totalUser.push(user);
    // console.log("user",user);
    // console.log(totalUser);

    localStorage.setItem('totalUser',JSON.stringify(totalUser));

    document.getElementById('message').style.display='inline';
    document.getElementById('message').setAttribute('class','green')
    document.getElementById('message').innerText='User Successfully Added';

    form.reset();

    setTimeout(()=>{  
       location.href='../login/index.html';
    },1500);

})

