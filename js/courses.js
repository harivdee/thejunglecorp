'use strict';
function init() {
    $(document).ready(function () {
        console.log("ready!");
        $('#course-table').hide();
        $('#studentsPerCourse').hide();
        $('#trainersPerCourse').hide();
        $('#assignmentsPerCourse').hide();
        $('#assignmentPerStudentPerCourse').hide();
    });


    let _nextId = 1;
    let _snextId = 1;
    let _tnextId = 1;
    let _anextId = 1;
    let _asnextId = 1;
    let _activeId = 0;
    let _sactiveId = 0;
    let _tactiveId = 0;
    let _aactiveId = 0;
    let _asactiveId = 0;
    let _row = null;
    let courseArr = [];

    $('#saveForm').click(function (e) {
        if ($('#course3').val() > $('#course4').val()) {
            e.preventDefault();
            $('#ex1').modal('open');
        }
        $('#course-table').show();
        courseUpdate();
        // $('#course-table').addClass('show');
    });


    function courseUpdate() {
        if ($("#saveForm").attr("value") == "Update") {
            courseUpdateInTable(_activeId);
        } else if ($("#course1").val() != null &&
            $("#course1").val() != '') {
            // Add course to Table
            courseAddToTable();
            // Clear form fields
            formClear();
            // Focus to course title field
            $("#course1").focus();
        }
    }

    function formClear() {
        $("#course1").val("");
        $("#course2").val("");
        $("#course3").val("");
        $("#course4").val("");
        $("#course5").val("");
    }

    function courseAddToTable() {
        // Does tbody tag exist ? add one if not
        if ($("#course-table tbody").length == 0) {
            $("#course-table")
                .append("<tbody></tbody>");
        }
        // Append course to table
        $("#course-table tbody").append(
            courseBuildTableRow(_nextId));
        // Increment next ID to use
        _nextId += 1;
    }

    function courseBuildTableRow(id) {
        let ret =
            "<tr id='row-id'" + id + "'>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.editDisplay(this);' " +
            "class='btn btn-default btn-edit' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" + $("#course1").val() + "</td>" +
            "<td>" + $("#course2").val() + "</td>" +
            "<td>" + $("#course3").val() + "</td>" +
            "<td>" + $("#course4").val() + "</td>" +
            "<td>" + $("#course5").val() + "</td>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.displayDelete(this);' " +
            "class='btn btn-default btn-delete' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.addStudent();' " +
            "class='btn btn-default btn-student' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.addTrainer();' " +
            "class='btn btn-default btn-trainer' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.addAssignment();' " +
            "class='btn btn-default btn-assignment' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "</tr>"
        courseArr.push($("#course1").val());
        return ret;
    }

    george_el.editDisplay = function (ctl) {
        _row = $(ctl).parents("tr");
        let cols = _row.children("td");
        _activeId = $($(cols[0]).children("button")[0]).data("id");
        $("#course1").val($(cols[1]).text());
        $("#course2").val($(cols[2]).text());
        $("#course3").val($(cols[3]).text());
        $("#course4").val($(cols[4]).text());
        $("#course5").val($(cols[5]).text());
        // Change Add Button Text
        $("#saveForm").attr("value", "Update");
    }

    george_el.displayDelete = function (ctl) {
        $(ctl).parents("tr").remove();
    }

    function courseUpdateInTable(id) {
        // Find Course in <table>
        let row = $("#course-table button[data-id='" + id + "']").parents("tr")[0];
        // Add changed course to table
        $(row).after(courseBuildTableRow(id));
        // Remove original course
        $(row).remove();
        formClear();
        $("#saveForm").attr("value", "Add");
    }

    george_el.addStudent = function () {
        $('#studentsPerCourse').show();
        $('#studentPerCourse-table').hide();
        $('#student1').focus();
    }

    george_el.addaStudent = function () {
        $('#assignmentPerStudentPerCourse').show();
        $('#assignmentsPerStudentPerCouse-table').hide();
        $('#astudent1').focus();
    }

    george_el.addTrainer = function () {
        $('#trainersPerCourse').show();
        $('#trainerPerCourse-table').hide();
        $('#trainer1').focus();
    }

    george_el.addAssignment = function () {
        $('#assignmentsPerCourse').show();
        $('#assignmentsPerCourse-table').hide();
        $('#assignment1').focus();
    }

    $('#studentForm').click(function () {
        $('#studentPerCourse-table').show();
        studentUpdate();
        return false;
    });

    function studentUpdate() {
        if ($("#studentForm").attr("value") == "Update") {
            studentUpdateInTable(_sactiveId);
        } else if ($("#student1").val() != null &&
            $("#student1").val() != '') {
            // Add student to Table
            studentAddToTable();
            // Clear form fields
            sformClear();
            // Focus to student name field
            $("#student1").focus();
        }
    }

    function sformClear() {
        $("#student1").val("");
        $("#student2").val("");
        $("#student3").val("");
        $("#student4").val("");
    }

    function studentAddToTable() {
        // Does tbody tag exist ? add one if not
        if ($("#studentPerCourse-table tbody").length == 0) {
            $("#studentPerCourse-table")
                .append("<tbody></tbody>");
        }
        // Append student to table
        $("#studentPerCourse-table tbody").append(
            studentBuildTableRow(_snextId));
        // Increment next ID to use
        _snextId += 1;
    }

    $("#course-table").on('click', '.btn-student', function () {
        let currentRow = $(this).closest("tr");
        george_el.getCourse = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
    });

    function studentBuildTableRow(id) {
        let ret =
            "<tr>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.seditDisplay(this);' " +
            "class='btn btn-default btn-edit' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" + george_el.getCourse + "</td>" +
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

    george_el.seditDisplay = function (ctl) {
        _row = $(ctl).parents("tr");
        let cols = _row.children("td");
        _sactiveId = $($(cols[0]).children("button")[0]).data("id");
        $("#student1").val($(cols[2]).text());
        $("#student2").val($(cols[3]).text());
        $("#student3").val($(cols[4]).text());
        $("#student4").val($(cols[5]).text());
        // Change Add Button Text
        $("#studentForm").attr("value", "Update");
    }

    function studentUpdateInTable(id) {
        // Find Student in <table>
        let row = $("#student-table button[data-id='" + id + "']").parents("tr")[0];
        // Add changed student to table
        $(row).after(studentBuildTableRow(id));
        // Remove original student
        $(row).remove();
        sformClear();
        $("#studentForm").attr("value", "Add");
    }

    $('#trainerForm').click(function () {
        $('#trainerPerCourse-table').show();
        trainerUpdate();
        return false;
    });

    function trainerUpdate() {
        if ($("#trainerForm").attr("value") == "Update") {
            trainerUpdateInTable(_tactiveId);
        } else if ($("#trainer1").val() != null &&
            $("#trainer1").val() != '') {
            // Add trainer to Table
            trainerAddToTable();
            // Clear form fields
            tformClear();
            // Focus to student name field
            $("#trainer1").focus();
        }
    }
    function trainerAddToTable() {
        // Does tbody tag exist ? add one if not
        if ($("#trainerPerCourse-table tbody").length == 0) {
            $("#trainerPerCourse-table")
                .append("<tbody></tbody>");
        }
        // Append trainer to table
        $("#trainerPerCourse-table tbody").append(
            trainerBuildTableRow(_tnextId));
        // Increment next ID to use
        _tnextId += 1;
    }

    function tformClear() {
        $("#trainer1").val("");
        $("#trainer2").val("");
    }
    $("#course-table").on('click', '.btn-trainer', function () {
        let currentRow = $(this).closest("tr");
        george_el.gettCourse = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
    });

    function trainerBuildTableRow(id) {
        let ret =
            "<tr>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.teditDisplay(this);' " +
            "class='btn btn-default btn-edit' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" + george_el.gettCourse + "</td>" +
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
    function trainerUpdateInTable(id) {
        // Find Trainer in <table>
        let row = $("#trainer-table button[data-id='" + id + "']").parents("tr")[0];
        // Add changed trainer to table
        $(row).after(trainerBuildTableRow(id));
        // Remove original trainer
        $(row).remove();
        tformClear();
        $("#saveForm").attr("value", "Add");
    }

    george_el.teditDisplay = function (ctl) {
        _row = $(ctl).parents("tr");
        let cols = _row.children("td");
        _tactiveId = $($(cols[0]).children("button")[0]).data("id");
        $("#trainer1").val($(cols[2]).text());
        $("#trainer2").val($(cols[3]).text());
        // Change Add Button Text
        $("#trainerForm").attr("value", "Update");
    }

    $('#assignmentForm').click(function () {
        let courseDate = $("#course-table btn-edit").closest("tr").find("td:eq(4)").text();
        console.log(courseDate);
        console.log(typeof(courseDate));
        let astartDate = $("#assignment3").val();
        console.log(astartDate);
        console.log(typeof(astartDate));
        $('#assignmentsPerCourse-table').show();
        assignmentUpdate();
        return false;
    });

    function assignmentUpdate() {
        if ($("#assignmentForm").attr("value") == "Update") {
            assignmentUpdateInTable(_aactiveId);
        } else if ($("#assignment1").val() != null &&
            $("#assignment1").val() != '') {
            // Add assignment to Table
            assignmentAddToTable();
            // Clear form fields
            aformClear();
            // Focus to assignment title field
            $("#assignment1").focus();
        }
    }

    function assignmentAddToTable() {
        // Does tbody tag exist ? add one if not
        if ($("#assignmentsPerCourse-table tbody").length == 0) {
            $("#assignmentsPerCourse-table")
                .append("<tbody></tbody>");
        }
        // Append assignment to table
        $("#assignmentsPerCourse-table tbody").append(
            assignmentBuildTableRow(_anextId));
        // Increment next ID to use
        _anextId += 1;
    }

    function aformClear() {
        $("#assignment1").val("");
        $("#assignment2").val("");
        $("#assignment3").val("");
        $("#assignment4").val("");
        $("#assignment5").val("");
    }

    $("#course-table").on('click', '.btn-assignment', function () {
        let currentRow = $(this).closest("tr");
        george_el.getaCourse = currentRow.find("td:eq(1)").text(); // get current row 1st TD value
    });

    function assignmentBuildTableRow(id) {
        let ret =
            "<tr>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.aeditDisplay(this);' " +
            "class='btn btn-default btn-edit' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" + george_el.getaCourse + "</td>" +
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
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.addaStudent();' " +
            "class='btn btn-default btn-astudent' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "</tr>"
        return ret;
    }

    george_el.aeditDisplay = function (ctl) {
        _row = $(ctl).parents("tr");
        let cols = _row.children("td");
        _aactiveId = $($(cols[0]).children("button")[0]).data("id");
        $("#assignment1").val($(cols[1]).text());
        $("#assignment2").val($(cols[2]).text());
        $("#assignment3").val($(cols[3]).text());
        $("#assignment4").val($(cols[4]).text());
        $("#assignment5").val($(cols[5]).text());
        // Change Add Button Text
        $("#assignmentForm").attr("value", "Update");
    }

    $('#astudentForm').click(function () {
        $('#assignmentPerstudentPerCourse-table').show();
        astudentUpdate();
        return false;
    });

    function astudentUpdate() {
        if ($("#astudentForm").attr("value") == "Update") {
            astudentUpdateInTable(_asactiveId);
        } else if ($("#astudent1").val() != null &&
            $("#astudent1").val() != '') {
            // Add student to Table
            astudentAddToTable();
            // Clear form fields
            asformClear();
            // Focus to student name field
            $("#astudent1").focus();
        }
    }

    function asformClear() {
        $("#astudent1").val("");
        $("#astudent2").val("");
        $("#astudent3").val("");
        $("#astudent4").val("");
    }

    function astudentAddToTable() {
        // Does tbody tag exist ? add one if not
        if ($("#assignmentsPerStudentPerCouse-table tbody").length == 0) {
            $("#assignmentsPerStudentPerCouse-table")
                .append("<tbody></tbody>");
        }
        // Append student to table
        $("#assignmentsPerStudentPerCouse-table tbody").append(
            astudentBuildTableRow(_asnextId));
        // Increment next ID to use
        _asnextId += 1;
    }

    $("#assignmentsPerCourse-table").on('click', '.btn-astudent', function () {
        let currentRow = $(this).closest("tr");
        george_el.getasCourse = currentRow.find("td:eq(2)").text(); // get current row 2nd TD value
    });

    function astudentBuildTableRow(id) {
        let ret =
            "<tr>" +
            "<td>" +
            "<button type='button' " +
            "onclick='george_el.aseditDisplay(this);' " +
            "class='btn btn-default btn-edit' " +
            "data-id='" + id + "'>" +
            "</button>" +
            "</td>" +
            "<td>" + george_el.getaCourse + "</td>" +
            "<td>" + george_el.getasCourse + "</td>" +
            "<td>" + $("#astudent1").val() + "</td>" +
            "<td>" + $("#astudent2").val() + "</td>" +
            "<td>" + $("#astudent3").val() + "</td>" +
            "<td>" + $("#astudent4").val() + "</td>" +
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

    george_el.aseditDisplay = function (ctl) {
        _row = $(ctl).parents("tr");
        let cols = _row.children("td");
        _asactiveId = $($(cols[0]).children("button")[0]).data("id");
        $("#astudent1").val($(cols[2]).text());
        $("#astudent2").val($(cols[3]).text());
        $("#astudent3").val($(cols[4]).text());
        $("#astudent4").val($(cols[5]).text());
        // Change Add Button Text
        $("#astudentForm").attr("value", "Update");
    }

    function astudentUpdateInTable(id) {
        // Find Student in <table>
        let row = $("#assignmentsPerStudentPerCouse-table button[data-id='" + id + "']").parents("tr")[0];
        // Add changed student to table
        $(row).after(astudentBuildTableRow(id));
        // Remove original student
        $(row).remove();
        asformClear();
        $("#astudentForm").attr("value", "Add");
    }


}
$(init);

const george_el = {};