document.getElementById('registrationForm').addEventListener('submit', userRegistration);

const registration = (user) => {

    axios.post('http://localhost:3000/user/registration', user, { headers: { "Content-Type": "text/plain" } })
        .then(response => {
            window.location.replace("/login.html?status=3");
        }).catch(error => {
            window.location.replace("/login.html?status=4");
        });
};

const toHexString = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

function userRegistration(e) {

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
    registration(toHexString(bytes));
}