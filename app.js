const studentList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//create element and render students
function renderStudent(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    studentList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('students').doc(id).delete();
    });


    // db.collection('students').doc(id).update({
    //     name:form1.name.value,
    //     city:form1.city.value
    // });

}


//getting data

// b.collection('students').where('city', '==', 'gujranwala').get().then((snapshot) => {
// db.collection('students').orderBy('name').get().then((snapshot) => {
//db.collection('students').where('city',  '==', 'Gujranwala').orderBy('name').get().then((snapshot) => {

// db.collection('students').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderStudent(doc);
//     })
// });


//saving data
form.addEventListener('submit', (e) => {
   e.preventDefault();
   db.collection('students').add({
       name: form.name.value,
       city: form.city.value
   });
    form.name.value = '';
    form.city.value = '';
});

//real-time listner
db.collection('students').orderBy('city').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderStudent(change.doc);
        } else if(change.type == 'removed'){
            let li = studentList.querySelector('[data-id=' + change.doc.id + ']');
            studentList.removeChild(li);
        }
    })
});