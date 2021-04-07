import NewPost from 'components/NewPost';

export default function Panel({ isPanel, setIsPanel }) {
  const _class = {
    true: 'panel-wrapper active',
    false: 'panel-wrapper',
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsPanel(false);
  };

  return (
    <div className={_class[isPanel]}>
      <div className="over-layer" onClick={handleClose}></div>
      <div className="panel">
        <div className="head">
          <span className="close" onClick={handleClose}>
            x
          </span>
          <NewPost handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
}
