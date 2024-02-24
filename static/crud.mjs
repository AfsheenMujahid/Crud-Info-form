
function validateForm() {
    var name = document.getElementById('name').value;
    var brand = document.getElementById('brand').value;
    var model = document.getElementById('model').value;
    var price = document.getElementById('price').value;
    var description = document.getElementById('description').value;

    var nameError = document.getElementById('nameError');
    var brandError = document.getElementById('brandError');
    var modelError = document.getElementById('modelError');
    var priceError = document.getElementById('priceError');
    var descriptionError = document.getElementById('descriptionError');

    if (name === '') {
        nameError.style.display = 'block';
        return false;
    } else {
        nameError.style.display = 'none';
    }

    if (brand === '') {
        brandError.style.display = 'block';
        return false;
    } else {
        brandError.style.display = 'none';
    }

    if (model === '') {
        modelError.style.display = 'block';
        return false;
    } else {
        modelError.style.display = 'none';
    }

    if (price === '') {
        priceError.style.display = 'block';
        return false;
    } else {
        priceError.style.display = 'none';
    }

    if (description === '') {
        descriptionError.style.display = 'block';
        return false;
    } else {
        descriptionError.style.display = 'none';
    }

    return true; // Form will be submitted if all fields are filled
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('brand').value = '';
    document.getElementById('model').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';

    document.getElementById('nameError').style.display = 'none';
    document.getElementById('brandError').style.display = 'none';
    document.getElementById('modelError').style.display = 'none';
    document.getElementById('priceError').style.display = 'none';
    document.getElementById('descriptionError').style.display = 'none';
}

function searchData() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
