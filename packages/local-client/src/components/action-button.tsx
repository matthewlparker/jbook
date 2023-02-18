interface ActionButtonProps {
  icon: string;
  handleClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, handleClick }) => {
  return (
    <button className="button is-primary is-small" onClick={handleClick}>
      <span className="icon">
        <i className={`fas ${icon}`}></i>
      </span>
    </button>
  );
};

export default ActionButton;
