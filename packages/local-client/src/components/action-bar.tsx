import './action-bar.css';
import { useActions } from '../hooks/use-actions';
import ActionButton from './action-button';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <ActionButton icon="fa-arrow-up" handleClick={() => moveCell(id, 'up')} />
      <ActionButton
        icon="fa-arrow-down"
        handleClick={() => moveCell(id, 'down')}
      />
      <ActionButton icon="fa-times" handleClick={() => deleteCell(id)} />
    </div>
  );
};

export default ActionBar;
