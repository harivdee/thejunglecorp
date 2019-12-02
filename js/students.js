'use strict';
function init() {

    let _nextId = 1;
    let _activeId = 0;
    let _row = null;

    $('#saveForm').click(function () {
        $('#student-table').removeClass('hide');
        studentUpdate();
        // $('#student-table').addClass('show');
    });

    function studentUpdate() {
        if ($("#saveForm").attr("value") == "Update") {
            studentUpdateInTable(_activeId);
        } else if ($("#student1").val() != null &&
            $("#student1").val() != '') {
            // Add student to Table
            studentAddToTable();
            // Clear form fields
            formClear();
            // Focus to student name field
            $("#student1").focus();
        }
    }

    function formClear() {
        $("#student1").val("");
        $("#student2").val("");
        $("#student3").val("");
        $("#student4").val("");
    }

    function studentAddToTable() {
        // Does tbody tag exist ? add one if not
        if ($("#student-table tbody").length == 0) {
            $("#student-table")
                .append("<tbody></tbody>");
        }
        // Append student to table
        $("#student-table tbody").append(
            studentBuildTableRow(_nextId));
        // Increment next ID to use
        _nextId += 1;
    }

    function studentBuildTableRow(id) {
        let ret =
            "<tr>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.editDisplay(this);' " +
            "class='btn btn-default btn-edit' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" + $("#student1").val() + "</td>" +
            "<td>" + $("#student2").val() + "</td>" +
            "<td>" + $("#student3").val() + "</td>" +
            "<td>" + $("#student4").val() + "</td>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.displayDelete(this);' " +
            "class='btn btn-default btn-delete' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "</tr>"

        return ret;
    }

    george_el.editDisplay = function(ctl) {
        _row = $(ctl).parents("tr");
        let cols = _row.children("td");
        _activeId = $($(cols[0]).children("button")[0]).data("id");
        $("#student1").val($(cols[1]).text());
        $("#student2").val($(cols[2]).text());
        $("#student3").val($(cols[3]).text());
        $("#student4").val($(cols[4]).text());
        // Change Add Button Text
        $("#saveForm").attr("value", "Update");
    }

    george_el.displayDelete = function(ctl) { 
        $(ctl).parents("tr").remove();
    }

    function studentUpdateInTable(id) {
        // Find Student in <table>
        let row = $("#student-table button[data-id='" + id + "']").parents("tr")[0];
        // Add changed student to table
        $(row).after(studentBuildTableRow(id));
        // Remove original student
        $(row).remove();
        formClear();
        $("#saveForm").attr("value", "Add");
    }

    george_el.validateDOB = function () {
        let currentDate = new Date();
        return ($('#student4') >= currentDate)
    }
}

$(init);

const george_el = {};


// function editDisplay(ctl) {
//     _row = $(ctl).parents("tr");
//     let cols = _row.children("td");
//     _activeId = $($(cols[0]).children("button")[0]).data("id");
//     $("#student1").val($(cols[1]).text());
//     $("#student2").val($(cols[2]).text());
//     $("#student3").val($(cols[3]).text());
//     $("#student4").val($(cols[4]).text());
//     // Change Add Button Text
//     $("#saveForm").attr("value", "Update");
// }

// function displayDelete(ctl) {
//     $(ctl).parents("tr").remove();
// }

// function studentBuildTableRow(id) {
//     let ret =
//         "<tr>" +
//         "<td>" +
//         "<button type='button' " +
//         "onclick='editDisplay(this);' " +
//         "class='btn btn-default btn-edit' " +
//         "data-id='" + id + "'>" +
//         "</button>" +
//         "</td>" +
//         "<td>" + $("#student1").val() + "</td>" +
//         "<td>" + $("#student2").val() + "</td>" +
//         "<td>" + $("#student3").val() + "</td>" +
//         "<td>" + $("#student4").val() + "</td>" +
//         "<td>" +
//         "<button type='button' " +
//         "onclick='displayDelete(this);' " +
//         "class='btn btn-default btn-delete' " +
//         "data-id='" + id + "'>" +
//         "</button>" +
//         "</td>" +
//         "</tr>"

//     return ret;
// }