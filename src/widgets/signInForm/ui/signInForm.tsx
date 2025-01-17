import { Link, useNavigate } from 'react-router';
import Form from '@/entities/form';
import { getLabelId } from '@/entities/form/lib/uniqId';
import { useLoginUserMutation } from '@/entities/api/rtkApi';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { setUser } from '@/entities/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';

function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userEmail = useAppSelector((state) => state.user.email);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [loginUser, { data, isSuccess, error, isLoading }] = useLoginUserMutation();
  const onSubmit = (fieldData: FieldValues) => {
    const { email, password } = fieldData;
    loginUser({ email, password });
  };

  useEffect(() => {
    if (error && 'data' in error) {
      const errorData = error as { data: { errors: { body: string } } };
      Object.entries(errorData.data.errors).forEach(([key, value]) => {
        setError(key, { type: 'custom', message: value });
      });
    }
  }, [error, setError]);

  useEffect(() => {
    if (isSuccess) {
      const { email, token, username } = data.user;
      dispatch(setUser({ email, token, username }));
      navigate('/');
    }
    if (userEmail) {
      navigate('/');
    }
  }, [isSuccess, data, dispatch, navigate, userEmail]);

  return (
    <Form title="Sign In">
      <form className="form__body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(0)}>
            Email address
          </label>
          <input
            className="form__input"
            id={getLabelId(0)}
            placeholder="Email address"
            {...register('email', {
              required: 'Fill email field',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {(errors.email && (
            <p className="form__input-warning">
              <>{errors.email.message}</>
            </p>
          )) ||
            (errors['email or password'] && (
              <p className="form__input-warning">
                <>{errors['email or password'].message}</>
              </p>
            ))}
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(1)}>
            Password
          </label>
          <input
            className="form__input"
            id={getLabelId(1)}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Fill password field',
            })}
          />
          {(errors.password && (
            <p className="form__input-warning">
              <>{errors.password.message}</>
            </p>
          )) ||
            (errors['email or password'] && (
              <p className="form__input-warning">
                <>{errors['email or password'].message}</>
              </p>
            ))}
        </div>
        <button className="form__btn" type="submit" disabled={isLoading}>
          {isLoading ? <Spin indicator={<LoadingOutlined spin />} /> : 'Login'}
        </button>
      </form>
      <p className="form__annotation">
        Don’t have an account?
        <Link className="form__annotation-link" to="/sign-up">
          Sign Up
        </Link>
      </p>
    </Form>
  );
}

export default SignInForm;
