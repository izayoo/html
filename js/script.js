$(document).ready(function () {
    $("#bday").on("change", function () {
        var dob = new Date($(this).val());
        var month_diff = Date.now() - dob.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        var age = Math.abs(year - 1970);
        $("#age").val(age);
    });

    $("#mobileNo").on("keyup mouseup", function (e) {
        var mobileno = $(this).val();
        $(this).val(mobileno.slice(0, 11));
    }).keypress(function (e) {
        if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 13) {
            e.preventDefault();
        }
    });

    $("#submit").on('click', function () {
        $(".invalid-feedback").css("display", "none").text("");
        $("#registerUser").submit(function (e) {
            if (validate()) {
                console.log($("#registerUser").serialize());
                $.ajax({
                    type: "POST",
                    url: "pdo.php",
                    data: $("#registerUser").serialize(),
                    success: function (result) {
                        if (result === "Email Already Exists") {
                            $("#email").closest(".form-group").find(".invalid-feedback").text(result);
                            $(".invalid-feedback").css("display", "block");
                        } else {
                            $(".invalid-feedback").css("display", "none").text("");
                            $("#registerUser").trigger("reset");
                            alert(result);
                            window.location.reload;
                        }
                    }
                });
            } else {
            }

            e.preventDefault();
        });
    });

    function validate() {
        var errors = 0;

        if (!$("#name").val().match("^[\.a-zA-Z,!? ]*$")) {
            $("#name").closest(".form-group").find(".invalid-feedback")
                .text("There are invalid characters in your name.");
            errors++;
        }

        if (!$("#mobileNo").val().match("^(09)\\d{9}")) {
            $("#mobileNo").closest(".form-group").find(".invalid-feedback")
                .text("Invalid Mobile Number.");
            errors++;
        }

        if (!$("#email").val().toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            $("#email").closest(".form-group").find(".invalid-feedback")
                .text("Invalid email.");
            errors++;
        }

        if (errors > 0) {
            $(".invalid-feedback").css("display", "block");
            return false;
        }

        return true;
    }
});
