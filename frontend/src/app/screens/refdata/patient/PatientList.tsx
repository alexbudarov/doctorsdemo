import {gql} from "@amplicode/gql";
import {
  Patient,
  PatientFilterInput,
  PatientOrderByInput,
  PatientOrderByProperty,
  Scalars,
  SortDirection,
  SubDistrict
} from "@amplicode/gql/graphql";
import {CreateButton, EditButton,} from "react-admin";
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

const PATIENT_LIST_PATIENT_LIST = gql(`
query PatientList_PatientList(
    $page: OffsetPageInput,
    $filter: PatientFilterInput,
    $sort: [PatientOrderByInput]
) {
    patientList(
        filter: $filter,
        page: $page,
        sort: $sort
) {
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
  patient: Patient | null,
  children: Array<TreeItem>
  id: any,
  district: String | null,
  firstName: String | null,
  lastName: String | null,
  birthDate: Scalars["Date"] | null,
  homeAddress: String | null
}

export const PatientList = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 5,
  });

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [filterValue, setFilterValue] = useState<PatientFilterInput | null>();

  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [sortParam, setSortParam] = useState<PatientOrderByInput[]>();

  // transform filter value
  useEffect(() => {
    if (columnFilters.length === 0) {
      setFilterValue(null)
    } else {
      const map = new Map<String, any>();
      columnFilters.forEach(f => {
        map.set(f.id, f.value);
      })

      const fv = {
        firstName: map.get('firstName'),
        lastName: map.get('lastName'),
        homeAddress: map.get('homeAddress'),
        birthDateMin: map.get('birthDate')
      }
      setFilterValue(fv)
    }
  }, [columnFilters]);

  // transform sortParam value

  useEffect(() => {
    const map: Record<string, PatientOrderByProperty> = {
      'firstName': PatientOrderByProperty.FirstName,
      'lastName': PatientOrderByProperty.LastName,
      'birthDate': PatientOrderByProperty.BirthDate,
    }

    const newSortValue: Array<PatientOrderByInput> = sorting.map(cs => {
      const direction: SortDirection = cs.desc ? SortDirection.Desc : SortDirection.Asc;
      const prop: PatientOrderByProperty = map[cs.id];
      return {direction: direction, property: prop}
    })
    setSortParam(newSortValue)
  }, [sorting]);

  const {
    data: listData,
    loading: listLoading
  } = useQuery(PATIENT_LIST_PATIENT_LIST, {
    client: apolloClient,
    variables: {
      page: {number: pagination.pageIndex, size: pagination.pageSize},
      filter: filterValue,
      sort: sortParam
    }
  });

  let [totalRows, setTotalRows] = useState(0);

  //
  // calculate total count (not precise)
  //
  useEffect(() => {
    if (!listLoading) {
      const totalPatients = (listData?.patientList?.totalElements) || 0;
      const totalDistricts = (listData?.subDistrictList?.length || 0);
      setTotalRows(parseInt(totalPatients) + totalDistricts)
    }
  }, [listData?.patientList?.totalElements, listData?.subDistrictList?.length, listLoading]);

  //
  // calculate tree
  //
  const [treeItems, setTreeItems] = useState<Array<TreeItem>>([]);
  useEffect(() => {
    if (listLoading) {
      return;
    }

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
          id: p.id,
          district: null,
          patient: p,
          firstName: p.firstName,
          lastName: p.lastName,
          birthDate: p.birthDate || null,
          homeAddress: p.homeAddress || null,
          children: []
        }
      })
      const district = subDistricts.find(sd => sd.id === key) || null
      const districtNode = {
        id: 'district_' + district?.id,
        district: district?.name || null,
        patient: null,
        firstName: null,
        lastName: null,
        birthDate: null,
        homeAddress: null,
        children: patientNodes
      }
      res.push(districtNode)
    })
    setTreeItems(res)
  }, [listLoading, listData]);

  const tableColumns = useMemo<MRT_ColumnDef<TreeItem>[]>(
    () => [
      {
        accessorKey: 'district',
        header: 'District',
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'firstName',
        header: 'First name',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'lastName',
        header: 'Last name',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'birthDate',
        header: 'Birth date',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'homeAddress',
        header: 'Home address',
        enableSorting: false,
        enableColumnFilter: true,
      },
      /*{
        accessorKey: 'children',
        header: 'Children',
        enableSorting: false,
        enableColumnFilter: false,
      },*/
    ],
    []
  );

  return (
    <>
      <MaterialReactTable<TreeItem>
        columns={tableColumns}
        data={treeItems}
        initialState={{
          density: 'compact', pagination: pagination, expanded: true
        }}
        autoResetPageIndex={false}
        muiTableBodyProps={{
          sx: {
            '& tr:nth-of-type(odd)': {
              backgroundColor: '#EFEFEF',
            },
          },
        }}
        state={{
          columnFilters,
          pagination,
          sorting,
          isLoading: listLoading
        }}
        manualFiltering
        onColumnFiltersChange={setColumnFilters}
        manualSorting
        onSortingChange={setSorting}
        enableExpanding={true}
        manualPagination
        onPaginationChange={setPagination}
        rowCount={totalRows}
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
            {row.original.patient && <EditButton label="Edit" record={row.original.patient}/>}
          </>
        )}
      />
    </>
  );
};
