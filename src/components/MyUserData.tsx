import { useState, useEffect } from 'react';
import { Button, Table, Space, Popconfirm } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type {
  TableRowSelection,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { UserData, setMyFormData } from '../redux/myFormSlice';
import { useSelector, useDispatch } from 'react-redux';
import { removeUserData } from '../redux/userDataSlice';
import { RootState } from '../redux/store';
import Storage from './Storage';
import { useTranslation } from 'react-i18next';

interface TableData {
  key: React.Key;
  name: string;
  gender: string;
  phone: string;
  nationality: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const createTableData = (userArray: UserData[]): TableData[] => {
  const tableArray: TableData[] = [];

  for (const userData of userArray) {
    const { user_id, firstName, lastName, gender, phone, nationality } =
      userData;

    const tableData: TableData = {
      key: user_id,
      name: `${firstName} ${lastName}`,
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
      phone: phone.join(''),
      nationality: nationality.charAt(0).toUpperCase() + nationality.slice(1),
    };

    tableArray.push(tableData);
  }

  return tableArray;
};

export default function MyUserData() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const UserDataState: UserData[] = useSelector(
    (state: RootState) => state.userData
  );
  const dispatch = useDispatch();
  const [data, setData] = useState<TableData[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const { t } = useTranslation();
  const columns: ColumnsType<TableData> = [
    {
      title: t('name_column'),
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: t('gender_column'),
      dataIndex: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      showSorterTooltip: false,
    },
    {
      title: t('phoneNumber_column'),
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      showSorterTooltip: false,
    },
    {
      title: t('nationality_column'),
      dataIndex: 'nationality',
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      showSorterTooltip: false,
    },
    {
      title: t('manage_column'),
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => dispatch(setMyFormData(String(record.key)))}>
            {t('editButtton')}
          </Button>
          <Popconfirm
            title={t('confirmRemove_title')}
            description={t('confirmRemove_des', { name: record.name })}
            onConfirm={() => dispatch(removeUserData([String(record.key)]))}
            okText={t('confirmRemove_yes')}
            cancelText={t('confirmRemove_no')}
          >
            <Button danger>{t('deleteButton')}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchData = () => {
    setData(createTableData(UserDataState));
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: Storage.getDataLength(),
      },
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(tableParams), UserDataState]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<TableData> | SorterResult<TableData>[] // Update sorter type
  ) => {
    setTableParams({
      pagination,
      filters: filters as Record<string, FilterValue>, // Type assertion
      ...sorter,
    });
  };

  const rowSelection: TableRowSelection<TableData> = {
    selectedRowKeys: selectedRowKeys as string[],
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys as string[]);
    },
  };

  return (
    <>
      {selectedRowKeys.length > 0 ? (
        <Popconfirm
          title={t('confirmSelectedRemove_title')}
          description={t('confirmSelectedRemove_des')}
          onConfirm={() => dispatch(removeUserData(selectedRowKeys))}
          okText={t('confirmRemove_yes')}
          cancelText={t('confirmRemove_no')}
        >
          <Button danger>{t('removeSelectedButton')}</Button>
        </Popconfirm>
      ) : (
        <Button danger disabled>
          {t('removeSelectedButton')}
        </Button>
      )}
      <Table
        rowSelection={rowSelection}
        rowKey={(record) => record.key}
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
      />
    </>
  );
}
