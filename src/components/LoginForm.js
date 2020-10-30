import Form from "carbon-react/lib/components/form";
import Button from "carbon-react/lib/components/button";
import Flash from "carbon-react/lib/components/flash";
import "./LoginForm.css"
import useFetch from "use-http";
import { useState } from 'react';

function LoginForm() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [flashOpen, setFlashOpen] = useState(false);
    const [flashMessage, setFlashMessage] = useState("Default Message"); 
    const { post, response } = useFetch("https://localhost:44380");

    const onPasswordChange = (e) => setPassword(e.target.value);
    const onEmailChange = (e) => setEmail(e.target.value);

    async function handleSubmit(e) {
      e.preventDefault();
      await post("/api/login", {email: email, password: password});
      setFlashOpen(true);
      if(response.data.breachedPassword) {
        setFlashMessage(`The given password has been involved in data breaches. \n\nThere has been ${response.data.numberOfBreaches} occurances of your password seen.`);
      } else {
        setFlashMessage("Good job your password hasn't been involved in any breaches.");
      }
    }

    return(
      <>
        <Flash
          as="warning"
          open={flashOpen}
          onDismiss={(e) => setFlashOpen(false)}
          message={flashMessage} />
        <Form
          className="login-form"
          onSubmit={handleSubmit}
          saveButton={<Button buttonType="primary" type="submit">Login</Button>}
        >
          <label className="input-label">
            Email
          </label>
          <input type="email" value={email} onChange={onEmailChange}></input>
          <br></br>
          <label className="input-label">
            Password
          </label>
          <input type="password" value={password} onChange={onPasswordChange}></input>
        </Form>
      </>
    )
}

export default LoginForm;