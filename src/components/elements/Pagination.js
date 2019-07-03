import React from 'react';
import PropTypes from 'prop-types';
import { getPager } from '../../utils';

const NumPage = ({ page, currentPage, handleChangePage, name, isNumPage }) => {
  const paginCondition =
    (currentPage === page) | (currentPage === 1 && page === 1);
  return (
    <li
      className={`page-item ng-scope ${
        isNumPage && paginCondition ? 'active' : ''
      }`}
      onClick={() => (paginCondition ? '' : handleChangePage(page))}
    >
      <span style={{ cursor: 'pointer' }} className="page-link ng-binding">
        {name}
      </span>
    </li>
  );
};

export default class Pagination extends React.Component {
  static propTypes = {
    numberOfItem: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    itemPerPage: PropTypes.number,
  };

  static defaultProps = {
    currentPage: 1,
    itemPerPage: 10,
  };

  constructor(props) {
    super(props);
    const { currentPage, itemPerPage, numberOfItem } = props;
    this.state = {
      currentPage,
      itemPerPage,
      numberOfItem,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps) {
      return {
        currentPage: nextProps.currentPage,
      };
    }
    return null;
  }

  renderPage(numberOfItem, itemPerPage, currentPage) {
    const { changePage } = this.props;
    const { pages, totalPages } = getPager(
      numberOfItem,
      currentPage,
      itemPerPage
    );

    return (
      <>
        <NumPage
          page={1}
          currentPage={currentPage}
          handleChangePage={changePage}
          name="First"
        />
        {pages.map(item => {
          return (
            <NumPage
              page={item}
              currentPage={currentPage}
              handleChangePage={changePage}
              name={item}
              key={item}
              isNumPage
            />
          );
        })}
        <NumPage
          page={totalPages}
          currentPage={currentPage}
          handleChangePage={changePage}
          name="Last"
        />
      </>
    );
  }

  render() {
    const { numberOfItem, itemPerPage } = this.props;
    const { currentPage } = this.state;

    return (
      <nav style={{ textAlign: 'center' }}>
        <ul className="pagination">
          {this.renderPage(numberOfItem, itemPerPage, currentPage)}
        </ul>
      </nav>
    );
  }
}
