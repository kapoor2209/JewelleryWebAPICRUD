
// creating a Jewellery Object for data
var Jewellery = { Id: 0, Type: "", Metal: "", Price: 0, IsGemsFitted: "" }

/*************** creating helping all crud functions **********/


function ShowJewelleryItems(JewelleryItems) {
    // Iterate over the collection of data
    $("#JewelleryTable tbody").remove();
    $.each(JewelleryItems, function (index, Jewelleryitem) {
        // Add new row to the JewelleryTable
        AddNewTableRow(Jewelleryitem);
    });
}

// adds new Jewellery
function SaveJewellery(item) {
    var JewelleryObj = Jewellery;
    JewelleryObj.Type = $("#type").val();
    JewelleryObj.Metal = $("#metal").val();
    JewelleryObj.Price = $('#price').val();
    JewelleryObj.IsGemsFitted = $('#gem').is(":checked") ? "Yes" : "No";

    // setting ajax settings
    var AjaxSettings = {};
    AjaxSettings.url = "/api/Jewelleries";
    AjaxSettings.type = "POST";
    AjaxSettings.contentType = "application/json";
    AjaxSettings.dataType = "html";
    console.log(JewelleryObj);
    AjaxSettings.data = JSON.stringify(JewelleryObj);
  
    // on scuccess
    AjaxSettings.success = function (msg) {
        // update list
        getJewelleryList();
        // show message
        alert("Jewellery Added Successfully", "success");

    },
        // on error
        AjaxSettings.error = function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
        alert(err.Message);
        };
    $.ajax(AjaxSettings);
}

// to update Jewellery data
function JewelleryUpdate(item) {
    // get jewellery id
    var id = $(item).data("id");

    var JewelleryObj = Jewellery;
    JewelleryObj.Id = $(item).data("id");
    JewelleryObj.Type = $("#type").val();
    JewelleryObj.Metal = $("#metal").val();
    JewelleryObj.Price = $('#price').val();
    JewelleryObj.IsGemsFitted = $('#gem').is(":checked") ? "yes" : "no";

    var AjaxSettings = {};
    AjaxSettings.url = "/api/Jewelleries/" + id
    AjaxSettings.type = "PUT";
    AjaxSettings.contentType = "application/json";
    AjaxSettings.dataType = "html";
    AjaxSettings.data = JSON.stringify(JewelleryObj);
    AjaxSettings.success = function (msg) {
        alert("Jewellery item updated successfully", "success");
    };
    AjaxSettings.error = function () {
        alert("Jewellery Update Error!", "error");
    };
    $.ajax(AjaxSettings);
}


// to delete Jewellery data
function JewelleryDelete(item) {
    var id = $(item).data("id");
    var AjaxSettings = {};
    AjaxSettings.url = "/api/Jewelleries/" + id;
    AjaxSettings.type = "DELETE";
    AjaxSettings.dataType = "html";
    // on success
    AjaxSettings.success = function (msg) {

        alert("Jewellery Item deleted Successfully", "success");
        getJewelleryList();
    };
    // on error
    AjaxSettings.error = function () {
        alert("Jewellery delete error", "error");
    };
    $.ajax(AjaxSettings);
}


//get all the Jewelleries data from API
function getJewelleryList() {
    // Calling API AJX
    $.ajax({
        url: '/api/Jewelleries/',
        type: 'GET',
        dataType: 'json',
        success: function (JewelleryItems) {
            ShowJewelleryItems(JewelleryItems);
        },
        error: function (request, message, error) {
            ShowErrorMessage(request, message, error);
        }
    });
}


// When error occurs this functon acts
function ShowErrorMessage(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" + request.responseJSON.Message + "\n";
    }
    alert(msg);
}


// Add a row to the JewelleryTable
function AddNewTableRow(Jewelleryitem) {
    // make sure  <tbody> tag exists
    if ($("#JewelleryTable tbody").length == 0) {
        // add one if not
        $("#JewelleryTable").append("<tbody></tbody>");
    }
    // at the end Append row
    $("#JewelleryTable tbody").append(
        CreateTableBodyStructure(Jewelleryitem));
}
// construct Table body
function CreateTableBodyStructure(Jewelleryitem) {
    // building row for table 
    var Row = "<tr>" +
                    "<td>" + Jewelleryitem.Type + "</td>" +
                    "<td>" + Jewelleryitem.Metal + "</td>" +
                    "<td>" + Jewelleryitem.Price + "</td>" +
        "<td>" + Jewelleryitem.IsGemsFitted + "</td>" +
        "<td>" + "<button type='button' " + "onclick='JewelleryUpdate(this);' " + "class='btn-update' " + "data-id='" + Jewelleryitem.Id + "' " + "data-type='" + Jewelleryitem.Type + "' " + "data-metal='" + Jewelleryitem.Metal + "' " + "data-price='" + Jewelleryitem.Price + "' " + "data-gem='" + Jewelleryitem.IsGemsFitted + "' " + ">" + "Update" + "</button> " + " <button type='button' " + "onclick='JewelleryDelete(this);'" + "class='btn-delete' " + "data-id='" + Jewelleryitem.Id + "'>" + "Delete" + "</button>" + "</td>" +
        "</tr>";
    return Row;
}


$(document).ready(
    function () {
        getJewelleryList();
    }
);