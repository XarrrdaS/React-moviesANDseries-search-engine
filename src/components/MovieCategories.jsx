import React, { useState, useEffect } from 'react';
import './style/MovieCategories.css';

function MovieCategories({ handleCategoryChange, chooseType, sameChooseType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [prevChooseType, setPrevChooseType] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        const scrollTop = window.scrollY;
        const sidebarTop = sidebar.getBoundingClientRect().top;

        if (scrollTop > sidebarTop) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categoryButtons = [
    { name: 'Top', id: '' },
    { name: 'Action', id: 28 },
    { name: 'Animation', id: 16 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Fantasy', id: 14 },
    { name: 'Historical', id: 36 },
    { name: 'Horror', id: 27 },
    { name: 'Comedy', id: 35 },
    { name: 'Romance', id: 10749 },
    { name: 'Thriller', id: 53 },
    { name: 'Martial', id: 10752 },
  ];

  const categoryButtonsSeries = [
    { name: 'Top', id: '' },
    { name: 'Action and Adventure', id: 10759 },
    { name: 'Animation', id: 16 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Kids', id: 10762 },
    { name: 'Comedy', id: 35 },
    { name: 'Reality', id: 10764 },
    { name: 'Mystery', id: 9648 },
    { name: 'War & Politics', id: 10768 },
  ];

  const handleCategoryButtonClick = (category) => {
    setSelectedCategory(category);
    handleCategoryChange(category);
  };

  useEffect(() => {
    if (chooseType !== prevChooseType){
      setSelectedCategory('');
    };
    if (sameChooseType){
      setSelectedCategory('')
    }
    setPrevChooseType(chooseType);
  }, [chooseType, sameChooseType]);


  return (
    <div className='sidebar-container'>
      <nav className={`sidebar ${isOpen ? 'open' : ''} ${isFixed ? 'fixed' : ''}`}>
        <div className="sidebar-inner">
          <header className="sidebar-header">
            <button
              type="button"
              className="sidebar-burger"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined">
                {isOpen ? 'close' : 'menu'}
              </span>
            </button>
          </header>
          <nav className={`sidebar-menu ${isOpen ? '' : 'btns-none'}`}>
            <div className='category-btns'>
              {chooseType === 'movies' ? (categoryButtons.map((item) => (
                <button
                    key={item.name}
                    type="button"
                    className={`sidebar-button ${
                    selectedCategory === item.id ? 'active-category' : ''
                  }`}
                  onClick={() => handleCategoryButtonClick(item.id)}
                >
                  <p>{item.name}</p>
                </button>
              ))) : (
                categoryButtonsSeries.map((item) => (
                  <button
                      key={item.name}
                      type="button"
                      className={`sidebar-button ${
                      selectedCategory === item.id ? 'active-category' : ''
                    }`}
                    onClick={() => handleCategoryButtonClick(item.id)}
                  >
                    <p>{item.name}</p>
                  </button>
              )))}
            </div>
          </nav>
        </div>
      </nav>
    </div>
  );
}

export default MovieCategories;
