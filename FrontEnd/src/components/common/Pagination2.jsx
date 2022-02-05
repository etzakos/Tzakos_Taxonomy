import { Pagination } from "antd";

const Pagination2 = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  // itemsCount={tableDataAll.length}
  //             pageSize={this.state.pageSize}
  //             currentPage={this.state.currentPage}
  //             onPageChange={this.handlePageChange}

  return (
    <Pagination
      total={itemsCount}
      pageSize={pageSize}
      defaultCurrent={currentPage}
      onChange={onPageChange}
      showSizeChanger={false}
    />
  );
};

export default Pagination2;
