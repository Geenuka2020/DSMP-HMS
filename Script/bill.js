const loadData = ()=>{
    loadPatientIds();
    loadBilling();
}
const clearData=()=>{
    $('#name').val("");
    $('#age').val("");
    $('#gender').val("")
    $('#contact').val("")
    $('#medicalHistory').val("")
    $('#serviceProvide').val("")
    $('#cost').val("")
    $('#paymentStatus').val("")
    $('#payment').val("")
    $('#balance').val("")
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
const billing =()=>{
    let balance=$('#payment').val()-$('#cost').val()
    $('#balance').val(balance)
    let obj={
        patients:{
            patientId:$('#patient-id').val(), 
            name:$('#name').val(), 
            age:$('#age').val(),
            gender:$('#gender').val(),
            contact:$('#contact').val(),
            medhistory:$('#medicalHistory').val()
        },
        serviceProvide:$('#serviceProvide').val(),
        cost:$('#cost').val(),
        paymentStatus:$('#paymentStatus').val()
    }
    const firestore = firebase.firestore();

        firestore
            .collection('billing')
            .add(obj)
            .then((response)=>{
                toastr.success('Saved!', 'success!')
                loadBilling();
                clearData();
            }).catch((error)=>{
                 console.log(error);
            });
        
}
const loadBilling=()=>{
    $('#table-body').empty();

    const firestore = firebase.firestore();
    firestore
        .collection('billing')
        .get().then((result)=>{
        result.forEach((records)=>{
            const data = records.data();
            const row=`
                <tr>
                    <td>${records.id}</td>
                    <td>${data.patients.name}</td>
                    <td>${data.serviceProvide}</td>
                    <td>${data.cost}</td>
                    <td>${data.paymentStatus}</td>
                    <td>
                        <button class ="btn btn-danger btn-sm" onclick = "deleteData('${records.id}')"> Delete Record </button>
                    </td>
                </tr>
                `;
            $('#table-body').append(row);
        });
    });
}
const printData=(i)=>{
    window.open("./Report/reportBilling.html");
}


const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('billing')
            .doc(id)
            .delete()
            .then(()=>{
                    alert('deleted!');
                    billId = undefined;
                    loadBilling();
            })
    }
}