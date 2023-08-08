import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


class Container extends React.Component {
  render() {
    return (<div className="container">
      <div className="row">
        <div className="col-12 wrapper">
          <form action="submit-form" className="form_reg" method="post" onSubmit={this.formValid}>
            <h2 className="title_form mb-5">Реєстрація</h2>
            <label htmlFor="name">Ім'я *</label>
            <input type="text" id="name" name="name" className="mb-3" onChange={this.validName}></input>
            <label htmlFor="surename">Прізвище *</label>
            <input type="text" id="surename" name="surename" className="mb-3" onChange={this.validSureName}></input>
            <label htmlFor="email">Електронна пошта *</label>
            <input type="email" id="email" name="email" className="mb-3" onChange={this.validMail}></input>
            <label htmlFor="number">Номер телефону</label>
            <input type="text" id="phone" name="phone" className="mb-3" placeholder='+380980000000' onChange={this.validNumber}></input>
            <div className="pass_info">
              <label htmlFor="password" className="passLab">Пароль *</label>
              <span className="info">Мінімум 6 латинських символів, 1 велика літера та 1 цифра.</span>
            </div>
            <input type="password" id="password" name="password" className="mb-3" onChange={this.validPassword}></input>
            <div className="pass-block mb-5">
              <label htmlFor="showPass" className="showP">Видимий пароль</label>
              <input type="checkbox" id="showPass" name="showPass" onChange={this.ShowPass}></input>
            </div>
            <button type="submit" id="submit">Зареєструвати</button>
          </form>
        </div>
      </div>
    </div>)
  }


  ShowPass() {
    const passwordInput = document.getElementById("password");
    var showPasswordCheckbox = document.getElementById("showPass");

    if (showPasswordCheckbox.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }
  validatePassword(password) {
    // Проверки пароля, не менее 6 символов, минимум одна большая и одна маленькая буква, минимум одна цифра
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordPattern.test(password);
  }
  validPassword = () => {
    const passwordInput = document.getElementById("password");
    if (!this.validatePassword(passwordInput.value)) {
      passwordInput.classList.add("invalid");
      return;
    } else {
      passwordInput.classList.remove("invalid");
    }
  };


  validateUsername(name) {
    const namePattern = /^[А-ЯA-Z][а-яa-z]{1,}$/;
    return namePattern.test(name);
  }
  validName = () => {
    const nameInput = document.getElementById("name");
    if (!this.validateUsername(nameInput.value)) {
      nameInput.classList.add("invalid");
      return;
    } else {
      nameInput.classList.remove("invalid");
    }
  };

  validateUserSurename(name) {
    const sureNamePattern = /^[А-ЯA-Z][а-яa-z]{1,}$/;
    return sureNamePattern.test(name);
  }
  validSureName = () => {
    const sureNameInput = document.getElementById("surename");
    if (!this.validateUserSurename(sureNameInput.value)) {
      sureNameInput.classList.add("invalid");
      return;
    } else {
      sureNameInput.classList.remove("invalid");
    }
  };

  validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  validMail = () => {
    const emailInput = document.getElementById("email");
    if (!this.validateEmail(emailInput.value)) {
      emailInput.classList.add("invalid");
      return;
    } else {
      emailInput.classList.remove("invalid");
    }
  };

  validatePhoneNumber(phone) {
    const phonePattern = /^\+380\d{9}$/;
    return phonePattern.test(phone);
  }
  validNumber = () => {
    var numberInput = document.getElementById("phone");
    var numberValue = numberInput.value;
    var numbVall = false;
    if (numberValue.length === 0) {
      numbVall = false;
      numberValue = "";
      numberInput.classList.remove("invalid");
    } else if (numberValue.length > 0 && numberValue.length < 13) {
      numberInput.classList.add("invalid");
      numbVall = false;
        return;
    } else if (numberValue.length === 13){
      numbVall = true;
    }
    if (numbVall === true) {
      if (!this.validatePhoneNumber(numberValue)) {
        numberInput.classList.add("invalid");
        return;
      } else {
        numberInput.classList.remove("invalid");
      }
    }
  }

  setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  formValid = (event) => {
    event.preventDefault();
    var nameInput = document.getElementById("name");
    var sureNameInput = document.getElementById("surename");
    var emailInput = document.getElementById("email");
    var numberInput = document.getElementById("phone");
    var passwordInput = document.getElementById("password");

    var nameValue = nameInput.value;
    var sureNameValue = sureNameInput.value;
    var emailValue = emailInput.value;
    var numberValue = numberInput.value;
    var passwordValue = passwordInput.value;

    if (this.validateUsername(nameValue) && this.validateUserSurename(sureNameValue) && this.validateEmail(emailValue) && this.validatePassword(passwordValue)) {
      var formData = {
          name: nameInput.value,
          sureName: sureNameInput.value,
          number: numberInput.value,
          email: emailInput.value,
          password: passwordInput.value
      };
      // setCookie("formData", JSON.stringify(formData), 1);
      this.setCookie(formData.name, formData.password, 1);
      console.log(formData)
  } else {
    alert("Помилка реєєстрації, перевірте правельність введених даних!")
    console.log(numberValue)
    return;
  }
}
}
const root = ReactDOM.createRoot(document.getElementById('wrapper'));
root.render(<Container />)
