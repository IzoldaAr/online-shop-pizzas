import style from './style.module.scss';

function NotFoundBlock() {
  return (
    <div className={style.root}>
      <h1>
        <span>😕</span>
        <br />
        Nothing is found
      </h1>
      <p className={style.description}>This page is missing</p>
    </div>
  );
}

export default NotFoundBlock;
