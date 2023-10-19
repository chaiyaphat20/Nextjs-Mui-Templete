'use client'
import CancelIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SaveIcon from '@mui/icons-material/Save'
import { Radio, TablePaginationProps, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import MuiPagination from '@mui/material/Pagination'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridPagination,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Dashboard } from './models/ContactsAndRates'
import { tableStyle, useStyles } from './style/style'
function Pagination({
  page,
  onPageChange,
  className
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
  const apiRef = useGridApiContext()
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      shape="rounded"
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1)
      }}
    />
  )
}

export default function Context() {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const [data, setData] = useState<Dashboard[]>([])

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  })

  const initialRows: GridRowsProp = data
  const [rows, setRows] = useState(initialRows)

  const handlePageChange = (event: any, pageSize: number) => {
    const newPage = event.target.value
    if (newPage >= 1 && newPage <= Math.ceil(rows.length / pageSize)) {
      setPaginationModel({ ...paginationModel, page: newPage - 1 })
    }
  }

  function CustomPagination(
    props: any,
    page: number,
    pageSize: number,
    dataAllSize: number
  ) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <GridPagination ActionsComponent={Pagination} {...props} />
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            marginRight: '20px'
          }}
        >
          <span style={{ marginRight: '10px' }}>ไปยังหน้า</span>
          <TextField
            value={page + 1}
            onChange={(e) => handlePageChange(e, pageSize)} //handlePageChange(e, pageSize)
            inputProps={{
              min: 1,
              max: Math.ceil(dataAllSize / pageSize)
            }}
            sx={{ width: '70px' }}
            size="small"
            id="outlined-number"
            label=""
            type="number"
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
      </div>
    )
  }

  useEffect(() => {
    setData([])
    setRows([])
    let data: Dashboard[] = []
    const n = 500 // ตัวอย่าง: สร้างอาร์เรย์ที่มี 5 สมาชิก
    const emptyArray1 = Array(n)
    for (const [index] of emptyArray1.entries()) {
      const obj: Dashboard = {
        id: `${index + 1}`,
        contractNumber: `contractNumber${index + 1}`,
        condition: '99',
        groupName: 'กุ้ง',
        mainJob: 'ถอดหัว',
        subJob: 'ผลได้',
        rates: '20',
        status: 'ปิด'
      }
      data.push(obj)
    }
    setData(data)
    setRows(data)
  }, [])

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const classes = useStyles()

  const columns: GridColDef[] = [
    {
      field: 'contractNumber',
      headerName: 'เลขที่สัญญา',
      headerClassName: classes['.super-app-theme--header'],
      width: 230,
      editable: true,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'groupName',
      headerName: 'กลุ่มสินค้า',
      type: 'string',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      editable: true
    },
    {
      field: 'mainJob',
      headerName: 'งานหลัก',
      type: 'string',
      width: 130,
      editable: true,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'subJob',
      headerName: 'งานย่อย',
      width: 130,
      editable: true,
      type: 'string',
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'condition',
      headerName: 'เงื่อนไข',
      width: 130,
      editable: true,
      type: 'string',
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'rates',
      headerName: 'อัตรา',
      width: 130,
      editable: true,
      type: 'string',
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'status',
      headerName: 'สถานะ',
      width: 130,
      editable: true,
      type: 'string',
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'จัดการ',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ]
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<MoreHorizIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ]
      }
    }
  ]

  console.log({ selectionModel })

  return (
    <Box sx={tableStyle}>
      <DataGrid
        checkboxSelection
        localeText={{
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) =>
              `แสดง ${from} - ${to} of ${count}`,
            labelRowsPerPage: ''
          }
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        rowSelectionModel={selectionModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        slots={{
          baseCheckbox: Radio,
          pagination: (e) =>
            CustomPagination(
              e,
              paginationModel.page,
              paginationModel.pageSize,
              rows.length
            )
        }}
        onRowSelectionModelChange={(selection) => {
          if (selection.length > 1) {
            console.log('TRUE')
            const selectionSet = new Set(selectionModel)
            const result = selection.filter((s) => !selectionSet.has(s))

            setSelectionModel(result)
          } else {
            console.log('false')
            setSelectionModel(selection)
          }
        }}
      />
    </Box>
  )
}
