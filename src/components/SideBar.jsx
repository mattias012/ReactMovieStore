import './styles/SideBar.css';
import { useState } from 'react';

function SideBar() {
  // State to track the selected item
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="category-sidebar">
      <ul>
        {['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi'].map((item, index) => (
          <li
            key={index}
            className={selectedItem === index ? 'selected' : ''}
            onClick={() => setSelectedItem(index)} // Update selected item on click
          >
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
