import { Link, useNavigate } from 'react-router';
import Form from '@/entities/form';
import { getLabelId } from '@/entities/form/lib/uniqId';
import { FieldValues, useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '@/entities/api/rtkApi';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { setUser } from '@/entities/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';

function SignUpForm() {
  const [registerUser, { data, isSuccess, error, isLoading }] = useRegisterUserMutation();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (fieldData: FieldValues) => {
    const { username, email, password } = fieldData;
    registerUser({ username, email, password });
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
      dispatch(setUser(data.user));
      navigate('/');
    }
    if (isLogged) {
      navigate('/');
    }
  }, [isSuccess, data, dispatch, navigate, isLogged]);

  return (
    <Form title="Create new account">
      <form className="form__body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(0)}>
            Username
          </label>
          <input
            className={`form__input ${errors.username && 'form__input--warning'}`}
            id={getLabelId(0)}
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 4,
                message: 'Username must be at least 4 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be less 20 characters',
              },
            })}
          />
          {errors.username && (
            <p className="form__input-warning">
              <>{errors.username.message}</>
            </p>
          )}
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(1)}>
            Email address
          </label>
          <input
            className={`form__input ${errors.email && 'form__input--warning'}`}
            id={getLabelId(1)}
            placeholder="Email address"
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="form__input-warning">
              <>{errors.email.message}</>
            </p>
          )}
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(2)}>
            Password
          </label>
          <input
            className={`form__input ${errors.password && 'form__input--warning'}`}
            id={getLabelId(2)}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must be less 40 characters',
              },
            })}
          />
          {errors.password && (
            <p className="form__input-warning">
              <>{errors.password.message}</>
            </p>
          )}
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(3)}>
            Repeat Password
          </label>
          <input
            className={`form__input ${errors.repeat_password && 'form__input--warning'}`}
            id={getLabelId(3)}
            type="password"
            {...register('repeat_password', {
              required: 'Repeat password',
              validate: (value) => watch('password') === value || 'Password must match',
            })}
            placeholder="Password"
          />
          {errors.repeat_password && (
            <p className="form__input-warning">
              <>{errors.repeat_password.message}</>
            </p>
          )}
        </div>
        <div className="form__checkbox">
          <input
            className="form__checkbox-input"
            type="checkbox"
            id={getLabelId(4)}
            {...register('conditions_agree', { required: 'You must be agree with platform rules' })}
            defaultChecked={true}
          />
          <label
            className={'form__checkbox-label' + (errors.conditions_agree ? ' form__checkbox-label--warning' : '')}
            htmlFor={getLabelId(4)}
          >
            I agree to the processing of my personal information
          </label>
        </div>
        {errors.conditions_agree && (
          <p className="form__input-warning">
            <>{errors.conditions_agree.message}</>
          </p>
        )}
        <button className="form__btn" disabled={isLoading} type="submit">
          {isLoading ? <Spin indicator={<LoadingOutlined spin />} /> : 'Create'}
        </button>
      </form>
      <p className="form__annotation">
        Already have an account?
        <Link className="form__annotation-link" to="/sign-in">
          Sign In
        </Link>
      </p>
    </Form>
  );
}

export default SignUpForm;
