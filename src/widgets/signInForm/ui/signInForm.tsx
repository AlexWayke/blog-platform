import { Link } from 'react-router';
import Form from '@/entities/form';
import { getLabelId } from '@/entities/form/lib/uniqId';

function SignInForm() {
  return (
    <Form title="Sign In">
      <form className="form__body">
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(0)}>
            Email address
          </label>
          <input className="form__input" id={getLabelId(0)} name="query" placeholder="Email address" />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(1)}>
            Password
          </label>
          <input className="form__input" id={getLabelId(1)} placeholder="Password" />
        </div>
        <button className="form__btn" type="submit">
          Login
        </button>
      </form>
      <p className="form__annotation">
        Don’t have an account?
        <Link className="form__annotation-link" to="/sign-up">
          Sign Up
        </Link>
        .
      </p>
    </Form>
  );
}

export default SignInForm;
