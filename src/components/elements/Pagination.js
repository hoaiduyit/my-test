import React from "react";
import CustomLink from "./CustomLink";
import PropTypes from "prop-types";

export default class Pagination extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number,
    itemPerPage: PropTypes.number,
    numberOfItem: PropTypes.number,
    changePage: PropTypes.func.isRequired
  }

  static defaultProps = {
    currentPage: 1,
    itemPerPage: 10
  }

  state = {
    currentPage: this.props.currentPage,
    itemPerPage: this.props.itemPerPage,
    numberOfItem: this.props.numberOfItem
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps) {
      return {
        currentPage: nextProps.currentPage
      }
    }
    return null;
  }

  renderPage(numberOfItem, itemPerPage, currentPage) {
    const pageNumber = numberOfItem / itemPerPage
    const pagin = [];
    for (let i = 0; i < pageNumber; i++) {
      pagin.push(
        <li className={`page-item ng-scope ${currentPage === i + 1 ? "active" : ""}`} key={i} onClick={(e) => this.props.changePage(i + 1)} >
          <CustomLink url={`?limit=${itemPerPage}&offset=${i * itemPerPage}`} className="page-link ng-binding" children={i + 1} />
        </li>
      )
    }
    return pagin;
  }

  render() {
    return (
      <nav>
        <ul className="pagination">
          {this.renderPage(this.props.numberOfItem, this.props.itemPerPage, this.state.currentPage)}
        </ul>
      </nav>
    )
  }
}