import { useMemo, ReactNode, useState, useCallback, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf, VariablesOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Modal,
  message,
  Row,
  Col,
  Form,
  Input,
  Card,
  Empty,
  Space,
  Spin,
  Pagination,
  Select
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { serializeVariables } from "../../../core/transform/model/serializeVariables";
import {
  DeleteOutlined,
  LoadingOutlined,
  EditOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "@amplicode/gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { GraphQLError } from "graphql/error/GraphQLError";
import { FetchResult } from "@apollo/client/link/core";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { getDoctorDisplayName } from "../../../core/display-name/getDoctorDisplayName";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";
import { SortDirection, DoctorOrderByProperty } from "../../../gql/graphql";
import { DefaultOptionType } from "antd/lib/select";

const REFETCH_QUERIES = ["DoctorList_DoctorList"];

const DOCTOR_LIST = gql(`
  query DoctorList_DoctorList(
  $filter: DoctorFilterInput
  $sort: [DoctorOrderByInput]
  $page: OffsetPageInput
) {
  doctorList(
    filter: $filter
    sort: $sort
    page: $page
  ) {
    content {
      firstName
      id
      lastName
      specialty
    }
    totalElements
  }
}
`);

const DELETE_DOCTOR = gql(`
  mutation DeleteDoctor_DoctorList($id: ID!) {
  deleteDoctor(id: $id) 
}
`);

const DEFAULT_PAGE_SIZE = 10;

export function DoctorList() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.DoctorList" }));

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
  const { loading, error, data } = useQuery(DOCTOR_LIST, {
    variables: selectionState
  });

  const items = useMemo(() => deserialize(data?.doctorList?.content), [
    data?.doctorList?.content
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
      const newFilters = serializeVariables(DOCTOR_LIST, filters);
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

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <Card>
          <Filters
            onApplyFilters={applyFilters}
            initialFilterValues={initialFilterValues}
          />
        </Card>
        <ButtonPanel onApplySort={applySort} sortValue={selectionState.sort} />
        <Cards items={items} loading={loading} error={error} />
        <Pagination
          current={
            selectionState.page?.number != null
              ? selectionState.page?.number + 1
              : undefined
          }
          pageSize={selectionState.page?.size}
          onChange={applyPagination}
          showSizeChanger
          total={data?.doctorList?.totalElements}
        />
      </Space>
    </div>
  );
}

const sortBySelectorOptions: DefaultOptionType[] = [
  {
    label: (
      <>
        Last Name (<ArrowDownOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Desc,
      property: DoctorOrderByProperty.LastName
    })
  },
  {
    label: (
      <>
        Last Name (<ArrowUpOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Asc,
      property: DoctorOrderByProperty.LastName
    })
  },
  {
    label: (
      <>
        First Name (<ArrowDownOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Desc,
      property: DoctorOrderByProperty.FirstName
    })
  },
  {
    label: (
      <>
        First Name (<ArrowUpOutlined />)
      </>
    ),
    value: JSON.stringify({
      direction: SortDirection.Asc,
      property: DoctorOrderByProperty.FirstName
    })
  }
];

interface ButtonPanelProps {
  onApplySort: (sort: QueryVariablesType["sort"]) => void;
  sortValue?: QueryVariablesType["sort"];
}
/**
 * Button panel above the cards
 */
function ButtonPanel({ onApplySort, sortValue }: ButtonPanelProps) {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <Row justify="space-between" gutter={[16, 8]}>
      <Col>
        <Space>
          <Button
            htmlType="button"
            key="create"
            title={intl.formatMessage({ id: "common.create" })}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("new")}
          >
            <span>
              <FormattedMessage id="common.create" />
            </span>
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
                <Form.Item name={["filter", "lastName"]} label="Last Name">
                  <Input
                    suffix={
                      form.isFieldTouched(["filter", "lastName"]) ? (
                        <CloseCircleOutlined
                          onClick={() =>
                            form.resetFields([["filter", "lastName"]])
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
                <Form.Item name={["filter", "firstName"]} label="First Name">
                  <Input
                    suffix={
                      form.isFieldTouched(["filter", "firstName"]) ? (
                        <CloseCircleOutlined
                          onClick={() =>
                            form.resetFields([["filter", "firstName"]])
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

interface ItemCardsListProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
}

/**
 * Collection of cards, each card representing an item
 */
function Cards({ items, loading, error }: ItemCardsListProps) {
  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <RequestFailedError />;
  }

  if (items == null || items.length === 0) {
    return <Empty />;
  }

  return (
    <Space direction="vertical" className="card-space">
      {items.map(item => (
        <ItemCard item={item} key={item?.id} />
      ))}
    </Space>
  );
}

function ItemCard({ item }: { item: ItemType }) {
  // Get the action buttons that will be displayed in the card
  const cardActions: ReactNode[] = useCardActions(item);

  if (item == null) {
    return null;
  }

  return (
    <Card
      key={item.id}
      title={getDoctorDisplayName(item)}
      actions={cardActions}
      className="narrow-layout"
    >
      <ValueWithLabel
        key="firstName"
        label="First Name"
        value={item.firstName ?? undefined}
      />
      <ValueWithLabel
        key="lastName"
        label="Last Name"
        value={item.lastName ?? undefined}
      />
      <ValueWithLabel
        key="specialty"
        label="Specialty"
        value={item.specialty ?? undefined}
      />
    </Card>
  );
}

/**
 * Returns action buttons that will be displayed inside the card.
 */
function useCardActions(item: ItemType): ReactNode[] {
  const intl = useIntl();
  const navigate = useNavigate();
  const { showDeleteConfirm, deleting } = useDeleteConfirm(item?.id);

  return [
    <EditOutlined
      key="edit"
      title={intl.formatMessage({ id: "common.edit" })}
      onClick={() => {
        if (item?.id != null) {
          navigate(item.id);
        }
      }}
    />,
    deleting ? (
      <LoadingOutlined />
    ) : (
      <DeleteOutlined
        key="delete"
        title={intl.formatMessage({ id: "common.remove" })}
        onClick={showDeleteConfirm}
      />
    )
  ];
}

/**
 * Returns a confirmation dialog and invokes delete mutation upon confirmation
 * @param id id of the entity instance that should be deleted
 */
function useDeleteConfirm(id: string | null | undefined) {
  const intl = useIntl();

  const [runDeleteMutation, { loading }] = useMutation(DELETE_DOCTOR);
  const deleteItem = useDeleteItem(id, runDeleteMutation, REFETCH_QUERIES);

  // Callback that deletes the item
  function handleDeleteItem() {
    deleteItem()
      .then(({ errors }: FetchResult) => {
        if (errors == null || errors.length === 0) {
          return handleDeleteSuccess();
        }
        return handleDeleteGraphQLError(errors);
      })
      .catch(handleDeleteNetworkError);
  }

  // Function that is executed when mutation is successful
  function handleDeleteSuccess() {
    return message.success(
      intl.formatMessage({ id: "EntityDetailsScreen.deletedSuccessfully" })
    );
  }

  // Function that is executed when mutation results in a GraphQL error
  function handleDeleteGraphQLError(
    errors: ReadonlyArray<GraphQLError> | undefined
  ) {
    console.error(errors);
    return message.error(intl.formatMessage({ id: "common.requestFailed" }));
  }

  // Function that is executed when mutation results in a network error (such as 4xx or 5xx)
  function handleDeleteNetworkError(error: Error | ApolloError) {
    console.error(error);
    return message.error(intl.formatMessage({ id: "common.requestFailed" }));
  }

  return {
    showDeleteConfirm: () =>
      Modal.confirm({
        content: intl.formatMessage({
          id: "EntityListScreen.deleteConfirmation"
        }),
        okText: intl.formatMessage({ id: "common.ok" }),
        cancelText: intl.formatMessage({ id: "common.cancel" }),
        onOk: handleDeleteItem
      }),
    deleting: loading
  };
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
      property: sortProperty as DoctorOrderByProperty
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
type QueryResultType = ResultOf<typeof DOCTOR_LIST>;
/**
 * Type of variables used to filter the items list
 */
type QueryVariablesType = VariablesOf<typeof DOCTOR_LIST>;
/**
 * Type of the items list
 */
type ItemListType = Exclude<
  QueryResultType["doctorList"],
  null | undefined
>["content"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
