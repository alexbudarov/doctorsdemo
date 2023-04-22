import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {ApolloError} from "@apollo/client/errors";
import {ResultOf, VariablesOf} from "@graphql-typed-document-node/core";
import {Button, Card, Col, Form, Input, notification, Pagination, Row, Select, Space, Table} from "antd";
import {useForm} from "antd/lib/form/Form";
import {serializeVariables} from "../../../core/transform/model/serializeVariables";
import {DatePicker} from "@amplicode/react";
import {ArrowDownOutlined, ArrowUpOutlined, CloseCircleOutlined, StopOutlined} from "@ant-design/icons";
import {useNavigate, useSearchParams} from "react-router-dom";
import {FormattedMessage, useIntl} from "react-intl";
import {gql} from "@amplicode/gql";
import {RequestFailedError} from "../../../core/crud/RequestFailedError";
import {deserialize} from "../../../core/transform/model/deserialize";
import {getDoctorDisplayName} from "../../../core/display-name/getDoctorDisplayName";
import {getPatientDisplayName} from "../../../core/display-name/getPatientDisplayName";
import {useBreadcrumbItem} from "../../../core/screen/useBreadcrumbItem";
import {AppointmentOrderByProperty, AppointmentStatus, SortDirection} from "../../../gql/graphql";
import {DefaultOptionType} from "antd/lib/select";

const APPOINTMENT_LIST = gql(`
  query AppointmentList_AppointmentList(
  $page: OffsetPageInput
  $sort: [AppointmentOrderByInput]
  $filter: AppointmentFilterInput
) {
  appointmentList(
    page: $page
    sort: $sort
    filter: $filter
  ) {
    content {
      doctor {
        firstName
        id
        lastName
        specialty
      }
      durationMinutes
      endTime
      id
      patient {
        firstName
        id
        lastName
      }
      status
      time
    }
    totalElements
  }
}
`);

const columns = [
  {
    title: "Doctor",
    dataIndex: "doctor",
    key: "doctor"
  },
  {
    title: "Patient",
    dataIndex: "patient",
    key: "patient"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "End Time",
    dataIndex: "endTime",
    key: "endTime"
  }
];

const DEFAULT_PAGE_SIZE = 10;

const CANCEL_APPOINTMENT_BUTTON_PANEL = gql(`
mutation CancelAppointment_ButtonPanel($appId: ID!) {
    cancelAppointment(id: $appId)
}
`);

export function AppointmentList() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.AppointmentList" }));

  const [searchParams, setSearchParams] = useSearchParams();
  // Selection state is initialized to URL search params
  const [selectionState, setSelectionState] = useState<QueryVariablesType>(
    searchParamsToState(searchParams)
  );

  const [initialFilterValues] = useState<QueryVariablesType>(
    extractFilterParams(selectionState)
  );

  useEffect(() => {
    // Whenever selection state is changed, update URL search params accordingly
    setSearchParams(stateToSearchParams(selectionState));
  }, [selectionState, setSearchParams]);

  // Load the items from server. Will be reloaded reactively if one of variable changes
  const { loading, error, data } = useQuery(APPOINTMENT_LIST, {
    variables: selectionState
  });

  const items = useMemo(() => deserialize(data?.appointmentList?.content), [
    data?.appointmentList?.content
  ]);

  const applyPagination = useCallback((current: number, pageSize: number) => {
    setSelectionState(prevState => ({
      ...prevState,
      page: {
        number: current - 1,
        size: pageSize
      }
    }));
  }, []);

  const applySort = useCallback(
    (newSortValue: QueryVariablesType["sort"] | undefined) => {
      setSelectionState(prevState => {
        const newState = { ...prevState };
        if (newSortValue != null) {
          newState.sort = newSortValue;
        } else {
          delete newState.sort;
        }
        return newState;
      });
    },
    []
  );

  const applyFilters = useCallback((filters: QueryVariablesType) => {
    setSelectionState(prevState => {
      const newFilters = serializeVariables(APPOINTMENT_LIST, filters);
      return {
        ...prevState,
        page: {
          number: 0,
          size: prevState.page?.size ?? DEFAULT_PAGE_SIZE
        },
        ...newFilters
      };
    });
  }, []);

  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="table-space">
        <Card>
          <Filters
            onApplyFilters={applyFilters}
            initialFilterValues={initialFilterValues}
          />
        </Card>
        <ButtonPanel
          selectedRow={items?.find(i => i?.id === selectedRowId)}
          selectedRowId={selectedRowId}
          onApplySort={applySort}
          sortValue={selectionState.sort}
        />
        <TableSection
          items={items}
          loading={loading}
          error={error}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
        <Pagination
          current={
            selectionState.page?.number != null
              ? selectionState.page?.number + 1
              : undefined
          }
          pageSize={selectionState.page?.size}
          onChange={applyPagination}
          showSizeChanger
          total={data?.appointmentList?.totalElements}
        />
      </Space>
    </div>
  );
}

