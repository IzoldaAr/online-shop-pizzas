import classNames from 'classnames';

function Button(props: any) {
  return (
    <button
      onClick={props.onClick}
      className={classNames('button', props.className, {
        'button--outline': props.outline,
      })}
    >
      {props.children}
    </button>
  );
}

export default Button;
