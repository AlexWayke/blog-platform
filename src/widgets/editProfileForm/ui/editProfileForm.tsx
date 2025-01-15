import Form from '@/entities/form';
import { v4 as uuidv4 } from 'uuid';

function EditProfileForm() {
  const search = '';
  const uniqIds: string[] = [];
  const getLabelId = (num: number) => {
    if (uniqIds[num]) {
      return uniqIds[num];
    }
    uniqIds.push(uuidv4());
    return uniqIds[num];
  };

  return (
    <Form title="Edit Profile">
      <form className="form__body" action={search}>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(0)}>
            Username
          </label>
          <input className="form__input" id={getLabelId(0)} name="query" placeholder="Username" />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(1)}>
            Email address
          </label>
          <input className="form__input" id={getLabelId(1)} name="query" placeholder="Email address" />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(2)}>
            New password
          </label>
          <input className="form__input" id={getLabelId(2)} name="password" placeholder="New password" />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor={getLabelId(3)}>
            Avatar image (url)
          </label>
          <input className="form__input" id={getLabelId(3)} name="password" placeholder="Avatar image" />
        </div>
        <button className="form__btn" type="submit">
          Save
        </button>
      </form>
    </Form>
  );
}

export default EditProfileForm;
