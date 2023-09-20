
createPatient=()=>{
    const tempPatient = {
        name: $('#name').val(),
        age: $('#age').val(),
        gender: $('#gender').val(),
        contact: $('#contact').val(),
        medhistory: $('#medhistory').val(),
    }
    console.log(tempPatient);  

    const database = firebase.firestore();
    database
    .collection('patients')
    .add (tempPatient)
    .then ((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    });
}

const loadPatient = () => {
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore.collection('patients')
    .get().then((result) => {
        result.forEach((records) => {
            const data = records.data();
            const row = `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.age}</td>
                    <td>${data.gender}</td>
                    <td>${data.contact}</td>
                    <td>${data.medhistory}</td>
                    <td>
                        <button class ="btn btn-danger btn-sm" onclick = "deleteData('${records.id}')"> Delete </button> |
                        <button class ="btn btn-success btn-sm" onclick = "updateData('${records.id}')"> Update </button>
                    </td>
                </tr>
            `;
            $('#table-body').append(row);
        });
    });
}
patientId = undefined;
const updateData=(id)=>{
    patientId = id;
    const firestore = firebase.firestore();
    firestore
    .collection('patients')
    .doc(patientId)
    .get().then((response)=>{
        if(response.exists){
            const data = response.data();
            $('#name').val(data.name),
            $('#age').val(data.age),
            $('#gender').val(data.gender),
            $('#contact').val(data.contact),
            $('#medhistory').val(data.medhistory)
        }
    })
}


const updateRecord = () => {
    if (patientId) {
        const firestore = firebase.firestore();
        firestore
            .collection('patients')
            .doc(patientId)
            .update({
                name: $('#name').val(),
                age: $('#age').val(),
                gender: $('#gender').val(),
                contact: $('#contact').val(),
                medhistory: $('#medhistory').val(),
            })
            .then(() => {
                patientId = undefined;
                loadPatient();
            });
    }
}


const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('patients')
            .doc(id)
            .delete()
            .then(()=>{
                    alert('deleted!');
                    patientId = undefined;
                    loadPatient();
            })
    }
}

const printData=(i)=>{
    window.open("./Report/reportPatient.html");
}