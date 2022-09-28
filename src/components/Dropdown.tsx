import React from 'react';

interface Item {
  id: string;
  name: string;
}

interface DropdownProps {
  title: string;
  items: Array<Item>;
  onItemSelect: (item?: Item) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, items, onItemSelect }) => {
  const [itemsVisible, setItemsVisible] = React.useState(false);

  const onItemSelection = (item?: Item) => {
    onItemSelect(item);
    setItemsVisible(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{title}</span>
        <svg
          onClick={() => setItemsVisible((prevState) => !prevState)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5"></path>
        </svg>
      </div>

      {itemsVisible && (
        <div style={{ position: 'absolute', backgroundColor: '#FFF', border: '1px solid #000' }}>
          <div style={{ borderBottom: '1px dashed #000' }} onClick={() => onItemSelection()}>
            All
          </div>
          {items.map((item) => (
            <div key={item.id} style={{ borderBottom: '1px dashed #000' }} onClick={() => onItemSelection(item)}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
