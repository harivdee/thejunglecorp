'use strict';
function init() {
    let _nextId = 1;
    let _activeId = 0;
    let _row = null;

    $('#saveForm').click(function () {
        $('#assignment-table').removeClass('hide');
        assignmentUpdate();
        // $('#assignment-table').addClass('show');
    })

    function assignmentUpdate() {
        if ($("#saveForm").attr("value") == "Update") {
            assignmentUpdateInTable(_activeId);
        } else if ($("#assignment1").val() != null &&
            $("#assignment1").val() != '') {
            // Add assignment to Table
            assignmentAddToTable();
            // Clear form fields
            formClear();
            // Focus to assignment title field
            $("#assignment1").focus();
        }
    }

    function formClear() {
        $("#assignment1").val("");
        $("#assignment2").val("");
        $("#assignment3").val("");
        $("#assignment4").val("");
        $("#assignment5").val("");
    }

    function assignmentAddToTable() {
        // Does tbody tag exist ? add one if not
        if ($("#assignment-table tbody").length == 0) {
            $("#assignment-table")
                .append("<tbody></tbody>");
        }
        // Append assignment to table
        $("#assignment-table tbody").append(
            assignmentBuildTableRow(_nextId));
        // Increment next ID to use
        _nextId += 1;
    }

    function assignmentBuildTableRow(id) {
        let ret =
            "<tr>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.editDisplay(this);' " +
            "class='btn btn-default btn-edit' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" + $("#assignment1").val() + "</td>" +
            "<td>" + $("#assignment2").val() + "</td>" +
            "<td>" + $("#assignment3").val() + "</td>" +
            "<td>" + $("#assignment4").val() + "</td>" +
            "<td>" + $("#assignment5").val() + "</td>" +
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
        $("#assignment1").val($(cols[1]).text());
        $("#assignment2").val($(cols[2]).text());
        $("#assignment3").val($(cols[3]).text());
        $("#assignment4").val($(cols[4]).text());
        $("#assignment5").val($(cols[5]).text());
        // Change Add Button Text
        $("#saveForm").attr("value", "Update");
    }

    george_el.displayDelete = function(ctl) {
        $(ctl).parents("tr").remove();
    }

    function assignmentUpdateInTable(id) {
        // Find Assignment in <table>
        let row = $("#assignment-table button[data-id='" + id + "']").parents("tr")[0];
        // Add changed assignment to table
        $(row).after(assignmentBuildTableRow(id));
        // Remove original assignment
        $(row).remove();
        formClear();
        $("#saveForm").attr("value", "Add");
    }
}
$(init);

const george_el = {};