import LoadingIndicator from '../../assets/images/loading-blue.svg';
import './styles.css';

const Loading = () => (
  <div className="suspense-loading">
    <img src={LoadingIndicator} alt="Loading..." />
  </div>
);

export default Loading;
