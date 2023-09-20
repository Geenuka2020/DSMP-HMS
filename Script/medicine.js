
/*

const clearData=()=>{
    $('#name').val(""), 
    $('#quantity').val(""),
    $('#price').val("")
    $('#expirationDate').val("")
}


const loadInventory=()=>{
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore
        .collection('inventory')
        .get().then((result)=>{
            result.forEach((records)=>{
                const data = records.data();
                const row=`
                <tr>
                    <th>${records.id}</th>
                    <td>${data.name}</td>
                    <td>${data.quantity}</td>
                    <td>${data.price}</td>
                    <td>${data.expirationDate}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteData('${records.id}')">Delete</button> |
                        <button class="btn btn-success btn-sm" onclick="updateData('${records.id}')">Update</button>
                    </td>
                </tr>
                `;
                $('#table-body').append(row);
            });
    });

    
}
createInventory=()=>{
    if($('#price').val()>0 |$('#quantity').val()>0){
    const tempInventory={
        name:$('#name').val(), 
        quantity:$('#quantity').val(),
        price:$('#price').val(),
        expirationDate:$('#expirationDate').val()
    };
    const database=firebase.firestore();
    database
    .collection("inventory")
    .add(tempInventory)
    .then((response)=>{
        closePopUp();
        toastr.options.closeMethod = 'fadeOut';
        toastr.options.closeDuration = 300;
        toastr.options.closeEasing = 'swing';
        toastr.success('Added!', 'success!')
        loadInventory();
    })
    .catch((error)=>{
        alert("error")
        console.log(error);
    })
    }else{
        alert("prevent negative quantities or invalid input")
    }
}
inventoryId=undefined;
const updateData=(id)=>{
    inventoryId=id;
    const firestore = firebase.firestore();
    firestore
        .collection('inventory')
        .doc(inventoryId)
        .get().then((response)=>{
            if (response.exists) {
                const data = response.data();
                $('#name').val(data.name), 
                $('#quantity').val(data.quantity),
                $('#price').val(data.price)
                $('#expirationDate').val(data.expirationDate)
                openPopUpEdit();
            }
    })
}
const updateRecord=()=>{
    if (inventoryId){
        const firestore = firebase.firestore();
        firestore
            .collection('inventory')
            .doc(inventoryId)
            .update({
                name:$('#name').val(), 
                quantity:$('#quantity').val(),
        price:$('#price').val(),
        expirationDate:$('#expirationDate').val()
            }).then(()=>{
            inventoryId=undefined;
            closePopUp();
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.success('Edit!', 'success!')
            loadInventory();
            
        })
    }
}

const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('inventory')
            .doc(id)
            .delete()
            .then(()=>{

                toastr.options.closeMethod = 'fadeOut';
                toastr.options.closeDuration = 300;
                toastr.options.closeEasing = 'swing';
                toastr.success('Deleted!', 'success!')
                inventoryId=undefined;
                loadInventory();
            })
    }
}
*/

// Function to create medicine inventory
function createInventory() {
    const name = $('#name').val();
    const quantity = $('#quantity').val();
    const price = $('#price').val();
    const expirationDate = $('#expirationDate').val();

 
    // Check if quantity is a valid positive number
    if (isNaN(quantity) || parseFloat(quantity) <= 0) {
        alert('Please enter a valid positive quantity');
        return;
    }

    const inventoryItem = {
        name: name,
        quantity: parseInt(quantity), // Convert quantity to a number
        price: parseFloat(price),     // Convert price to a floating-point number
        expirationDate: expirationDate
    };

    const database = firebase.firestore();
    database
        .collection('Inventory')
        .add(inventoryItem)
        .then((response) => {
            console.log('Medicine inventory item added:', response);
            // Clear the input fields after successfully adding the item
            $('#name').val('');
            $('#quantity').val('');
            $('#price').val('');
            $('#expirationDate').val('');
        })
        .catch((error) => {
            console.error('Error adding medicine inventory item:', error);
        });
}
/*
// Function to load medicine inventory items
function loadInventory() {
    const database = firebase.firestore();
    const tableBody = $('#table-body');

    // Clear the existing table rows
    tableBody.empty();

    database
        .collection('Inventory')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const inventoryItem = doc.data();
                const row = `
                    <tr>
                        <th scope="row">${doc.id}</th>
                        <td>${inventoryItem.name}</td>
                        <td>${inventoryItem.quantity}</td>
                        <td>${inventoryItem.price}</td>
                        <td>${inventoryItem.expirationDate}</td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteInventory('${doc.id}')">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.append(row);
            });
        })
        .catch((error) => {
            console.error('Error loading medicine inventory:', error);
        });
}

// Call the loadInventory() function when the page loads
$(document).ready(() => {
    loadInventory();
});
*/

const loadInventory = () => {
    $('#table-body').empty();
    const firestore = firebase.firestore();
    firestore.collection('Inventory')
    .get().then((result) => {
        result.forEach((records) => {
            const data = records.data();
            const row = `
                <tr>
                    <td>${records.id}</td>
                    <td>${data.name}</td>
                    <td>${data.quantity}</td>
                    <td>${data.price}</td>
                    <td>${data.expirationDate}</td>
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

inventoryId = undefined;
const deleteData=(id)=>{
    if (confirm('Are you sure?')){
        const firestore = firebase.firestore();
        firestore
            .collection('Inventory')
            .doc(id)
            .delete()
            .then(()=>{
                    alert('deleted!');
                    inventoryId = undefined;
                    loadInventory();
            })
    }
}

inventoryId = undefined;
const updateData=(id)=>{
    inventoryId = id;
    const firestore = firebase.firestore();
    firestore
    .collection('Inventory')
    .doc(inventoryId)
    .get().then((response)=>{
        if(response.exists){
            const data = response.data();
            $('#name').val(data.name),
            $('#quantity').val(data.quantity),
            $('#price').val(data.price),
            $('#expirationDate').val(data.expirationDate)
        }
    })
}

const updateRecord = () => {
    if (inventoryId) {
        const firestore = firebase.firestore();
        firestore
            .collection('Inventory')
            .doc(inventoryId)
            .update({
                name: $('#name').val(),
                quantity: $('#quantity').val(),
                price: $('#price').val(),
                expirationDate: $('#expirationDate').val()
            })
            .then(() => {
                inventoryId = undefined;
                loadInventory();
            });
    }
}