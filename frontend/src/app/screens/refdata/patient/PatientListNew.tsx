import { gql } from "@amplicode/gql";
import {Patient, Scalars, SubDistrict} from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Button,
  CreateButton,
  Datagrid,
  DateInput,
  DeleteButton,
  EditButton, ExportButton,
  FunctionField,
  List, ShowButton,
  TextField,
  TextInput,
} from "react-admin";
import { renderDate } from "../../../../core/format/renderDate";
import { getSubDistrictRecordRepresentation } from "../../../../core/record-representation/getSubDistrictRecordRepresentation";
import {useQuery} from "@apollo/client";
import {useEffect, useMemo, useState} from "react";
import {apolloClient} from "../../../../dataProvider/graphqlDataProvider";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState
} from "material-react-table";
import {Box, Typography} from "@mui/material";

const PATIENT_LIST_PATIENT_LIST = gql(`
query PatientList_PatientList($page: OffsetPageInput) {
    patientList(page: $page) {
        content {
            birthDate
            firstName
            homeAddress
            id
            lastName
            subDistrict {
                id
                name
            }
        }
        totalElements
    }
    subDistrictList {
        id
        name
    }
}
`);

type TreeItem = {
  district: SubDistrict | null,
  patient: Patient | null,
  children: Array<TreeItem>
}

export const PatientListNew = () => {

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });


  const {
    data: listData
  } = useQuery(PATIENT_LIST_PATIENT_LIST, {
    client: apolloClient,
    variables: {
      page: {number: pagination.pageIndex, size: pagination.pageSize}
    }
  });

  const treeItems = useMemo(() => {
    const patients = (listData?.patientList?.content || []) as Array<Patient>
    const subDistricts = (listData?.subDistrictList || []) as Array<SubDistrict>

    const tree = new Map<any, Array<Patient>>()
    patients.forEach(p => {
      const subDistrictId = p.subDistrict?.id || ''
      const existingItem = tree.get(subDistrictId)
      if (existingItem) {
        existingItem.push(p)
      } else {
        tree.set(subDistrictId, [p])
      }
    })
    const res: Array<TreeItem> = []
    tree.forEach((value: Array<Patient>, key: any) => {
      const patientNodes: Array<TreeItem> = value.map(p => {
        return {
          district: null,
          patient: p,
          children: []
        }
      })
      const districtNode = {
        district: subDistricts.find(sd => sd.id === key) || null,
        patient: null,
        children: patientNodes
      }
      res.push(districtNode)
    })
    return res
  }, [listData]);

  const [tableData, setTableData] = useState<Array<TreeItem>>([]);

  const [isTableDataLoading, setIsTableDataLoading] = useState(false);

  useEffect(() => {
    setIsTableDataLoading(true);
    const loadData = async () => {
      // TODO get data
      setTableData(treeItems);
      setIsTableDataLoading(false);
    }
    loadData()
  }, [treeItems,
    pagination?.pageIndex,
    pagination?.pageSize,
  ]);

  const tableColumns = useMemo<MRT_ColumnDef<TreeItem>[]>(
    () => [
      /*{
        accessorKey: 'children',
        header: 'Children',
        enableSorting: false,
        enableColumnFilter: false,
      },*/
      {
        accessorKey: 'patient',
        header: 'Patient',
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'district',
        header: 'District',
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    []
  );

  return (
    <>
      <MaterialReactTable<TreeItem>
        columns={tableColumns}
        data={tableData}
        initialState={{
          density: 'comfortable', pagination: {pageSize: 5, pageIndex: 0}
        }}

        state={{
          pagination,
          isLoading: isTableDataLoading
        }}
        manualPagination
        onPaginationChange={setPagination}
        getSubRows={(originalRow) => originalRow.children}
        renderTopToolbarCustomActions={({table}) => (
          <div>
            <CreateButton label="Create"/>
          </div>
        )}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({row}) => (
          <>
            <EditButton label="Edit" record={row.original} onClick={() => {
              alert('TODO: specify resource or implement custom edit logic')
            }}/>
          </>
        )}
      />
    </>
  );
};
