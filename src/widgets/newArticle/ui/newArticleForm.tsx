import { useEditArticleMutation, useCreateArticleMutation } from '@/entities/api/rtkApi';
import Form from '@/entities/form';
import { getLabelId } from '@/entities/form/lib/uniqId';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

type FieldValuesType = {
  body: string;
  title: string;
  description: string;
  tagList?: { tag: string }[];
};

type DefaultValuesType = {
  body: string;
  title: string;
  description: string;
  tagList?: string[];
};

function NewArticleForm(props: { defaultValues: DefaultValuesType; slug: string; action: string }) {
  const navigate = useNavigate();
  const { defaultValues, action, slug } = props;
  const mutation = action === 'create' ? useCreateArticleMutation : useEditArticleMutation;
  const [handleArticle, { data, isSuccess, isLoading }] = mutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tagList: defaultValues.tagList?.map((item) => ({ tag: item })),
      title: defaultValues.title,
      description: defaultValues.description,
      body: defaultValues.body,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const handleAddField = () => {
    append({ tag: '' });
  };

  const onSubmit = (requestFields: FieldValuesType) => {
    const { tagList, ...other } = requestFields;
    const formattedTagList = tagList?.map((item) => item.tag);
    const requestData = { article: { tagList: formattedTagList, ...other }, slug };
    handleArticle(requestData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/articles/${data.article.slug}`);
    }
  }, [data, isSuccess, navigate]);

  return (
    <Form class="form__wrapper--xl" title="Create new article">
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
              required: 'Required field',
              pattern: {
                value: /[^\s]/,
                message: 'Required field',
              },
            })}
          />
          <p className="form__input-warning">{errors.title?.message}</p>
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
              required: 'Required field',
              pattern: {
                value: /[^\s]/,
                message: 'Required field',
              },
            })}
          />
          <p className="form__input-warning">{errors.description?.message}</p>
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
              required: 'Required field',
              pattern: {
                value: /[^\s]/,
                message: 'Required field',
              },
            })}
          ></textarea>
          <p className="form__input-warning">{errors.body?.message}</p>
        </div>
        <label className="form__label">Tags</label>
        <div className="form__tags">
          <div className={`form__tags-wrapper ${!fields.length && 'hidden'}`}>
            {fields &&
              fields.map((field, index) => (
                <div className="form__field form__field--tag" key={field.id}>
                  <input
                    className="form__input form__input--tag"
                    placeholder="Some short tag"
                    {...register(`tagList.${index}.tag`, { required: 'Required field' })}
                  />
                  <button className="form__btn form__btn--red" onClick={() => remove(index)}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <button className="form__btn form__btn--white" type="button" onClick={() => handleAddField()}>
            Add tag
          </button>
        </div>
        <button className="form__btn form__btn--submit" disabled={isLoading} type="submit">
          {isLoading ? <Spin indicator={<LoadingOutlined spin />} /> : 'Send'}
        </button>
      </form>
    </Form>
  );
}

export default NewArticleForm;
