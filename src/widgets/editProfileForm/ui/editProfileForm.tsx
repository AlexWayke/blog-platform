import Form from '@/entities/form';
import { getLabelId } from '@/entities/form/lib/uniqId';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { useEditUserMutation } from '@/entities/api/rtkApi';
import { setUser } from '@/entities/slices/userSlice';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

function EditProfileForm() {
  const { user, isLogged } = useAppSelector((state) => state.user);
  const [editUser, { data, isSuccess, error, isLoading }] = useEditUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (fieldData: FieldValues) => {
    const { image, password, ...other } = fieldData;
    const updatedUser = {
      token: user.token,
      user: {
        ...other,
        ...(image && { image }),
        ...(password && { password }),
      },
    };

    editUser(updatedUser);
  };

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
  });

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
      const userMod = data.user;
      dispatch(setUser({ ...userMod }));
      navigate('/');
    }
  }, [isSuccess, data, dispatch, navigate]);

  return (
    <Form title="Edit Profile">
      <form className="form__body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(0)}>
            Username
          </label>
          <input
            className={`form__input ${errors.username && 'form__input--warning'}`}
            id={getLabelId(0)}
            placeholder="Username"
            defaultValue={user.username}
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
            className="form__input"
            id={getLabelId(1)}
            placeholder="Email address"
            defaultValue={user.email}
            {...register('email', {
              required: 'Email is required',
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
            New password
          </label>
          <input
            className="form__input"
            id={getLabelId(2)}
            placeholder="New password"
            {...register('password', {
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
            Avatar image (url)
          </label>
          <input
            className="form__input"
            id={getLabelId(3)}
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Invalid URL',
              },
            })}
          />
          {errors.image && (
            <p className="form__input-warning">
              <>{errors.image.message}</>
            </p>
          )}
        </div>
        <button className="form__btn" type="submit">
          {isLoading ? <Spin indicator={<LoadingOutlined spin />} /> : 'Save'}
        </button>
      </form>
    </Form>
  );
}

export default EditProfileForm;
