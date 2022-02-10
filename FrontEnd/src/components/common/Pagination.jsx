import { Pagination } from "antd";

const TablePagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  // itemsCount={tableDataAll.length}
  //             pageSize={this.state.pageSize}
  //             currentPage={this.state.currentPage}
  //             onPageChange={this.handlePageChange}

  return (
    <Pagination
      className="mt-5"
      total={itemsCount}
      pageSize={pageSize}
      defaultCurrent={currentPage}
      onChange={onPageChange}
      showSizeChanger={false}
    />
  );
};

export default TablePagination;
