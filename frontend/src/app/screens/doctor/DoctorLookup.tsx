import React from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Card, Empty, Space, Spin } from "antd";
import { gql } from "@amplicode/gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { useIntl } from "react-intl";
import { getDoctorDisplayName } from "../../../core/display-name/getDoctorDisplayName";

const DOCTOR_FULL_LIST = gql(`
  query DoctorFullList_DoctorFullLookup {
  doctorFullList {
    firstName
    id
    lastName
    specialty
  }
}
`);

interface DoctorLookupProps {
  onSelect?: (entityInstance: Record<string, unknown>) => {};
}

export function DoctorLookup(props: DoctorLookupProps) {
  // Load the items from server
  const { loading, error, data } = useQuery(DOCTOR_FULL_LIST);
  const items = data?.doctorFullList;

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <Cards
          items={items}
          loading={loading}
          error={error}
          onSelect={item => {
            props.onSelect != null && props.onSelect(item);
          }}
        />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

interface ItemCardsProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
  onSelect: (entityInstance: Record<string, unknown>) => void;
}

/**
 * Collection of cards, each card representing an item
 */
function Cards({ items, loading, error, onSelect }: ItemCardsProps) {
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
    <Space direction="vertical" className="lookup-cards card-space">
      {items.map(item => (
        <ItemCard item={item} key={item?.id} onSelect={onSelect} />
      ))}
    </Space>
  );
}

interface ItemCardProps {
  item: ItemType;
  onSelect: (entityInstance: Record<string, unknown>) => void;
}

function ItemCard({ item, onSelect }: ItemCardProps) {
  const intl = useIntl();

  if (item == null) {
    return null;
  }

  return (
    <Card
      key={item.id}
      title={intl.formatMessage(
        { id: "EntityLookupField.selectEntityInstance" },
        { label: getDoctorDisplayName(item) }
      )}
      className="narrow-layout"
      onClick={() => onSelect(item)}
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
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof DOCTOR_FULL_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["doctorFullList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
