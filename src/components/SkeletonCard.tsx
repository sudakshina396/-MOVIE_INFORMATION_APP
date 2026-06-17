const SkeletonCard = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__card">
        <div className="skeleton__image"></div>

        <div className="skeleton__content">
          <div className="skeleton__text"></div>

          <div className="skeleton__text skeleton__text--small"></div>

          <div className="skeleton__text skeleton__text--button"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;