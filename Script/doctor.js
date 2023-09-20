createDoctor = () => {
    const tempDoctor = {
        name: $('#name').val(),
        specialization: $('#specialization').val(), // Corrected the typo here
        contact: $('#contact').val(),
        availability: $('#availability').val(),
    };

    const database = firebase.firestore();
    database
        .collection('doctors')
        .add(tempDoctor)
        .then((response) => {
            console.log(response);
            loadDoctor(); // Reload the doctor list after adding a new doctor
        })
        .catch((error) => {
            console.log(error);
        });
};

const loadDoctor = () => {
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore
        .collection('doctors')
        .get()
        .then((result) => {
            result.forEach((records) => {
                const data = records.data();
                const row = `
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.specialization}</td>
                        <td>${data.contact}</td>
                        <td>${data.availability}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deleteData('${records.id}')">Delete</button> |
                            <button class="btn btn-success btn-sm" onclick="updateData('${records.id}')">Update</button>
                        </td>
                    </tr>
                `;
                $('#table-body').append(row);
            });
        });
};

doctorId = undefined;
const updateData=(id)=>{
    doctorId = id;
    const firestore = firebase.firestore();
    firestore
    .collection('doctors')
    .doc(doctorId)
    .get().then((response)=>{
        if(response.exists){
            const data = response.data();
            $('#name').val(data.name),
            $('#specialization').val(data.specialization),
            $('#contact').val(data.contact),
            $('#availability').val(data.availability)
        }
    })
}


const updateRecord = () => {
    if (doctorId) {
        const firestore = firebase.firestore();
        firestore
            .collection('doctors')
            .doc(doctorId)
            .update({
                name: $('#name').val(),
                specialization: $('#specialization').val(),
                contact: $('#contact').val(),
                availability: $('#availability').val(),
            })
            .then(() => {
                doctorId = undefined;
                loadDoctor();
            });
    }
}

const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('doctors')
            .doc(id)
            .delete()
            .then(()=>{
                    alert('deleted!');
                    doctorId = undefined;
                    loadDoctor();
            })
    }
}