const sortBySelectorOptions: DefaultOptionType[] = [
  {
    label: (
      <>
        Patient First Name (<ArrowDownOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Desc,
      property: AppointmentOrderByProperty.PatientFirstName
    })
  },
  {
    label: (
      <>
        Patient First Name (<ArrowUpOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Asc,
      property: AppointmentOrderByProperty.PatientFirstName
    })
  },
  {
    label: (
      <>
        Doctor First Name (<ArrowDownOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Desc,
      property: AppointmentOrderByProperty.DoctorFirstName
    })
  },
  {
    label: (
      <>
        Doctor First Name (<ArrowUpOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Asc,
      property: AppointmentOrderByProperty.DoctorFirstName
    })
  },
  {
    label: (
      <>
        Time (<ArrowDownOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Desc,
      property: AppointmentOrderByProperty.Time
    })
  },
  {
    label: (
      <>
        Time (<ArrowUpOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Asc,
      property: AppointmentOrderByProperty.Time
    })
  }
];

interface ButtonPanelProps {
  selectedRow?: ItemType;
  selectedRowId?: string;
  onApplySort: (sort: QueryVariablesType["sort"]) => void;
  sortValue?: QueryVariablesType["sort"];
}
/**
 * Button panel above
 */
function ButtonPanel({
  selectedRow,
  selectedRowId,
  onApplySort,
  sortValue
}: ButtonPanelProps) {
  const intl = useIntl();
  const navigate = useNavigate();

  const [runCancelAppointment, {
    loading: cancelAppointmentLoading
  }] = useMutation(CANCEL_APPOINTMENT_BUTTON_PANEL, {
    variables: {
      appId: selectedRowId || ''
    },
    refetchQueries: ['AppointmentList_AppointmentList']
  });

  const onCancelButtonClick = useCallback(() => {
    if (!selectedRowId) {return;}

    runCancelAppointment()
      .then(answer => {
        notification.success({message: 'Cancelled'})
      }).catch(answer => {
        notification.error({message: 'Cancellation error'})
    })
  }, [selectedRowId, runCancelAppointment]);

  return (
    <Row justify="space-between" gutter={[16, 8]}>
      <Col>
        <Space direction="horizontal">
          <Button
            htmlType="button"
            key="viewDetails"
            title={intl.formatMessage({ id: "common.viewDetails" })}
            disabled={selectedRowId == null}
            onClick={() => selectedRowId && navigate(selectedRowId)}
          >
            <span>
              <FormattedMessage id="common.viewDetails" />
            </span>
          </Button>

          <Button
            disabled={selectedRow?.status !== AppointmentStatus.Pending}
            loading={cancelAppointmentLoading}
            icon={<StopOutlined/>}
            onClick={onCancelButtonClick}>
            Cancel
          </Button>
        </Space>
      </Col>
      <Col>
        <Select
          value={JSON.stringify(sortValue)}
          className="sort-by-select-width"
          allowClear
          placeholder={intl.formatMessage({ id: "sort.sortBy" })}
          onChange={sortBy => onApplySort(sortBy && JSON.parse(sortBy))}
          options={sortBySelectorOptions}
        />
      </Col>
    </Row>
  );
}

interface FiltersProps {
  onApplyFilters: (queryVariables: QueryVariablesType) => void;
  initialFilterValues: QueryVariablesType;
}

