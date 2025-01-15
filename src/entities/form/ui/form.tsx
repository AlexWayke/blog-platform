import './form.scss';

type FormType = {
  children: JSX.Element[] | JSX.Element;
  title: string;
};

function Form(props: FormType) {
  return (
    <div className="form wrapper">
      <div className="form__wrapper">
        <div className="form__title">{props.title}</div>
        {props.children}
      </div>
    </div>
  );
}

export default Form;
