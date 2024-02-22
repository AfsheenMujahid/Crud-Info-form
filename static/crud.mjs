  function addData() {
     var name = document.getElementById('name').value;
     var email = document.getElementById('email').value;
     var id = document.getElementById('id').value;
     var table = document.getElementById('dataTable');
     var newRow = table.insertRow(table.rows.length);
     var cell1 = newRow.insertCell(0);
     var cell2 = newRow.insertCell(1);
     var cell3 = newRow.insertCell(2);
     var cell4 = newRow.insertCell(3);
     cell1.innerHTML = name;
     cell2.innerHTML = email;
     cell3.innerHTML = id;
     cell4.innerHTML = '<button onclick="editData(this)">Edit</button> <button onclick="deleteData(this)">Delete</button>';
 }
 function editData(button) {
    var row = button.parentNode.parentNode;
    var name = row.cells[0].innerHTML;
    var email = row.cells[1].innerHTML;
    var id = row.cells[2].innerHTML;

    // Store the original values for reverting changes
    row.originalValues = { name, email, id };

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('id').value = id;

    // Change the button to "Save" and "Cancel"
    button.innerHTML = "Save";
    button.setAttribute("onclick", "saveData(this)");
    var deleteButton = row.cells[3].getElementsByTagName("button")[1];
    deleteButton.innerHTML = "Cancel";
    deleteButton.setAttribute("onclick", "cancelEdit(this)");
}
function saveData(button) {
    var row = button.parentNode.parentNode;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var id = document.getElementById('id').value;

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = name;
    cell2.innerHTML = email;
    cell3.innerHTML = id;
    cell4.innerHTML = '<button onclick="editData(this)">Edit</button> <button onclick="deleteData(this)">Delete</button>';
}

function cancelEdit(button) {
    var row = button.parentNode.parentNode;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var id = document.getElementById('id').value;

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = name;
    cell2.innerHTML = email;
    cell3.innerHTML = id;
    cell4.innerHTML = '<button onclick="editData(this)">Edit</button> <button onclick="deleteData(this)">Delete</button>';
}

function deleteData(button) {
    var row = button.parentNode.parentNode;
    row.remove();
}

function searchData() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('dataTable');
    tr = table.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}
 
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("id").value = "";
}

document.getElementById('submitButton').addEventListener('click', function() {
    clearForm();   
});
 

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addData();
      }
    });
  
    document.getElementById('email').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addData();
      }
    });
  
    document.getElementById('id').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addData();
      }
    });
  });

 
function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var id = document.getElementById('id').value;
    var nameError = document.getElementById('nameError');
    var emailError = document.getElementById('emailError');
    var idError = document.getElementById('idError');

    if (name === '') {
        nameError.style.display = 'block';
        return false;
    } else {
        nameError.style.display = 'none';
    }

    if (email === '') {
        emailError.style.display = 'block';
        return false;
    } else {
        emailError.style.display = 'none';
    }

    if (id === '') {
        idError.style.display = 'block';
        return false;
    } else {
        idError.style.display = 'none';
    }

    return true; // Form will be submitted if all fields are filled
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('id').value = '';

    document.getElementById('nameError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('idError').style.display = 'none';
}


function searchData() {
    // Add your search functionality here
}