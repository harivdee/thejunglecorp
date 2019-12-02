'use strict';
function init() {

    let _nextId = 1;
    let _activeId = 0;
    let _row = null;

    $('#saveForm').click(function () {
        $('#trainer-table').removeClass('hide');
        trainerUpdate();
    });


    function trainerUpdate() {
        if ($("#saveForm").attr("value") == "Update") {
            trainerUpdateInTable(_activeId);
        } else if ($("#trainer1").val() != null &&
            $("#trainer1").val() != '') {
            // Add trainer to Table
            trainerAddToTable();
            // Clear form fields
            formClear();
            // Focus to trainer name field
            $("#trainer1").focus();
        }
    }

    function formClear() {
        $("#trainer1").val("");
        $("#trainer2").val("");
    }

    function trainerAddToTable() {
        // Does tbody tag exist ? add one if not
        if ($("#trainer-table tbody").length == 0) {
            $("#trainer-table")
                .append("<tbody></tbody>");
        }
        // Append trainer to table
        $("#trainer-table tbody").append(
            trainerBuildTableRow(_nextId));
        // Increment next ID to use
        _nextId += 1;
    }

    function trainerBuildTableRow(id) {
        let ret =
            "<tr>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.editDisplay(this);' " +
            "class='btn btn-default btn-edit' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" + $("#trainer1").val() + "</td>" +
            "<td>" + $("#trainer2").val() + "</td>" +
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

    george_el.editDisplay = function (ctl) {
        _row = $(ctl).parents("tr");
        let cols = _row.children("td");
        _activeId = $($(cols[0]).children("button")[0]).data("id");
        $("#trainer1").val($(cols[1]).text());
        $("#trainer2").val($(cols[2]).text());
        // Change Add Button Text
        $("#saveForm").attr("value", "Update");
    }

    george_el.displayDelete = function (ctl) {
        $(ctl).parents("tr").remove();
    }

    function trainerUpdateInTable(id) {
        // Find Trainer in <table>
        let row = $("#trainer-table button[data-id='" + id + "']").parents("tr")[0];
        // Add changed trainer to table
        $(row).after(trainerBuildTableRow(id));
        // Remove original trainer
        $(row).remove();
        formClear();
        $("#saveForm").attr("value", "Add");
    }

}
$(init);

const george_el = {};

