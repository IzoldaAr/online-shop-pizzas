function AuthorizationForm() {
  return (
    <div className="authForm">
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"></input>

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email"></input>

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" name="channel"></input>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default AuthorizationForm;
