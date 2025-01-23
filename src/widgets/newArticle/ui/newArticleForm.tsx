import { useNavigate } from 'react-router';
import Form from '@/entities/form';
import { getLabelId } from '@/entities/form/lib/uniqId';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/shared/hooks/hooks';
import { useCreateArticleMutation } from '@/entities/api/rtkApi';

function NewArticleForm() {
  const { user, isLogged } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [createArticle, { data, isSuccess, error, isLoading }] = useCreateArticleMutation();

  console.log('error', error);

  const onSubmit = (fieldData: FieldValues) => {
    for (const key in fieldData) {
      if (!fieldData[key].trim()) {
        setError(key, { type: 'custom', message: 'field could not be empty' });
        return;
      }
    }
    const { tags, ...other } = fieldData;
    const articleReq = {
      ...other,
      ...(tags && { tags }),
    };
    console.log('articleReq', articleReq);
    createArticle({ token: user.token, article: articleReq });
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
      navigate('/');
    }
    if (!isLogged) {
      navigate('/');
    }
  }, [isSuccess, data, navigate, isLogged]);

  return (
    <Form class="form__wrapper--xl" title="Sign In">
      <form className="form__body form__body--xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(0)}>
            Title
          </label>
          <input
            className="form__input"
            id={getLabelId(0)}
            placeholder="Important Article Title"
            {...register('title', {
              required: 'Fill title field',
            })}
          />
          {errors.title && (
            <p className="form__input-warning">
              <>{errors.title.message}</>
            </p>
          )}
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(0)}>
            Short description
          </label>
          <input
            className="form__input"
            id={getLabelId(1)}
            placeholder="Some short description that displays in atricles list"
            {...register('description', {
              required: 'Fill description field',
            })}
          />
          {errors.description && (
            <p className="form__input-warning">
              <>{errors.description.message}</>
            </p>
          )}
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(3)}>
            Text
          </label>
          <textarea
            className="form__input form__input--textarea"
            id={getLabelId(2)}
            placeholder="Text in article"
            {...register('body', {
              required: 'Fill text field',
            })}
          ></textarea>
          {errors.body && (
            <p className="form__input-warning">
              <>{errors.body.message}</>
            </p>
          )}
        </div>
        <button className="form__btn" type="submit" disabled={isLoading}>
          {isLoading ? <Spin indicator={<LoadingOutlined spin />} /> : 'Login'}
        </button>
      </form>
    </Form>
  );
}

export default NewArticleForm;
