// Write your script here
// Write your script here
const logout = document.getElementById('logout');
const input1 = document.getElementById('inputs');
const input2 = document.getElementById('inputs2');


if (!localStorage.getItem('currUser')) {
    location.href = '../login/index.html';
}
else {
    let user = JSON.parse(localStorage.getItem('currUser'));
    document.getElementById('first-name').value = user.firstName;
    document.getElementById('last-name').value = user.lastName;
}

// logout
logout.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log("HEllo");
    localStorage.removeItem('currUser');
    location.href = '../login/index.html';
})




// change firstname and lastname
input1.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    if (!firstName || !lastName) {
        document.getElementById('message').style.display = 'inline';
        document.getElementById('message').setAttribute('class', 'red')
        document.getElementById('message').innerText = 'Error :All Fields are Mandatory.'
        return;
    }
    let user = JSON.parse(localStorage.getItem('currUser'));

    user.firstName = firstName;
    user.lastName = lastName;
    let email = user.email;

    localStorage.setItem('currUser', JSON.stringify(user));


    let totalUser = JSON.parse(localStorage.getItem('totalUser'));

    let ind;

    // console.log('email',email);
    // console.log('total',totalUser);

    //to get the element(obj) and its index from the totaluser array  
    totalUser.forEach((ele, index) => {
        if (ele.email == email) {
            console.log(ele);
            user = ele;
            ind = index;
        }
    })


    user.firstName = firstName;
    user.lastName = lastName;

    // will make the changes in user(obj) at the correct index 
    totalUser[ind] = user;

    localStorage.setItem('totalUser', JSON.stringify(totalUser));

    document.getElementById('message').style.display = 'inline';
    document.getElementById('message').setAttribute('class', 'green')
    document.getElementById('message').innerText = 'Profile Edited Successfully';

    setTimeout(() => {
        document.getElementById('message').style.display = 'none';
        input1.reset();
    }, 1500)
})





// change firstname and lastname
input2.addEventListener('submit', (event) => {
    event.preventDefault();

    const oldPass = document.getElementById('old-pass').value;
    const newPass = document.getElementById('new-pass').value;
    const confNewPass = document.getElementById('conf-new-pass').value;


    if (!oldPass || !newPass || !confNewPass) {
        document.getElementById('message2').style.display = 'inline';
        document.getElementById('message2').setAttribute('class', 'red')
        document.getElementById('message2').innerText = 'Error :All Fields are Mandatory.'
        return;
    }

    if (newPass != confNewPass) {
        document.getElementById('message2').style.display = 'inline';
        document.getElementById('message2').setAttribute('class', 'red')
        document.getElementById('message2').innerText = 'Error :New Password and Confirm New Password are not same.'
        return;
    }

    let user = JSON.parse(localStorage.getItem('currUser'));
    // console.log(user);

    if (oldPass != user.password) {
        document.getElementById('message2').style.display = 'inline';
        document.getElementById('message2').setAttribute('class', 'red')
        document.getElementById('message2').innerText = 'Error : Wrong Old Password .'
        return;
    }

    user.password = newPass;
    let email = user.email;

    localStorage.setItem('currUser', JSON.stringify(user));

    // console.log('email',email);

    let totalUser = JSON.parse(localStorage.getItem('totalUser'));

    let ind;

    totalUser.forEach((ele, index) => {
        if (ele.email == email) {
            console.log(ele);
            user = ele;
            ind = index;
        }
    })


    user.password = newPass;

    totalUser[ind] = user;

    localStorage.setItem('totalUser', JSON.stringify(totalUser));

    document.getElementById('message2').style.display = 'inline';
    document.getElementById('message2').setAttribute('class', 'green')
    document.getElementById('message2').innerText = 'Password Changed Successfully';

    setTimeout(() => {
        document.getElementById('message2').style.display = 'none';
        input2.reset();
    }, 1500)

})









