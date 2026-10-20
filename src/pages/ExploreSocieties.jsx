import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Compass, CheckCircle2, RotateCcw } from 'lucide-react';
import SocietyCard from '../components/SocietyCard';
import { societies, categories } from '../data/mockData';

export default function ExploreSocieties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const urlCat = searchParams.get('cat') || 'All Societies';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCat);

  // Sync state if URL search params change
  useEffect(() => {
    if (urlSearch !== searchTerm) {
      setSearchTerm(urlSearch);
    }
    if (urlCat && urlCat !== selectedCategory) {
      setSelectedCategory(urlCat);
    }
  }, [urlSearch, urlCat]);

  // Filter societies based on search term and selected category
  const filteredSocieties = useMemo(() => {
    return societies.filter((society) => {
      const matchesSearch = 
        society.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        society.description.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        society.category.toLowerCase().includes(searchTerm.toLowerCase().trim());

      const matchesCategory = 
        selectedCategory === 'All Societies' || 
        society.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    // Update URL param nicely
    if (cat === 'All Societies') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    if (val.trim()) {
      searchParams.set('search', val);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Societies');
    setSearchParams({});
  };

  return (
    <div className="page-wrapper explore-page">
      {/* Header Banner */}
      <section className="explore-header-section">
        <div className="content-container">
          <div className="explore-header-inner">
            <span className="section-badge">Student Organizations</span>
            <h1 className="explore-title">Explore Societies</h1>
            <p className="explore-subtitle">
              Find your community and discover what interests you.
            </p>

            {/* Search and Filters Toolbar */}
            <div className="explore-search-bar-wrapper">
              <div className="search-input-box">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search by society name, keyword, or domain..." 
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="explore-search-input"
                />
                {searchTerm && (
                  <button 
                    type="button" 
                    className="search-clear-btn" 
                    onClick={() => handleSearchChange('')}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="category-chips-row">
              {categories.map((category) => {
                const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
                return (
                  <button
                    key={category}
                    type="button"
                    className={`category-chip ${isActive ? 'category-chip-active' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Results Section */}
      <section className="explore-results-section">
        <div className="content-container">
          {/* Active Filter Summary Bar */}
          <div className="results-summary-bar">
            <div className="results-count-text">
              Showing <strong>{filteredSocieties.length}</strong> {filteredSocieties.length === 1 ? 'society' : 'societies'}
              {selectedCategory !== 'All Societies' && (
                <span> in <span className="highlight-tag">{selectedCategory}</span></span>
              )}
              {searchTerm && (
                <span> matching "<strong>{searchTerm}</strong>"</span>
              )}
            </div>

            {(searchTerm || selectedCategory !== 'All Societies') && (
              <button type="button" className="btn-reset-filters" onClick={resetFilters}>
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Societies Grid */}
          {filteredSocieties.length > 0 ? (
            <div className="societies-grid">
              {filteredSocieties.map((society) => (
                <SocietyCard key={society.id} society={society} />
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <div className="empty-state-icon">
                <Compass size={36} className="text-muted" />
              </div>
              <h3 className="empty-state-title">No societies found</h3>
              <p className="empty-state-desc">
                We couldn't find any student society matching your criteria. Try adjusting your search term or selecting a different category.
              </p>
              <button type="button" className="btn-primary" onClick={resetFilters}>
                View All Societies
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