function Filters({ onApplyFilters, initialFilterValues }: FiltersProps) {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(initialFilterValues);
  }, [form, initialFilterValues]);

  const onResetFilters = useCallback(async () => {
    await form.resetFields();
    const filters = await form.validateFields();
    onApplyFilters(filters);
  }, [form, onApplyFilters]);

  return (
    <Form form={form} layout="vertical" onFinish={onApplyFilters}>
      <Form.Item shouldUpdate>
        {() => {
          return (
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  name={["filter", "doctorLastName"]}
                  label="Doctor Last Name"
                >
                  <Input
                    suffix={
                      form.isFieldTouched(["filter", "doctorLastName"]) ? (
                        <CloseCircleOutlined
                          onClick={() =>
                            form.resetFields([["filter", "doctorLastName"]])
                          }
                        />
                      ) : (
                        <span />
                      )
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name={["filter", "timeMax"]} label="Time Max">
                  <DatePicker showTime={{ format: "HH:mm:ss" }} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name={["filter", "timeMin"]} label="Time Min">
                  <DatePicker showTime={{ format: "HH:mm:ss" }} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name={["filter", "patientLastName"]}
                  label="Patient Last Name"
                >
                  <Input
                    suffix={
                      form.isFieldTouched(["filter", "patientLastName"]) ? (
                        <CloseCircleOutlined
                          onClick={() =>
                            form.resetFields([["filter", "patientLastName"]])
                          }
                        />
                      ) : (
                        <span />
                      )
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          );
        }}
      </Form.Item>

      <Space>
        <Button type="primary" htmlType="submit">
          <FormattedMessage id="filters.apply" />
        </Button>
        <Button onClick={onResetFilters}>
          <FormattedMessage id="filters.reset" />
        </Button>
      </Space>
    </Form>
  );
}

interface TableSectionProps {
  items?: ItemTableType;
  loading?: boolean;
  error?: ApolloError;
  selectedRowId?: string;
  setSelectedRowId: (id: any) => any;
}

/**
 * Collection of items
 */
function TableSection({
  items,
  loading,
  error,
  selectedRowId,
  setSelectedRowId
}: TableSectionProps) {
  if (error) {
    return <RequestFailedError />;
  }

  const dataSource = items
    ?.filter(item => item != null)
    .map(item => ({
      key: item?.id,
      ...item,
      ...{
        doctor: getDoctorDisplayName(item!.doctor ?? undefined),
        patient: getPatientDisplayName(item!.patient ?? undefined),
        time: item!.time?.format("LLL") ?? undefined,
        endTime: item!.endTime?.format("LLL") ?? undefined
      }
    }));

  return (
    <Space direction="vertical" className="table-space entity-table">
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowClassName={record =>
          record?.id === selectedRowId ? "table-row-selected" : ""
        }
        onRow={data => {
          return {
            onClick: () => {
              const id = data?.id;
              setSelectedRowId(id === selectedRowId ? null : id);
            }
          };
        }}
        scroll={{ x: true }}
        pagination={false}
      />
    </Space>
  );
}

function stateToSearchParams(
  state: QueryVariablesType
): Record<string, string> {
  const { page, sort, ...filter } = state;
  const params: Record<string, string> = {};

  if (page != null) {
    params.pageNumber = String(page.number + 1);
    params.pageSize = String(page.size);
  }

  if (sort != null && !Array.isArray(sort)) {
    params.sortProperty = String(sort.property);
    params.sortDirection = String(sort.direction);
  }

  if (filter != null && Object.keys(filter).length > 0) {
    params.filter = JSON.stringify(filter);
  }

  return params;
}

function searchParamsToState(
  searchParams: URLSearchParams
): QueryVariablesType {
  let state: QueryVariablesType = {};
  const {
    pageNumber,
    pageSize,
    sortProperty,
    sortDirection,
    filter
  } = Object.fromEntries(searchParams.entries());

  if (pageNumber != null && pageSize != null) {
    state.page = {
      number: Number(pageNumber) - 1,
      size: Number(pageSize)
    };
  } else {
    state.page = {
      number: 0,
      size: DEFAULT_PAGE_SIZE
    };
  }

  if (sortProperty != null && sortDirection != null) {
    state.sort = {
      direction: sortDirection as SortDirection,
      property: sortProperty as AppointmentOrderByProperty
    };
  }

  if (filter != null) {
    state = {
      ...state,
      ...JSON.parse(decodeURIComponent(filter))
    };
  }

  return state;
}

function extractFilterParams(state: QueryVariablesType) {
  const { page: _page, sort: _sort, ...filter } = state;
  return filter;
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof APPOINTMENT_LIST>;
/**
 * Type of variables used to filter the items list
 */
type QueryVariablesType = VariablesOf<typeof APPOINTMENT_LIST>;
/**
 * Type of the items list
 */
type ItemTableType = Exclude<
  QueryResultType["appointmentList"],
  null | undefined
>["content"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
