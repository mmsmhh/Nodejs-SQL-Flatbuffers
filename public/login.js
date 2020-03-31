document.getElementById('loginForm').addEventListener('submit', userLogin);

const login = (user) => {
    axios.post('http://localhost:3000/user/login', user, { headers: { "Content-Type": "text/plain" } })
        .then(response => {
            console.log(response);
            window.location.replace("/login.html?status=1");
        }).catch(error => {
            window.location.replace("/login.html?status=2");
        });
};

const toHexString = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');



function onLoad() {

    if (window.location.search != null && window.location.search.substr(1).split("=")[0] == "status") {

        if (window.location.search.substr(1).split("=")[1] == 1) {
            document.getElementById('status2').style.display = "none";
            document.getElementById('status3').style.display = "none";
            document.getElementById('status4').style.display = "none";

        }
        else if (window.location.search.substr(1).split("=")[1] == 2) {
            document.getElementById('status1').style.display = "none";
            document.getElementById('status3').style.display = "none";
            document.getElementById('status4').style.display = "none";

        }
        else if (window.location.search.substr(1).split("=")[1] == 3) {
            document.getElementById('status1').style.display = "none";
            document.getElementById('status2').style.display = "none";
            document.getElementById('status4').style.display = "none";
        }
        else if (window.location.search.substr(1).split("=")[1] == 4) {
            document.getElementById('status1').style.display = "none";
            document.getElementById('status2').style.display = "none";
            document.getElementById('status3').style.display = "none";
        }
        else {
            document.getElementById('status1').style.display = "none";
            document.getElementById('status2').style.display = "none";
            document.getElementById('status3').style.display = "none";
            document.getElementById('status4').style.display = "none";

        }

    }
    else {
        document.getElementById('status1').style.display = "none";
        document.getElementById('status2').style.display = "none";
        document.getElementById('status3').style.display = "none";
        document.getElementById('status4').style.display = "none";

    }
}

function userLogin(e) {

    e.preventDefault();

    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;

    var builder = new flatbuffers.Builder(0);
    var email = builder.createString(userEmail);
    var password = builder.createString(userPassword);
    var User = io.mahmoudsaleh.generated.User;

    User.startUser(builder);
    User.addEmail(builder, email);
    User.addPassword(builder, password);
    var offset = User.endUser(builder);
    builder.finish(offset);
    var bytes = builder.asUint8Array()
    login(toHexString(bytes));
}