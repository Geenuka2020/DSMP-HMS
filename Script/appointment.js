let isAvailable=false;
const loadIds = ()=>{
    loadDoctorIds();
    loadPatientIds();
    loadBooking();
}
const clearData=()=>{
    $('#name').val("");
    $('#age').val("");
    $('#gender').val("")
    $('#contact').val("")
    $('#medhistory').val("")
    $('#dName').val("");
    $('#specialization').val("");
    $('#contact').val("")
    $('#availability').val("")
    isAvailable=undefined;
}
const loadPatientIds = () => {
    $('#patient-id').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('patients')
        .get()
        .then((records => {
            records.forEach((result) => {
                const option = $('<option></option>').val(result.id).text(result.id);
                $('#patient-id').append(option);
            })
        }))
}
const loadDoctorIds = () => {
    $('#doctor-id').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('doctors')
        .get()
        .then((records => {
            records.forEach((result) => {
                const option = $('<option></option>').val(result.id).text(result.id);
                $('#doctor-id').append(option);
            })
        }))
}

$('#patient-id').on("change",function (){
    const patientId=$(this).val();
    const firestore = firebase.firestore();
    firestore
        .collection('patients')
        .doc(patientId)
        .get().then((response)=>{
        if (response.exists) {
            const data = response.data();
            $('#name').val(data.name);
            $('#age').val(data.age);
            $('#gender').val(data.gender)
            $('#contact').val(data.contact)
            $('#medicalHistory').val(data.medhistory)

        }
    })
});
$('#doctor-id').on("change",function (){
    const doctorId=$(this).val();
    const firestore = firebase.firestore();
    firestore
        .collection('doctors')
        .doc(doctorId)
        .get().then((response)=>{
        if (response.exists) {
            const data = response.data();
            $('#doctorName').val(data.name);
            $('#specialization').val(data.specialization);
            $('#doctorContact').val(data.contact)
            $('#availability').val(data.availability)
            isAvailable=data.availability;
            console.log(isAvailable);
        }
    })
});

const createAppointment=()=>{

    if(isAvailable==="available"){
        let obj={
            patients:{
                patientId:$('#patient-id').val(), 
                name:$('#name').val(), 
                age:$('#age').val(),
                gender:$('#gender').val(),
                contact:$('#contact').val(),
                medicalHistory:$('#medicalHistory').val()
            },
            doctors:{
                doctorId:$('#doctor-id').val(), 
                name:$('#doctorName').val(), 
                specialization:$('#specialization').val(),
                contact:$('#doctorContact').val(),
                availability: $('#availability').val()
            },
            date:$('#date').val()
        }
        const firestore = firebase.firestore();

        firestore
            .collection('booking')
            .add(obj)
            .then((response)=>{
                toastr.success('Saved!', 'success!')
                clearData();
                loadBooking();
            }).catch((error)=>{
                 console.log(error);
            });
    }else{
        alert("Doctor not available")
    }
}
const loadBooking=()=>{
    $('#table-body').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('booking')
        .get().then((result)=>{
        result.forEach((records)=>{
            const data = records.data();
            const row=`
                <tr>
                    <td>${records.id}</td>
                    <td>${data.patients.name}</td>
                    <td>${data.doctors.name}</td>
                    <td>${data.date}</td>
                    <td>
                        <button class ="btn btn-danger btn-sm" onclick = "deleteData('${records.id}')"> Delete </button>
                    </td>
                </tr>
                `;
            $('#table-body').append(row);
        });
    });
}



const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('booking')
            .doc(id)
            .delete()
            .then(()=>{
                    alert('deleted!');
                    appointmentId = undefined;
                    loadBooking();
            })
    }
}


const printData=()=>{
    window.open(`./Report/reportAppointment.html?from=${$('#fromDate').val()}&to=${$('#toDate').val()}`);
}